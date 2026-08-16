import { Sprout, ShieldAlert, Cpu } from "lucide-react";
import { Language, translations } from "../i18n";

interface HeaderProps {
  hasApiKey: boolean | null;
  loadingConfig: boolean;
  modelName: string | null;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ hasApiKey, loadingConfig, modelName, lang, setLang }: HeaderProps) {
  const t = translations[lang];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 text-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/10">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              FruitExpert <span className="text-orange-500 font-semibold">AI</span>
            </h1>
            <p className="text-xs text-slate-400 font-normal hidden sm:block">
              {lang === "bn" ? "উন্নত বোটানিক্যাল আইডেন্টিফায়ার এবং কৃষি বিশ্লেষক" : "Advanced Botanical Identifier & Agricultural Analyzer"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Reusable, elegant, space-conscious bilingual selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 select-none shrink-0 text-[10px] font-black tracking-wider">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                lang === "en" ? "bg-orange-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("bn")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                lang === "bn" ? "bg-orange-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              বাংলা
            </button>
          </div>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeBJMYOdudfRI9zLLspw4d7t6AJYr5zeIzHV-qXJbPD_bP0hg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Give Feedback on FruitExpert AI"
            title="Help us improve FruitExpert AI — your feedback matters"
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-orange-400 border border-slate-800/80 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span className="text-slate-400 select-none">💬</span>
            <span className="hidden xs:inline">{t.giveFeedback}</span>
            <span className="xs:hidden">{lang === "bn" ? "মতামত" : "Feedback"}</span>
          </a>

          {loadingConfig ? (
            <div className="flex items-center space-x-2 bg-slate-800 text-slate-400 px-3 py-1.5 rounded-full text-xs font-medium animate-pulse">
              <div className="h-2 w-2 rounded-full bg-slate-400"></div>
              <span>{t.loadingConfig}</span>
            </div>
          ) : hasApiKey ? (
            <div className="flex items-center space-x-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1.5 rounded-full text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="font-semibold flex items-center gap-1">
                <Cpu className="h-3.5 w-3.5 inline text-orange-400" />
                {modelName || "Gemini 3.6"} {lang === "bn" ? "সংযুক্ত" : "Connected"}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-full text-xs font-medium">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              <span className="font-semibold">
                {lang === "bn" ? "স্যান্ডবক্স মোড (নমুনা সক্রিয়)" : "Sandbox Mode (Samples Active)"}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
