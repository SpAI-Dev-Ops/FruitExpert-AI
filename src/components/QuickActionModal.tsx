import { X, Sprout, Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import { Language } from "../i18n";

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  markdownContent: string | null;
  isLoading: boolean;
  lang: Language;
}

export default function QuickActionModal({
  isOpen,
  onClose,
  title,
  markdownContent,
  isLoading,
  lang
}: QuickActionModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (markdownContent) {
      navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (markdownContent) {
      const element = document.createElement("a");
      const file = new Blob([markdownContent], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, "_")}_Report.md`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
          aria-hidden="true"
        />


        {/* Center alignment trick */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


        {/* Modal body */}
        <div className="inline-block align-bottom bg-slate-900 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-slate-800">
          
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-4 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center space-x-2">
              <Sprout className="h-5 w-5 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-black tracking-widest uppercase" id="modal-title">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="bg-slate-900 px-6 py-8 min-h-[350px] max-h-[70vh] overflow-y-auto">
            {isLoading ? (
              // Loading/Synthesis spinner
              <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
                <div className="relative flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                  <Sprout className="h-5 w-5 text-orange-500 absolute" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200 animate-pulse uppercase tracking-wider">
                    {lang === "bn" ? "কৃষি নিবন্ধন পর্যালোচনা করা হচ্ছে" : "Consulting Agricultural Registry"}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                    {lang === "bn" 
                      ? "বিস্তারিত জাত পর্যালোচনা, রেসিপি এবং রোপণ নির্দেশিকা তৈরি হচ্ছে..." 
                      : "Synthesizing high-fidelity cultivar reviews, recipes, and home planting guidelines..."}
                  </p>
                </div>
              </div>
            ) : markdownContent ? (
              // Rendered Markdown Report
              <div className="markdown-body select-text animate-fade-in text-xs sm:text-sm">
                <Markdown>{markdownContent}</Markdown>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500">
                <p className="text-xs font-bold">
                  {lang === "bn" 
                    ? "কোনো সংকলিত রিপোর্ট পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।" 
                    : "No compiled report found. Please trigger the quick action again."}
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          {!isLoading && markdownContent && (
            <div className="bg-slate-950 border-t border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider">
                {lang === "bn" ? "🔬 FruitExpert AI ইঞ্জিন দ্বারা প্রস্তুতকৃত" : "🔬 Synthesized via FruitExpert AI Engine"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-slate-900 text-xs text-slate-300 font-bold py-2 px-3.5 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-orange-400" />
                      {lang === "bn" ? "অনুলিপি করা হয়েছে!" : "Copied!"}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      {lang === "bn" ? "অনুলিপি করুন (Markdown)" : "Copy Markdown"}
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-md shadow-orange-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  {lang === "bn" ? "রিপোর্ট সংরক্ষণ করুন (.md)" : "Save Report (.md)"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
