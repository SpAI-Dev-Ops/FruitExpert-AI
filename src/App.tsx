import { useState, useEffect } from "react";
import Header from "./components/Header";
import ScanLab from "./components/ScanLab";
import FruitDashboard from "./components/FruitDashboard";
import HistoryList from "./components/HistoryList";
import ChatSection from "./components/ChatSection";
import QuickActionModal from "./components/QuickActionModal";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FAQSection from "./components/FAQSection";
import { FruitAnalysis, ScanHistoryItem, ChatMessage } from "./types";
import { sampleFruits } from "./sampleData";
import { sampleFruitsBn } from "./sampleDataBn";
import { Language, translations } from "./i18n";
import { Sprout, ArrowRight, AlertCircle, Sparkles, TrendingUp, Cpu, Award } from "lucide-react";

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fruitexpert-ai`;
const API_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const cachedLang = localStorage.getItem("fruitexpert_lang");
      return (cachedLang === "bn" || cachedLang === "en") ? cachedLang : "en";
    } catch {
      return "en";
    }
  });

  const t = translations[lang];

  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [modelName, setModelName] = useState<string | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [activeAnalysis, setActiveAnalysis] = useState<FruitAnalysis | null>(null);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Quick Action Modal states
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [quickActionTitle, setQuickActionTitle] = useState("");
  const [quickActionContent, setQuickActionContent] = useState<string | null>(null);
  const [isQuickActionLoading, setIsQuickActionLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [lastImagePayload, setLastImagePayload] = useState<{ imageBase64?: string; mimeType?: string; presetKey?: string } | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  // Save selected language in localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("fruitexpert_lang", lang);
    } catch (err) {
      console.error("Local storage language save error:", err);
    }
  }, [lang]);

  // Load configuration and cached history on mount
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch(`${API_URL}/config`, { headers: API_HEADERS });
        const data = await res.json();
        setHasApiKey(data.hasApiKey);
        setModelName(data.modelName || null);
      } catch (err) {
        console.error("Failed to fetch configuration:", err);
        setHasApiKey(false);
        setModelName(null);
      } finally {
        setLoadingConfig(false);
      }
    }

    fetchConfig();

    // Safe localStorage loading
    try {
      const cachedHistory = localStorage.getItem("fruitexpert_history");
      if (cachedHistory) {
        setHistory(JSON.parse(cachedHistory));
      }

      const cachedChat = localStorage.getItem("fruitexpert_chat");
      if (cachedChat) {
        setChatMessages(JSON.parse(cachedChat));
      } else {
        // Default welcoming message in active language
        setChatMessages([
          {
            id: "welcome-msg",
            role: "assistant",
            content: t.welcomeChat,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }
    } catch (err) {
      console.error("Local storage read error:", err);
    }
  }, []);

  // Global error event listeners to prevent unhandled rejections from crashing the app (e.g. Vite HMR WebSockets)
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || String(event.reason || "");
      if (
        reason.includes("WebSocket") ||
        reason.includes("websocket") ||
        reason.includes("HMR") ||
        reason.includes("vite") ||
        reason.includes("Permission dismissed") ||
        reason.includes("dismissed")
      ) {
        event.preventDefault();
        console.warn("Caught and suppressed benign runtime rejection:", reason);
      }
    };

    const handleGlobalError = (event: ErrorEvent) => {
      const message = event.message || "";
      if (
        message.includes("WebSocket") ||
        message.includes("websocket") ||
        message.includes("vite") ||
        message.includes("Permission dismissed") ||
        message.includes("dismissed")
      ) {
        event.preventDefault();
        console.warn("Caught and suppressed benign runtime error:", message);
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleGlobalError);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleGlobalError);
    };
  }, []);

  // Save changes to localStorage safely
  const saveHistoryToCache = (newHistory: ScanHistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("fruitexpert_history", JSON.stringify(newHistory));
    } catch (err) {
      console.error("Local storage save error:", err);
    }
  };

  const saveChatToCache = (newChat: ChatMessage[]) => {
    setChatMessages(newChat);
    try {
      localStorage.setItem("fruitexpert_chat", JSON.stringify(newChat));
    } catch (err) {
      console.error("Local storage save error:", err);
    }
  };

  // Perform botanical image analysis
  const handleAnalyze = async (payload: { imageBase64?: string; mimeType?: string; presetKey?: string }) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    if (payload.imageBase64) {
      setLastImagePayload(payload);
    } else {
      setLastImagePayload(null);
    }
    try {
      const res = await fetch(`${API_URL}/analyze-fruit`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({ ...payload, language: lang })
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Fruit identification failed.");
      }

      let analysisData: FruitAnalysis = result.data;
      if (result.isPreset && payload.presetKey) {
        analysisData = lang === "bn" ? sampleFruitsBn[payload.presetKey] : sampleFruits[payload.presetKey];
      }
      
      // Determine the reference image URL
      let finalImageUrl = "";
      if (payload.presetKey && sampleFruits[payload.presetKey]) {
        finalImageUrl = sampleFruits[payload.presetKey].image;
      } else if (payload.imageBase64) {
        finalImageUrl = payload.imageBase64;
      }

      const newHistoryId = Date.now().toString();
      const newHistoryItem: ScanHistoryItem = {
        id: newHistoryId,
        timestamp: new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
        imageUrl: finalImageUrl,
        analysis: analysisData,
        isFavorite: false,
        isPreset: !!payload.presetKey
      };

      const updatedHistory = [newHistoryItem, ...history];
      saveHistoryToCache(updatedHistory);

      // Select newly scanned specimen
      setActiveId(newHistoryId);
      setActiveAnalysis(analysisData);
      setActiveImageUrl(finalImageUrl);

      // Append informative bot prompt about completed scanning inside the chat stream
      const chatTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const contentText = lang === "bn"
        ? `🔬 **নমুনা বিশ্লেষণ সম্পন্ন!**\n\nআমি সফলভাবে নমুনাটি স্ক্যান করেছি এবং এটিকে **${analysisData.confidence}% সাদৃশ্য আত্মবিশ্বাসের** সাথে **${analysisData.commonName}** (*${analysisData.scientificName}*) হিসেবে চিহ্নিত করেছি।\n\nকৃষি ড্যাশবোর্ডের ভেতরে এর কাস্টমাইজড পুষ্টির প্রোফাইল এবং বৈজ্ঞানিক তথ্যগুলো অনুসন্ধান করুন!`
        : `🔬 **Specimen Analyzed!**\n\nI have successfully scanned the specimen and identified it as **${analysisData.commonName}** (*${analysisData.scientificName}*) with **${analysisData.confidence}% match confidence**.\n\nExplore its customized nutritional profiles, fun facts, and agricultural bar charts inside the **Agronomy Dashboard**!`;
      const analysisChat: ChatMessage = {
        id: `scan-${Date.now()}`,
        role: "assistant",
        content: contentText,
        timestamp: chatTime
      };
      saveChatToCache([...chatMessages, analysisChat]);

    } catch (err: any) {
      console.error("Analysis failure:", err);
      setAnalysisError(err.message || (lang === "bn" ? "ফলের স্ক্যানিংয়ের সময় একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আরও স্পষ্ট ছবি দিয়ে চেষ্টা করুন।" : "An unexpected error occurred during fruit scanning. Please try again with a clearer photo."));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUploadAnotherImage = () => {
    setAnalysisError(null);
    setLastImagePayload(null);
    setResetSignal(prev => prev + 1);
  };

  // Select historical specimen
  const handleSelectHistoryItem = (item: ScanHistoryItem) => {
    setActiveId(item.id);
    setActiveAnalysis(item.analysis);
    setActiveImageUrl(item.imageUrl);
  };

  // Toggle favorite star log
  const handleToggleFavorite = (id: string) => {
    const updatedHistory = history.map((item) => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    saveHistoryToCache(updatedHistory);
  };

  // Delete individual history item
  const handleDeleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    saveHistoryToCache(updatedHistory);
    if (activeId === id) {
      setActiveId(undefined);
      setActiveAnalysis(null);
      setActiveImageUrl(null);
    }
  };

  // Clear all history
  const handleClearHistory = () => {
    saveHistoryToCache([]);
    setActiveId(undefined);
    setActiveAnalysis(null);
    setActiveImageUrl(null);
  };

  // Send a text message in general chat
  const handleSendMessage = async (content: string) => {
    if (isSendingChat) return;
    
    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: userTime
    };

    const newChatLogs = [...chatMessages, userMsg];
    saveChatToCache(newChatLogs);
    setIsSendingChat(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          messages: newChatLogs,
          activeFruit: activeAnalysis
            ? {
                commonName: activeAnalysis.commonName,
                scientificName: activeAnalysis.scientificName
              }
            : null,
          language: lang
        })
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to fetch response.");
      }

      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: result.content,
        timestamp: botTime
      };
      saveChatToCache([...newChatLogs, botMsg]);
    } catch (err: any) {
      console.error("Chat message error:", err);
      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `⚠️ **API Connection Error:** I could not connect to my AI server. Please verify your internet connection or try again.`,
        timestamp: botTime
      };
      saveChatToCache([...newChatLogs, errorMsg]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    saveChatToCache([
      {
        id: "welcome-msg",
        role: "assistant",
        content: "I have cleared our conversation. Let's start fresh! Ask me any question about fruits, agriculture, or botany. 🍇",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  // Perform quick action deep dives (slide-in modal)
  const handleQuickAction = async (actionType: string, label: string) => {
    if (!activeAnalysis) return;

    setQuickActionTitle(label);
    setQuickActionContent(null);
    setQuickActionOpen(true);
    setIsQuickActionLoading(true);

    try {
      const res = await fetch(`${API_URL}/quick-action`, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({
          fruitName: activeAnalysis.commonName,
          scientificName: activeAnalysis.scientificName,
          actionType
        })
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to synthesize report.");
      }

      setQuickActionContent(result.markdown);
    } catch (err: any) {
      console.error("Quick action failed:", err);
      setQuickActionContent(`### ⚠️ Synthesis Interrupted\n\nWe encountered an error generating the detailed report for **${activeAnalysis.commonName}**. Please try clicking the button again.`);
    } finally {
      setIsQuickActionLoading(false);
    }
  };

  const handleTryNow = () => {
    // Automatically select the first preset (Apple) to show the dashboard instantly
    const keys = Object.keys(sampleFruits);
    if (keys.length > 0) {
      const firstKey = keys[0];
      const firstFruit = sampleFruits[firstKey];
      triggerPreset(firstKey, firstFruit.image);
    }
  };

  const triggerPreset = (key: string, imgUrl: string) => {
    handleAnalyze({ presetKey: key });
  };

  const handleHowItWorks = () => {
    handleSendMessage("How does FruitExpert AI analyze fruits and compile agricultural metrics?");
  };

  const activeItem = history.find(item => item.id === activeId);
  const activeIsPreset = activeItem ? !!activeItem.isPreset : false;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 antialiased font-sans">
      {/* Sticky Navigation Header */}
      <Header hasApiKey={hasApiKey} loadingConfig={loadingConfig} modelName={modelName} lang={lang} setLang={setLang} />

      {/* Main Grid Workstation */}
      {showPrivacy ? (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <PrivacyPolicy onBack={() => setShowPrivacy(false)} lang={lang} />
        </main>
      ) : showFAQ ? (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <FAQSection onBack={() => setShowFAQ(false)} lang={lang} />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Input Lab & Scan History Logs (Span 4) */}
            <section className="lg:col-span-4 space-y-8 flex flex-col">
              <ScanLab 
                onAnalyze={handleAnalyze} 
                isAnalyzing={isAnalyzing} 
                hasApiKey={!!hasApiKey} 
                resetSignal={resetSignal}
                lang={lang}
              />
              
              <HistoryList 
                history={history} 
                onSelect={handleSelectHistoryItem} 
                activeId={activeId} 
                onDelete={handleDeleteHistoryItem} 
                onToggleFavorite={handleToggleFavorite}
                onClearAll={handleClearHistory} 
                lang={lang}
              />
            </section>

            {/* Right Column: Dynamic Profile Results & General Chat Section (Span 8) */}
            <section className="lg:col-span-8 space-y-8 flex flex-col">
              
              {/* AI analysis could not be completed error block */}
              {analysisError && (
                <div className="bg-red-950/40 border border-red-500/30 text-red-100 p-6 rounded-2xl shadow-xl flex flex-col space-y-4 animate-fade-in select-text">
                  <div className="flex items-start gap-3.5">
                    <div className="bg-red-500/15 p-2 rounded-xl text-red-400 border border-red-500/25 shrink-0">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-red-400">{t.errorHeader}</h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {analysisError}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-800/60">
                    {lastImagePayload && (
                      <button
                        onClick={() => handleAnalyze(lastImagePayload)}
                        className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/10"
                      >
                        {t.btnRetry || "Retry Analysis"}
                      </button>
                    )}
                    <button
                      onClick={handleUploadAnotherImage}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      {t.btnUploadAnother || "Upload Another Image"}
                    </button>
                    <button
                      onClick={() => {
                        setAnalysisError(null);
                        handleTryNow();
                      }}
                      className="bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/60 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                    >
                      {t.btnUsePreset || "Use Preset Specimen"}
                    </button>
                  </div>
                </div>
              )}

              {activeAnalysis && activeImageUrl ? (
                // Active fruit presentation dashboard
                <div className="animate-fade-in">
                  <FruitDashboard 
                    analysis={activeAnalysis} 
                    imageUrl={activeImageUrl} 
                    onQuickAction={handleQuickAction}
                    isQuickActionLoading={isQuickActionLoading}
                    isPreset={activeIsPreset}
                    lang={lang}
                  />
                </div>
              ) : (
                // Welcoming Signature Promo Card (Pale gradient with Stats row)
                <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center space-y-8 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-3xl flex items-center justify-center border border-orange-500/20 shadow-inner">
                    <Sprout className="h-8 w-8 animate-pulse" />
                  </div>
                  
                  <div className="max-w-xl space-y-3">
                    <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
                      {lang === "bn" ? <><span className="text-orange-500">FruitExpert AI</span>-তে স্বাগতম</> : <>Welcome to <span className="text-orange-500">FruitExpert AI</span></>}
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                      {t.welcomeSubtitle}
                    </p>
                  </div>

                  {/* Highly structured Stats Row */}
                  <div className="grid grid-cols-3 gap-4 w-full max-w-md bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 divide-x divide-slate-800">
                    <div className="text-center">
                      <div className="text-sm sm:text-base font-black text-orange-500 flex items-center justify-center gap-1">
                        <Cpu className="h-3.5 w-3.5" /> 3.6 Flash
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mt-1">{t.aiModel}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm sm:text-base font-black text-slate-200 flex items-center justify-center gap-1">
                        <Award className="h-3.5 w-3.5 text-amber-500" /> FAO / USDA
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mt-1">{t.dataReference}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm sm:text-base font-black text-slate-200 flex items-center justify-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-teal-400" /> 2,400+
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mt-1">{t.cultivarsCount}</div>
                    </div>
                  </div>

                  {/* Primary Action Row ("Try Now" / "How it works") */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <button
                      onClick={handleTryNow}
                      className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-black px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-orange-500/20"
                    >
                      {t.tryNow} <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleHowItWorks}
                      className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="h-4 w-4 text-orange-400" /> {t.howItWorks}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-black text-orange-400 uppercase tracking-wider pt-2">
                    <span>{t.choosePreset}</span>
                  </div>
                </div>
              )}

              {/* Chat section for inquiries */}
              <ChatSection 
                messages={chatMessages} 
                onSendMessage={handleSendMessage} 
                isSending={isSendingChat} 
                onClearHistory={handleClearChat} 
                lang={lang}
              />

            </section>

          </div>
        </main>
      )}

      {/* Global Application Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-8 text-center text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-auto shrink-0 space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => { setShowPrivacy(true); setShowFAQ(false); }}
              className="hover:text-orange-400 transition-colors cursor-pointer text-[11px] font-bold uppercase tracking-wider"
            >
              {t.privacyPolicy}
            </button>
            <button 
              onClick={() => { setShowFAQ(true); setShowPrivacy(false); }}
              className="hover:text-orange-400 transition-colors cursor-pointer text-[11px] font-bold uppercase tracking-wider"
            >
              {lang === "bn" ? "জিজ্ঞাসাবাদ (FAQ)" : "FAQ"}
            </button>
            <a 
              href="mailto:support@fruitexpert.co.uk"
              className="hover:text-orange-400 transition-colors cursor-pointer text-[11px] font-bold uppercase tracking-wider"
            >
              {t.contactUs}
            </a>
          </div>
          <p>© 2026 FruitExpert AI. {t.allRightsReserved}</p>
        </div>

        {/* Separated Informational Section */}
        <div className="border-t border-slate-900/60 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h5 className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">{t.worldFruitsDataTitle}</h5>
          <p className="text-[9px] text-slate-600 font-medium tracking-normal max-w-xl mx-auto leading-relaxed normal-case">
            {t.worldFruitsDataDesc}
          </p>
        </div>
      </footer>

      {/* Slide-in report modal for Quick Action deep-dives */}
      <QuickActionModal 
        isOpen={quickActionOpen} 
        onClose={() => setQuickActionOpen(false)} 
        title={quickActionTitle} 
        markdownContent={quickActionContent} 
        isLoading={isQuickActionLoading} 
        lang={lang}
      />
    </div>
  );
}
