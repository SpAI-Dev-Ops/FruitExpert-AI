import React from "react";
import { Shield, ArrowLeft, Mail, Lock, Camera, HardDrive, Cpu } from "lucide-react";
import { Language, translations } from "../i18n";

interface PrivacyPolicyProps {
  onBack: () => void;
  lang: Language;
}

export default function PrivacyPolicy({ onBack, lang }: PrivacyPolicyProps) {
  const t = translations[lang];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-text animate-fade-in text-slate-100">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>{lang === "bn" ? "অ্যাপে ফিরে যান" : "Back to App"}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="bg-orange-500/10 text-orange-500 p-3 rounded-2xl border border-orange-500/20 shadow-inner">
            <Shield className="h-8 w-8 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {lang === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {lang === "bn" ? "কার্যকরী তারিখ: ১১ আগস্ট, ২০২৬" : "Effective Date: August 11, 2026"}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-medium">
          {lang === "bn" 
            ? "আমরা আপনার গোপনীয়তাকে মূল্যায়ন করি। এই নীতিতে কীভাবে FruitExpert AI ডেটা প্রক্রিয়াকরণ, স্টোরেজ এবং ক্যামেরা অ্যাক্সেস পরিচালনা করে তা বিস্তারিত আলোচনা করা হয়েছে।"
            : "We value your privacy. This policy details how FruitExpert AI manages data processing, storage, and camera access."}
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-10">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "FruitExpert AI সম্পর্কে" : "About FruitExpert AI"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "FruitExpert AI হলো একটি উন্নত উদ্ভিদবিজ্ঞান সনাক্তকারী এবং কৃষি বিশ্লেষণ পোর্টাল। আমরা উচ্চ-মানের স্পেসিফিকেশন, পুষ্টির প্রোফাইল, বৈশ্বিক উৎপাদন অর্থনীতি এবং উদ্ভিদবিজ্ঞান সংক্রান্ত তথ্য সরবরাহ করতে সর্বাধুনিক কম্পিউটার ভিশন মডেল ব্যবহার করি। আমাদের পরিষেবা কৃষিবিদ, কৃষক, রন্ধন বিশেষজ্ঞ এবং ফল উৎসাহীদের শিক্ষিত ও অবহিত করার জন্য ডিজাইন করা হয়েছে।"
              : "FruitExpert AI is an advanced botanical identifier and agricultural analysis portal. We utilize cutting-edge visual computer vision models to provide high-fidelity specifications, nutritional profiles, global production economics, and botanical trivia. Our service is designed to educate and inform agronomists, farmers, culinary experts, and fruit enthusiasts alike."}
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "যেসব তথ্য আমরা প্রক্রিয়াজাত করি" : "Information We Process"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "উদ্ভিদবিজ্ঞান সংক্রান্ত অনুরোধ সফল করতে, আমরা ফলের নমুনা সম্পর্কে বিভিন্ন মেটাডেটা প্রক্রিয়াজাত করি। এর মধ্যে রয়েছে আপলোড করা ছবি, ক্যাপচার করা ছবি, প্রিসেট নমুনা এবং সক্রিয় টেক্সট চ্যাট প্রশ্নাবলী। সঠিক তথ্য প্রদানের জন্য এই ডেটা সম্পূর্ণরূপে প্রোগ্রাম্যাটিকভাবে প্রক্রিয়া করা হয়।"
              : "To fulfill botanical requests, we process metadata about the fruit specimen. This includes uploaded imagery, captured photographs, preset selections, and active text chat prompts. This information is processed programmatically to yield precise botanical attributes."}
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "ক্যামেরা এবং ছবি" : "Camera and Photos"}
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-3.5">
            <div className="bg-orange-500/10 text-orange-500 p-2 rounded-xl border border-orange-500/15 shrink-0 h-10 w-10 flex items-center justify-center">
              <Camera className="h-5 w-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {lang === "bn"
                ? "আমাদের লাইভ স্ক্যান ল্যাবে ছবি ধারণ করতে আপনার ডিভাইসের ক্যামেরা ব্যবহারের অনুমতি প্রয়োজন হয়। ক্যামেরা অ্যাক্সেস সম্পূর্ণ ঐচ্ছিক, যা ক্লায়েন্ট-সাইডে পরিচালিত হয় এবং ব্রাউজারে অনুমতি প্রদান আবশ্যক। আমাদের সার্ভারে কোনো অনবরত ভিডিও স্ট্রিম পাঠানো বা সংরক্ষণ করা হয় না; শুধুমাত্র বিশ্লেষন কাজের জন্য একক ফ্রেম ব্যবহার করা হয়।"
                : "Our Live Scan Lab requires access to your device's camera stream to capture pictures of specimens. Camera access is strictly opt-in, handled on the client-side, and requires explicit browser permissions. No continuous video stream is transmitted or stored on our servers; only the single captured frame is utilized for analysis."}
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "এআই বিশ্লেষণ এবং জেমিনি এপিআই" : "AI Analysis and Gemini API"}
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-3.5">
            <div className="bg-orange-500/10 text-orange-500 p-2 rounded-xl border border-orange-500/15 shrink-0 h-10 w-10 flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {lang === "bn"
                ? "ছবি শ্রেণিবিন্যাস এবং চ্যাট প্রক্রিয়াকরণ Google GenAI SDK (Gemini API) ব্যবহার করে সুরক্ষিত সার্ভার-সাইডে সম্পন্ন হয়। ক্যাপচার করা ছবি এবং আলাপচারিতার বার্তা আমাদের নিরাপদ সার্ভার প্রক্সির মাধ্যমে পাঠানো হয়, যা ব্রাউজারে কোনো প্রকার API Key বা সিক্রেট ফাঁস হতে বাধা দেয়।"
                : "Image classification and chat processing are powered securely server-side using the Google GenAI SDK (Gemini API). Captured image payloads and conversation messages are transmitted to our secure server proxy, preventing any API keys or secrets from being exposed to the browser."}
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "লোকাল স্টোরেজ (স্থানীয় সংরক্ষণ)" : "Local Storage"}
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-3.5">
            <div className="bg-orange-500/10 text-orange-500 p-2 rounded-xl border border-orange-500/15 shrink-0 h-10 w-10 flex items-center justify-center">
              <HardDrive className="h-5 w-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {lang === "bn"
                ? "আমরা আপনার স্ক্যান হিস্ট্রি, প্রিয় নমুনা এবং চ্যাট বার্তা সংরক্ষণ করতে ব্রাউজারের localStore ব্যবহার করি। এই ডেটা সম্পূর্ণ ক্লায়েন্ট-সাইডে আপনার ব্রাউজারের স্যান্ডবক্সে থাকে। আমরা কোনো কেন্দ্রীয় সার্ভারে এই ডেটা সংরক্ষণ বা ক্যাশ করি না, যা আপনার গোপনীয়তা অক্ষুণ্ণ রাখে।"
                : "We leverage browser localStorage to store your private Scan History, favorite specimens, and active chat logs. This data remains completely client-side in your own browser sandboxed environment. We do not sync or cache this list to central servers, preserving your operational privacy."}
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "কীভাবে তথ্য ব্যবহার করা হয়" : "How Information Is Used"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "আমরা প্রক্রিয়াজাত উপাত্তসমূহ শুধুমাত্র কৃষি ড্যাশবোর্ড রেন্ডার করতে, চ্যাট প্রশ্নের উত্তর দিতে, এক্সপোর্টেবল JSON প্রস্তুত করতে এবং পিডিএফ রিপোর্ট মুদ্রণ করতে ব্যবহার করি। আপনার ফাইলগুলো কোনো মেশিন লার্নিং মডেল প্রশিক্ষণ দিতে, বিজ্ঞাপন দেখাতে বা ব্যবহারকারীর আচরণ ট্র্যাক করতে ব্যবহার করা হয় না।"
              : "We use processed data solely to render the Agronomy Dashboard, support interactive chat inquiries, generate downloadable JSON archives, and print PDF reports. Your files are not used to train machine learning models, sell advertisements, or profile user behavior."}
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "উপাত্তের অংশীদারিত্ব এবং থার্ড-পার্টি সার্ভিস" : "Data Sharing and Third-Party Services"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "ফলের ছবি ও চ্যাট বার্তা শ্রেণিবিন্যাসের জন্য গুগল জেনএআই এপিআই-তে পাঠানো হয়। যখন আপনি গুগল ফিডব্যাক ফর্মের মাধ্যমে আপনার মূল্যবান মতামত প্রদান করেন, তা ফর্ম সিস্টেম দ্বারা সংগৃহীত হয়। এই প্রশ্নাবলীতে কোনো পাসওয়ার্ড, গোপনীয় ক্যামেরা ফিড বা ছবি চাওয়া হয় না। এগুলি ব্যতীত কোনো ব্যক্তিগত তথ্য, ছবি বা লগ কোনো থার্ড-পার্টি বিজ্ঞাপন বা এজেন্সির সাথে ভাগ করা হয় না।"
              : "Image files and chat conversations are sent to Google GenAI endpoints to perform core botanical classifications. When you voluntarily submit feedback using our external Google Feedback Form, your responses are collected by the external form system. This feedback questionnaire does not request, transmit, or store security credentials, passwords, API keys, private camera feeds, or scan imagery. Aside from these integrations, no personal user information, imagery, or logs are shared, leased, or distributed to third-party marketing trackers or external agencies."}
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "উপাত্ত ধারণকাল" : "Data Retention"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "যেহেতু ব্যবহারকারীর তৈরি করা সমস্ত কন্টেন্ট সরাসরি ব্রাউজারের লোকাল স্টেট এবং localStorage ক্যাশে থাকে, তাই ডেটার স্থায়িত্ব সম্পূর্ণরূপে আপনার নিয়ন্ত্রণে। সক্রিয় এপিআই অনুরোধ সম্পন্ন হওয়ার পরে আমরা সার্ভার সিস্টেমে আপলোড করা ফাইলের কোনো অনুলিপি সংরক্ষণ করি না।"
              : "Since all user-created content (specimens, conversations, favorites) resides strictly inside your browser's local state and localStorage cache, the longevity of data is controlled entirely by you. We do not retain copies of your uploads on persistent backend servers after the active API request resolves."}
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "তথ্য মুছে ফেলা এবং নিয়ন্ত্রণ" : "Data Deletion and User Controls"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "আপনি আপনার তথ্যের উপর সম্পূর্ণ নিয়ন্ত্রণ রাখেন। আপনি স্পেসিমেন লাইব্রেরিতে 'সব মুছুন' বা চ্যাটে 'আলাপচারিতা মুছুন' বা ব্রাউজার ক্যাশ ম্যানুয়ালি সাফ করার মাধ্যমে তাৎক্ষণিকভাবে আপনার সমস্ত তথ্য সম্পূর্ণ মুছে ফেলতে পারেন।"
              : "You retain complete, real-time control over your data. You can instantly wipe your entire history at any time using the \"Clear All\" controls inside the Specimen Library, reset conversations via the \"Clear Chat\" triggers, or clear your browser data manually to eliminate all local footprints."}
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "নিরাপত্তা" : "Security"}
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-3.5">
            <div className="bg-orange-500/10 text-orange-500 p-2 rounded-xl border border-orange-500/15 shrink-0 h-10 w-10 flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {lang === "bn"
                ? "আপনার ডিভাইস এবং ইন্টারঅ্যাকশন রক্ষা করতে আমরা এনক্রিপশন (HTTPS), কঠোর পে-লোড সীমা, নিরাপদ সার্ভার যাচাইকরণ এবং মডুলার ক্লায়েন্ট আইসোলেশন সহ সর্বোত্তম নিরাপত্তা ব্যবস্থা ব্যবহার করি।"
                : "We employ robust security practices including end-to-end transport encryption (HTTPS) for all network traffic, rigorous backend payload limits, strict verification check steps, and modular isolation of client assets to safeguard your device and interactions."}
            </p>
          </div>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "শিশুদের গোপনীয়তা" : "Children's Privacy"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "FruitExpert AI একটি শিক্ষামূলক উদ্ভিদবিজ্ঞান পোর্টাল। আমরা জেনেশুনে ১৩ বছরের কম বয়সী শিশুদের থেকে কোনো ব্যক্তিগত তথ্য বা আইডি সংগ্রহ বা অনুরোধ করি না।"
              : "FruitExpert AI is an educational botanical portal. We do not intentionally compile or request personal coordinates, addresses, or identifiers from children under the age of 13."}
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "আন্তর্জাতিক উপাত্ত প্রক্রিয়াকরণ" : "International Data Processing"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "আমাদের অ্যাপ্লিকেশনটি বিশ্বব্যাপী ক্লাউড নেটওয়ার্কে চালিত হয়। এপিআই অনুরোধগুলো স্ট্যান্ডার্ড আন্তর্জাতিক নিরাপত্তা প্রোটোকল অনুযায়ী এনক্রিপ্ট করা ট্রানজিট পাইপলাইনের মাধ্যমে প্রক্রিয়াজাত করা হয়।"
              : "Our application runs on global cloud networks. API classification requests are processed securely across encrypted transit pipelines according to standardized international security protocols."}
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "গোপনীয়তা নীতি পরিবর্তন" : "Changes to This Privacy Policy"}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {lang === "bn"
              ? "অ্যাপের পরিধি বৃদ্ধির সাথে সাথে এই গোপনীয়তা নীতি পরিবর্তন করার অধিকার আমাদের রয়েছে। যেকোনো ধরনের পরিবর্তনের ক্ষেত্রে এই নীতিমালার ওপরে সংশোধিত তারিখ উল্লেখ করা হবে। আপনার গোপনীয়তা সুরক্ষায় আমরা কীভাবে কাজ করছি তা জানতে সময়ে সময়ে এই পৃষ্ঠাটি দেখার অনুরোধ রইল।"
              : "We reserves the right to refine or alter this Privacy Policy as application capabilities grow. Any updates will be noted with a modified effective date at the top of this document. We encourage users to check this page periodically for details on how we safeguard privacy."}
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
            {lang === "bn" ? "যোগাযোগ করুন" : "Contact Us"}
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-3.5">
            <div className="bg-orange-500/10 text-orange-500 p-2 rounded-xl border border-orange-500/15 shrink-0 h-10 w-10 flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {lang === "bn"
                  ? "এই নীতি, নিরাপত্তা ব্যবস্থা, বা সার্ভারের উপাত্ত প্রক্রিয়াকরণ সম্পর্কিত যেকোনো প্রশ্নের জন্য আমাদের সহায়তা টিমের সাথে যোগাযোগ করুন:"
                  : "For questions regarding this policy, security protocols, or backend data handling, please contact our support team at:"}
              </p>
              <p className="text-xs font-black text-orange-400 mt-1">
                support@fruitexpert.co.uk
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer Back Button */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          © 2026 FruitExpert AI
        </p>
        <button
          onClick={onBack}
          className="bg-slate-900 text-xs text-slate-300 font-bold py-2 px-4 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{lang === "bn" ? "অ্যাপে ফিরে যান" : "Back to App"}</span>
        </button>
      </div>
    </div>
  );
}

