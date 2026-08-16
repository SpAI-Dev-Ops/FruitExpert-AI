// Reusable Translation & Internationalization (i18n) Architecture for FruitExpert AI
export type Language = "en" | "bn";

export interface TranslationDictionary {
  // Common Navigation / Header
  appName: string;
  giveFeedback: string;
  privacyPolicy: string;
  contactUs: string;
  backToApp: string;
  sandboxMode: string;
  connectedMode: string;
  loadingConfig: string;

  // Welcome Promo Hero
  welcomeTitle: string;
  welcomeSubtitle: string;
  aiModel: string;
  dataReference: string;
  cultivarsCount: string;
  tryNow: string;
  howItWorks: string;
  choosePreset: string;

  // ScanLab Component
  specimenLabTitle: string;
  dragDropText: string;
  clickBrowse: string;
  explorePresets: string;
  liveCamera: string;
  stopScanner: string;
  captureSpecimen: string;
  addApiKeyMessage: string;
  cameraBlocked: string;
  unsupportedCamera: string;
  analyzingImage: string;

  // HistoryList Component
  scanHistoryTitle: string;
  clearAllLogs: string;
  noSpecimens: string;
  favorite: string;
  unfavorite: string;
  deleteLog: string;

  // FruitDashboard Component
  matchConfidence: string;
  originHistory: string;
  physicalAttributes: string;
  nutritionalProfile: string;
  keyVitamins: string;
  prominentMinerals: string;
  healthBenefits: string;
  caloriesCount: string;
  popularVarieties: string;
  culinaryUsesStorage: string;
  growingConditions: string;
  seasonality: string;
  interestingFacts: string;
  healthWarnings: string;
  topProducersTitle: string;
  globalLeaderText: string;
  majorExportersTitle: string;
  
  // Quick Action Buttons
  btnMoreVarieties: string;
  btnProductionStats: string;
  btnRecipesUses: string;
  btnGrowHome: string;
  btnHealthNutrition: string;
  quickActionLoading: string;

  // ChatSection Component
  chatCompanionTitle: string;
  chatCompanionSubtitle: string;
  chatPlaceholder: string;
  btnSend: string;
  btnMessageHistoryClear: string;
  analyzingQuery: string;
  welcomeChat: string;
  clearChatNotice: string;
  suggestedHeading: string;

  // Suggested Prompts
  promptEdibleSkin: string;
  promptVitaminC: string;
  promptAppleTrivia: string;
  promptMangoKing: string;

  // QuickActionModal Component
  modalGenerating: string;
  modalClose: string;

  // Global Footers & World Fruits Informational Card
  allRightsReserved: string;
  worldFruitsDataTitle: string;
  worldFruitsDataDesc: string;

  // Error Blocks
  errorHeader: string;
  btnRetry: string;
  btnUploadAnother: string;
  btnUsePreset: string;

  // Additional translated keys for FruitDashboard and HistoryList
  exportJson: string;
  exportPdf: string;
  tabBotanical: string;
  tabNutrition: string;
  tabAgriculture: string;
  tabTrivia: string;
  titleOrigin: string;
  titlePhysical: string;
  titleVarieties: string;
  titleEnergy: string;
  titleVitamins: string;
  titleMinerals: string;
  titleBenefits: string;
  titleCulinary: string;
  noLogsTitle: string;
  noLogsDesc: string;
  historyTitle: string;
  clearAll: string;
  searchPlaceholder: string;
  allLogs: string;
  starred: string;
  noMatchingResults: string;

  // ScanLab specific keys
  scanLabTitle: string;
  scanLabSubtitle: string;
  scanningStatus: string;
  capturePhoto: string;
  retake: string;
  analyzeSpecimen: string;
  dragDropPrompt: string;
  supportedFormats: string;
  chooseFile: string;
  sandboxWarning: string;
  presetTitle: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: "FruitExpert AI",
    giveFeedback: "💬 Give Feedback",
    privacyPolicy: "Privacy Policy",
    contactUs: "Contact Us",
    backToApp: "Back to App",
    sandboxMode: "Sandbox Mode",
    connectedMode: "Connected",
    loadingConfig: "Loading Config...",
    welcomeTitle: "Welcome to FruitExpert AI",
    welcomeSubtitle: "Advanced AI-powered portal for instant fruit identification, custom agronomy profiles, world market trade diagnostics, and scientific safety guidelines.",
    aiModel: "AI Model",
    dataReference: "Data Reference",
    cultivarsCount: "Cultivars",
    tryNow: "Try Now",
    howItWorks: "How it Works",
    choosePreset: "Or choose a sample fruit to load the workspace",
    specimenLabTitle: "SPECIMEN INTERACTIVE LAB",
    dragDropText: "Drag & drop a crisp fruit photo here",
    clickBrowse: "or click to browse local files",
    explorePresets: "EXPLORE REGISTERED SPECIMENS",
    liveCamera: "📸 Live Camera Scanner",
    stopScanner: "🛑 Stop Scanner",
    captureSpecimen: "⚡ Capture Specimen",
    addApiKeyMessage: "Add your Gemini API Key in settings to scan custom photos!",
    cameraBlocked: "Camera access is blocked or unavailable in this iframe context. Open in a new tab or try image upload.",
    unsupportedCamera: "MediaDevices API not supported on this browser context.",
    analyzingImage: "Running botanical analysis...",
    scanHistoryTitle: "SCAN HISTORY LOG",
    clearAllLogs: "Clear All Logs",
    noSpecimens: "No specimens logged. Upload or scan to begin.",
    favorite: "Favorite",
    unfavorite: "Unfavorite",
    deleteLog: "Delete Log",
    matchConfidence: "Match Confidence",
    originHistory: "Origin & History",
    physicalAttributes: "Physical Attributes & Sensory Taste",
    nutritionalProfile: "Nutritional & Biochemical Profile",
    keyVitamins: "Key Vitamins",
    prominentMinerals: "Prominent Minerals",
    healthBenefits: "Verified Health & Wellness Benefits",
    caloriesCount: "Calories",
    popularVarieties: "Popular Cultivars & Varieties",
    culinaryUsesStorage: "Culinary Prep & Shelf-Life Storage",
    growingConditions: "Ideal Horticultural & Soil Conditions",
    seasonality: "Seasonality & Harvest Peak",
    interestingFacts: "Fascinating Botanical Trivia",
    healthWarnings: "Allergen & Consumption Warnings",
    topProducersTitle: "Top Annual Producers (Metric Tons)",
    globalLeaderText: "Global Leader",
    majorExportersTitle: "Major Export Markets",
    btnMoreVarieties: "🔍 More Varieties",
    btnProductionStats: "📊 Production Stats",
    btnRecipesUses: "🍽️ Recipes & Uses",
    btnGrowHome: "🌱 Grow at Home",
    btnHealthNutrition: "⚠️ Health & Nutrition",
    quickActionLoading: "Synthesizing...",
    chatCompanionTitle: "AGRONOMY EXPERT COMPANION",
    chatCompanionSubtitle: "Ask follow-up questions about agriculture, nutrition, or recipes",
    chatPlaceholder: "Ask FruitExpert AI...",
    btnSend: "Send",
    btnMessageHistoryClear: "Clear Conversation",
    analyzingQuery: "Analyzing query...",
    welcomeChat: "Hello! I am **FruitExpert AI**, your comprehensive botanical and agricultural advisor. \n\nScan a fruit image or choose one of the preset collections to load a high-fidelity agronomy dashboard, or ask me any question about fruits directly! 🍇",
    clearChatNotice: "I have cleared our conversation. Let's start fresh! Ask me any question about fruits, agriculture, or botany. 🍇",
    suggestedHeading: "Suggested Queries",
    promptEdibleSkin: "🥝 Is kiwi skin edible?",
    promptVitaminC: "🍊 Which fruits have the most Vitamin C?",
    promptAppleTrivia: "🍎 Tell me interesting facts about apples.",
    promptMangoKing: "🥭 Alphonsos: The King of Mangoes",
    modalGenerating: "Generating detailed report...",
    modalClose: "Close",
    allRightsReserved: "All rights reserved.",
    worldFruitsDataTitle: "World Fruits Data",
    worldFruitsDataDesc: "This platform displays Curated World Fruits Data compiled from high-fidelity botanical registries and custom-trained AI classification schemas. Data is cached and formatted statically to provide generalized reference metrics for educational analysis.",
    errorHeader: "AI analysis could not be completed",
    btnRetry: "Retry Analysis",
    btnUploadAnother: "Upload Another Image",
    btnUsePreset: "Use Preset Specimen",
    exportJson: "Export JSON",
    exportPdf: "PDF Summary",
    tabBotanical: "Botanical Profile",
    tabNutrition: "Nutrition & Wellness",
    tabAgriculture: "Agricultural Economics",
    tabTrivia: "Trivia & Safety",
    titleOrigin: "Origin & History",
    titlePhysical: "Physical Characteristics & Flavor",
    titleVarieties: "Celebrated Varieties & Cultivars",
    titleEnergy: "Energy Density",
    titleVitamins: "Key Vitamins",
    titleMinerals: "Prominent Minerals",
    titleBenefits: "Health & Wellness Benefits",
    titleCulinary: "Culinary Preparation & Food Storage",
    noLogsTitle: "No Specimen Logs",
    noLogsDesc: "Scan a fruit above or select from the preset collections to populate your private agronomy library.",
    historyTitle: "Specimen Library",
    clearAll: "Clear All",
    searchPlaceholder: "Search specimen logs...",
    allLogs: "All Logs",
    starred: "Starred",
    noMatchingResults: "No matching specimens found.",
    scanLabTitle: "SPECIMEN INTERACTIVE LAB",
    scanLabSubtitle: "Capture or upload fruit photos to initiate a high-fidelity agronomic diagnostic, nutritional audit, and trade report.",
    scanningStatus: "Running botanical analysis...",
    capturePhoto: "Capture Specimen",
    retake: "Retake",
    analyzeSpecimen: "Analyze Specimen",
    dragDropPrompt: "Drag & drop a crisp fruit photo here",
    supportedFormats: "PNG, JPG, or WebP formats supported",
    chooseFile: "Choose File",
    sandboxWarning: "To scan your own fruit specimens with the live camera or custom uploads, add your Gemini API Key in the settings secrets panel. Loading rich offline simulation profiles for registered presets.",
    presetTitle: "EXPLORE REGISTERED SPECIMENS"
  },
  bn: {
    appName: "FruitExpert AI",
    giveFeedback: "💬 মতামত দিন",
    privacyPolicy: "গোপনীয়তা নীতি",
    contactUs: "যোগাযোগ করুন",
    backToApp: "অ্যাপে ফিরে যান",
    sandboxMode: "স্যান্ডবক্স মোড",
    connectedMode: "সংযুক্ত",
    loadingConfig: "কনফিগ লোড হচ্ছে...",
    welcomeTitle: "FruitExpert AI-তে স্বাগতম",
    welcomeSubtitle: "তাত্ক্ষণিক ফল সনাক্তকরণ, কাস্টম কৃষি প্রোফাইল, বিশ্ব বাজার বাণিজ্য ডায়াগনস্টিকস এবং বৈজ্ঞানিক সুরক্ষা নির্দেশিকার জন্য উন্নত এআই-চালিত পোর্টাল।",
    aiModel: "এআই মডেল",
    dataReference: "উপাত্ত সূত্র",
    cultivarsCount: "জাতসমূহ",
    tryNow: "এখনই চেষ্টা করুন",
    howItWorks: "এটি কীভাবে কাজ করে",
    choosePreset: "অথবা ওয়ার্কস্পেস লোড করতে একটি নমুনা ফল বেছে নিন",
    specimenLabTitle: "স্পেসিমেন ইন্টারেক্টিভ ল্যাব",
    dragDropText: "এখানে একটি স্পষ্ট ফলের ছবি ড্র্যাগ এবং ড্রপ করুন",
    clickBrowse: "অথবা লোকাল ফাইল ব্রাউজ করতে ক্লিক করুন",
    explorePresets: "নিবন্ধিত নমুনা অনুসন্ধান",
    liveCamera: "📸 লাইভ ক্যামেরা স্ক্যানার",
    stopScanner: "🛑 স্ক্যানার বন্ধ করুন",
    captureSpecimen: "⚡ নমুনা ক্যাপচার করুন",
    addApiKeyMessage: "আপনার নিজস্ব ছবি স্ক্যান করতে সেটিংসের সিক্রেটস প্যানেলে জেমিনি এপিআই কি যোগ করুন!",
    cameraBlocked: "ক্যামেরা অ্যাক্সেস এই আইফ্রেমের ভেতরে ব্লক বা অনুপলব্ধ। নতুন ট্যাবে অ্যাপটি খুলুন অথবা ইমেজ আপলোড চেষ্টা করুন।",
    unsupportedCamera: "এই ব্রাউজারে MediaDevices এপিআই সমর্থিত নয়।",
    analyzingImage: "উদ্ভিদবিজ্ঞান বিশ্লেষণ চলছে...",
    scanHistoryTitle: "স্ক্যান হিস্ট্রি লগ",
    clearAllLogs: "সব লগ মুছুন",
    noSpecimens: "কোনো নমুনা লগ করা নেই। শুরু করতে আপলোড বা স্ক্যান করুন।",
    favorite: "পছন্দনীয়",
    unfavorite: "অপছন্দনীয়",
    deleteLog: "লগ মুছুন",
    matchConfidence: "সাদৃশ্য আত্মবিশ্বাস",
    originHistory: "উত্স এবং ইতিহাস",
    physicalAttributes: "শারীরিক বৈশিষ্ট্য ও স্বাদ",
    nutritionalProfile: "পুষ্টি এবং জৈব রাসায়নিক প্রোফাইল",
    keyVitamins: "প্রধান ভিটামিনসমূহ",
    prominentMinerals: "মূল খনিজসমূহ",
    healthBenefits: "যাচাইকৃত স্বাস্থ্য এবং উপকারিতা",
    caloriesCount: "ক্যালোরি",
    popularVarieties: "জনপ্রিয় জাত এবং কাল্টিভার",
    culinaryUsesStorage: "রন্ধন প্রণালী ও সংরক্ষণ",
    growingConditions: "আদর্শ কৃষি ও মাটির অবস্থা",
    seasonality: "ঋতু ও ফসল কাটার সময়",
    interestingFacts: "আকর্ষণীয় উদ্ভিদবিজ্ঞান তথ্য",
    healthWarnings: "অ্যালার্জি এবং সতর্কতা",
    topProducersTitle: "শীর্ষ বার্ষিক উৎপাদক (মেট্রিক টন)",
    globalLeaderText: "বিশ্বের শীর্ষ উৎপাদক",
    majorExportersTitle: "প্রধান রপ্তানি বাজার",
    btnMoreVarieties: "🔍 আরও জাতসমূহ",
    btnProductionStats: "📊 উৎপাদন পরিসংখ্যান",
    btnRecipesUses: "🍽️ রেসিপি ও ব্যবহার",
    btnGrowHome: "🌱 ঘরে চাষ করুন",
    btnHealthNutrition: "⚠️ স্বাস্থ্য ও পুষ্টি",
    quickActionLoading: "বিশ্লেষণ হচ্ছে...",
    chatCompanionTitle: "কৃষি বিশেষজ্ঞ সহকারী",
    chatCompanionSubtitle: "কৃষি, পুষ্টি বা রন্ধন প্রণালী সম্পর্কে ফলো-আপ প্রশ্ন জিজ্ঞাসা করুন",
    chatPlaceholder: "FruitExpert AI-কে জিজ্ঞাসা করুন...",
    btnSend: "পাঠান",
    btnMessageHistoryClear: "আলাপচারিতা মুছুন",
    analyzingQuery: "জিজ্ঞাসা বিশ্লেষণ করা হচ্ছে...",
    welcomeChat: "হ্যালো! আমি **FruitExpert AI**, আপনার বিস্তৃত উদ্ভিদবিজ্ঞান এবং কৃষি বিষয়ক উপদেষ্টা। \n\nএকটি ফলের ছবি স্ক্যান করুন অথবা একটি নমুনা ফল বেছে নিয়ে কৃষি ড্যাশবোর্ডটি লোড করুন, অথবা সরাসরি ফল সংক্রান্ত যেকোনো প্রশ্ন আমাকে জিজ্ঞাসা করুন! 🍇",
    clearChatNotice: "আমি আমাদের আলাপচারিতা মুছে ফেলেছি। নতুন করে শুরু করা যাক! ফল, কৃষি বা উদ্ভিদবিজ্ঞান সম্পর্কে যেকোনো প্রশ্ন করুন। 🍇",
    suggestedHeading: "প্রস্তাবিত জিজ্ঞাসা",
    promptEdibleSkin: "🥝 কিউই ফলের খোসা কি খাওয়া যায়?",
    promptVitaminC: "🍊 কোন ফলে সবচেয়ে বেশি ভিটামিন সি থাকে?",
    promptAppleTrivia: "🍎 আপেল সম্পর্কে কিছু আকর্ষণীয় তথ্য বলুন।",
    promptMangoKing: "🥭 আলফানসো: আমের রাজা",
    modalGenerating: "বিস্তারিত রিপোর্ট তৈরি হচ্ছে...",
    modalClose: "বন্ধ করুন",
    allRightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
    worldFruitsDataTitle: "বিশ্ব ফলের উপাত্ত",
    worldFruitsDataDesc: "এই প্ল্যাটফর্মটি শিক্ষামূলক বিশ্লেষণের জন্য সাধারণ রেফারেন্স মেট্রিক্স সরবরাহ করতে উচ্চ-মানের বোটানিক্যাল রেজিস্ট্রি এবং এআই শ্রেণিবিন্যাস স্কিমা থেকে সংকলিত সংগৃহীত বিশ্ব ফলের উপাত্ত প্রদর্শন করে।",
    errorHeader: "এআই বিশ্লেষণ সম্পন্ন করা সম্ভব হয়নি",
    btnRetry: "পুনরায় চেষ্টা করুন",
    btnUploadAnother: "অন্য ছবি আপলোড করুন",
    btnUsePreset: "নমুনা ফল ব্যবহার করুন",
    exportJson: "JSON এক্সপোর্ট",
    exportPdf: "পিডিএফ রিপোর্ট",
    tabBotanical: "বোটানিক্যাল প্রোফাইল",
    tabNutrition: "পুষ্টি ও স্বাস্থ্য",
    tabAgriculture: "কৃষি অর্থনীতি",
    tabTrivia: "তথ্য ও নিরাপত্তা",
    titleOrigin: "উত্স এবং ইতিহাস",
    titlePhysical: "শারীরিক বৈশিষ্ট্য ও স্বাদ",
    titleVarieties: "বিখ্যাত জাত এবং কাল্টিভার",
    titleEnergy: "শক্তির ঘনত্ব",
    titleVitamins: "প্রধান ভিটামিনসমূহ",
    titleMinerals: "মূল খনিজসমূহ",
    titleBenefits: "স্বাস্থ্য ও পুষ্টির উপকারিতা",
    titleCulinary: "রন্ধন প্রণালী ও খাদ্য সংরক্ষণ",
    noLogsTitle: "কোনো নমুনা লগ নেই",
    noLogsDesc: "আপনার ব্যক্তিগত কৃষি লাইব্রেরি পূর্ণ করতে একটি ফলের ছবি স্ক্যান করুন অথবা একটি নমুনা ফল বেছে নিন।",
    historyTitle: "নমুনা লাইব্রেরি",
    clearAll: "সব মুছুন",
    searchPlaceholder: "নমুনা লগ খুঁজুন...",
    allLogs: "সব লগ",
    starred: "স্টারকৃত",
    noMatchingResults: "কোনো মেলানো নমুনা পাওয়া যায়নি।",
    scanLabTitle: "স্পেসিমেন ইন্টারেক্টিভ ল্যাব",
    scanLabSubtitle: "একটি নিখুঁত কৃষি ডায়াগনস্টিক, পুষ্টির নিরীক্ষা এবং বাণিজ্য প্রতিবেদন শুরু করতে ফলের ফটো ক্যাপচার বা আপলোড করুন।",
    scanningStatus: "উদ্ভিদবিজ্ঞান বিশ্লেষণ চলছে...",
    capturePhoto: "নমুনা ক্যাপচার করুন",
    retake: "আবার তুলুন",
    analyzeSpecimen: "নমুনা বিশ্লেষণ করুন",
    dragDropPrompt: "এখানে একটি স্পষ্ট ফলের ছবি ড্র্যাগ এবং ড্রপ করুন",
    supportedFormats: "পিএনজি, জেপিজি, অথবা ওয়েবপি ফরম্যাট সমর্থিত",
    chooseFile: "ফাইল বেছে নিন",
    sandboxWarning: "লাইভ ক্যামেরা বা কাস্টম আপলোডের মাধ্যমে নিজের ফলের নমুনা স্ক্যান করতে সেটিংসের সিক্রেটস প্যানেলে জেমিনি এপিআই কি যোগ করুন। নিবন্ধিত ফলগুলোর জন্য কাস্টম অফলাইন সিমুলেশন প্রোফাইল লোড করা হচ্ছে।",
    presetTitle: "নিবন্ধিত নমুনা অনুসন্ধান"
  }
};
