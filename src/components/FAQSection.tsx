import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft, BookOpen, ShieldAlert } from "lucide-react";
import { Language } from "../i18n";

interface FAQSectionProps {
  onBack: () => void;
  lang: Language;
}

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQSection({ onBack, lang }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqDataEn: FAQItem[] = [
    {
      q: "What is FruitExpert AI?",
      a: "FruitExpert AI is an AI-powered tool that helps users identify fruits and explore botanical, nutritional, and agricultural information from fruit images and questions."
    },
    {
      q: "How do I identify a fruit?",
      a: "Open Live Camera or upload a fruit image, then start the analysis. FruitExpert AI will provide an AI-generated identification and related information."
    },
    {
      q: "Does Live Camera require permission?",
      a: "Yes. Your browser must allow camera access, and the app must be accessed through a secure HTTPS connection."
    },
    {
      q: "Can I use FruitExpert AI in Bengali?",
      a: "Yes. FruitExpert AI supports English and বাংলা. You can switch languages from the language selector."
    },
    {
      q: "Is the AI information always accurate?",
      a: "AI-generated information can contain errors. Users should verify important agricultural, nutritional, medical, pesticide, or treatment information with qualified professionals and reliable local sources."
    },
    {
      q: "Does FruitExpert AI store my photos?",
      a: "The current application uses local browser storage for supported history and preferences. We do not store your images or personal scans on any cloud or server-side databases."
    },
    {
      q: "How can I send feedback?",
      a: "Use the 'Give Feedback' button to open the FruitExpert AI feedback form in a new browser tab."
    },
    {
      q: "Can I download my analysis?",
      a: "Yes. Where available, users can export analysis data as JSON or generate a printable PDF summary."
    }
  ];

  const faqDataBn: FAQItem[] = [
    {
      q: "FruitExpert AI কী?",
      a: "FruitExpert AI হলো একটি এআই-চালিত উন্নত টুল যা ব্যবহারকারীদের ফলের ছবি এবং চ্যাট প্রশ্নের মাধ্যমে বিভিন্ন ফল সনাক্ত করতে এবং এ সংক্রান্ত উদ্ভিদবিজ্ঞান, পুষ্টি এবং কৃষি তথ্য অনুসন্ধান করতে সাহায্য করে।"
    },
    {
      q: "আমি কীভাবে একটি ফল সনাক্ত করব?",
      a: "লাইভ ক্যামেরা খুলুন অথবা ফলের একটি ছবি আপলোড করুন এবং বিশ্লেষণ শুরু করুন। FruitExpert AI আপনাকে একটি কৃত্রিম বুদ্ধিমত্তা-ভিত্তিক সনাক্তকরণ ফলাফল এবং সংশ্লিষ্ট কৃষি মেট্রিক্স প্রদান করবে।"
    },
    {
      q: "লাইভ ক্যামেরার কি অনুমতি প্রয়োজন হয়?",
      a: "হ্যাঁ। আপনার ব্রাউজারে ক্যামেরার অনুমতি প্রদান করতে হবে এবং অ্যাপ্লিকেশনটি অবশ্যই একটি নিরাপদ HTTPS সংযোগের মাধ্যমে অ্যাক্সেস করতে হবে।"
    },
    {
      q: "আমি কি FruitExpert AI বাংলা ভাষায় ব্যবহার করতে পারি?",
      a: "হ্যাঁ। FruitExpert AI ইংরেজি এবং বাংলা উভয় ভাষা সমর্থন করে। আপনি ভাষা নির্বাচক মেনু থেকে যেকোনো সময় ভাষা পরিবর্তন করতে পারেন।"
    },
    {
      q: "এআই দ্বারা প্রাপ্ত তথ্য কি সর্বদা সঠিক হয়?",
      a: "এআই-উত্পন্ন তথ্যে ভুলত্রুটি থাকতে পারে। গুরুত্বপূর্ণ কৃষি, পুষ্টি সংক্রান্ত, চিকিৎসা, কীটনাশক বা বিশেষ ফলন চিকিৎসার সিদ্ধান্ত নেওয়ার আগে সর্বদা সংশ্লিষ্ট বিশেষজ্ঞ এবং নির্ভরযোগ্য স্থানীয় উৎসবের সাথে যাচাই করে নিন।"
    },
    {
      q: "FruitExpert AI কি আমার ছবি সংরক্ষণ করে?",
      a: "বর্তমান অ্যাপ্লিকেশনটি স্ক্যান হিস্ট্রি এবং পছন্দের তালিকা সচল রাখতে শুধুমাত্র আপনার ব্রাউজারের লোকাল স্টোরেজ ব্যবহার করে। আমরা কোনো ক্লাউড বা সার্ভার-সাইড ডাটাবেজে আপনার ছবি বা স্ক্যান করা ফাইল সংরক্ষণ করি না।"
    },
    {
      q: "আমি কীভাবে ফিডব্যাক পাঠাতে পারি?",
      a: "অ্যাপের ভেতরের 'Give Feedback' বা 'মতামত দিন' বোতামটি ব্যবহার করে নতুন ব্রাউজার ট্যাবে FruitExpert AI-এর জন্য গুগল ফিডব্যাক ফর্মটি খুলুন এবং মতামত জানান।"
    },
    {
      q: "আমি কি আমার ফল সনাক্তকরণের ডেটা ডাউনলোড করতে পারব?",
      a: "হ্যাঁ। ড্যাশবোর্ড থেকে আপনি সরাসরি সম্পূর্ণ ডাটা শিট JSON ফাইল হিসেবে এক্সপোর্ট করতে পারবেন অথবা একটি প্রিন্ট-বান্ধব পিডিএফ (PDF) রিপোর্ট ডাউনলোড করতে পারবেন।"
    }
  ];

  const currentFaq = lang === "bn" ? faqDataBn : faqDataEn;

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-text animate-fade-in text-slate-100" id="faq-root">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          id="btn-faq-back"
          className="group inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>{lang === "bn" ? "অ্যাপে ফিরে যান" : "Back to App"}</span>
        </button>
      </div>

      {/* Header Panel */}
      <div className="mb-8 border-b border-slate-900 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500/10 text-orange-500 p-3 rounded-2xl border border-orange-500/15">
            <HelpCircle className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {lang === "bn" ? "জিজ্ঞাসিত প্রশ্নাবলী (FAQ)" : "Frequently Asked Questions"}
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {lang === "bn" ? "FruitExpert AI সম্পর্কে সাধারণ প্রশ্ন ও উত্তর" : "Common inquiries regarding FruitExpert AI platform and models"}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {currentFaq.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              id={`faq-item-${idx}`}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-350"
            >
              <button
                onClick={() => toggleIndex(idx)}
                id={`faq-trigger-${idx}`}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-200 hover:text-orange-400 transition-colors cursor-pointer focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 font-mono text-xs mt-0.5">Q{idx + 1}.</span>
                  <span className="leading-snug">{item.q}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-orange-500 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500 shrink-0 ml-4" />
                )}
              </button>

              {isOpen && (
                <div
                  id={`faq-content-${idx}`}
                  className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs text-slate-300 leading-relaxed font-medium border-t border-slate-800/50 pt-4 bg-slate-950/20"
                >
                  <p className="pl-6 relative">
                    <span className="absolute left-0 top-0 text-slate-500 font-mono">A:</span>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Notice block */}
      <div className="mt-12 bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-black text-orange-300 uppercase tracking-wider">
            {lang === "bn" ? "গুরুত্বপূর্ণ আইনি সতর্কতা" : "IMPORTANT EDUCATIONAL DISCLAIMER"}
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed mt-1 font-medium">
            {lang === "bn"
              ? "FruitExpert AI দ্বারা প্রকাশিত উদ্ভিদবিজ্ঞান সংক্রান্ত তথ্য সম্পূর্ণ সাধারণ শিক্ষার উদ্দেশ্যে তৈরি। এটি কোনো পেশাদার কৃষি সেবা, কীটনাশক প্রেসক্রিপশন বা পুষ্টি পরামর্শের বিকল্প নয়।"
              : "All botanical information generated by FruitExpert AI is for educational reference only. It should not be used as a primary substitute for certified agricultural consults, pesticide prescriptions, or medical-grade dietary guidance."}
          </p>
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 flex justify-center border-t border-slate-900 pt-6">
        <button
          onClick={onBack}
          className="bg-slate-900 text-xs text-slate-300 font-bold py-2.5 px-5 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{lang === "bn" ? "অ্যাপে ফিরে যান" : "Back to App"}</span>
        </button>
      </div>
    </div>
  );
}
