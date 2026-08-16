import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  BookOpen, 
  Heart, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Calendar,
  Flame,
  Download,
  FileText
} from "lucide-react";
import { FruitAnalysis } from "../types";
import { Language, translations } from "../i18n";

interface FruitDashboardProps {
  analysis: FruitAnalysis;
  imageUrl: string;
  onQuickAction: (actionType: string, label: string) => void;
  isQuickActionLoading: boolean;
  isPreset?: boolean;
  lang: Language;
}

export default function FruitDashboard({ 
  analysis, 
  imageUrl, 
  onQuickAction,
  isQuickActionLoading,
  isPreset = false,
  lang
}: FruitDashboardProps) {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<"botanical" | "nutrition" | "agriculture" | "trivia">("botanical");

  const handleExportJSON = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      const fileName = `${commonName.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_analysis.json`;
      downloadAnchor.setAttribute("download", fileName);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Failed to export JSON:", err);
    }
  };

  const handlePrintPDF = () => {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      const producersRows = Array.isArray(topProducers)
        ? topProducers.map(p => `
            <tr>
              <td><strong>${p.country || "Unknown"}</strong></td>
              <td>${p.quantity || "N/A"}</td>
            </tr>
          `).join("")
        : "";

      const vitaminsBadges = nutritionalValue?.vitamins?.map(v => `<span class="badge badge-orange">${v}</span>`).join("") || "N/A";
      const mineralsBadges = nutritionalValue?.minerals?.map(v => `<span class="badge badge-teal">${v}</span>`).join("") || "N/A";
      const benefitsList = nutritionalValue?.healthBenefits?.map(b => `<li>${b}</li>`).join("") || "<li>No major health benefits catalogued</li>";
      const varietiesList = varieties?.map(v => `<span class="badge">${v}</span>`).join("") || "None documented";
      const exportersList = majorExporters?.map(e => `<span class="badge">${e}</span>`).join("") || "N/A";
      const factsList = interestingFacts?.map(f => `<li>${f}</li>`).join("") || "<li>None catalogued</li>";

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Botanical Analysis Report - ${commonName}</title>
          <style>
            body {
              background-color: #ffffff;
              color: #111827;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              font-size: 10.5pt;
              line-height: 1.5;
              margin: 0;
              padding: 30px;
            }
            .header {
              border-bottom: 2px solid #ea580c;
              padding-bottom: 15px;
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
            .title-area {
              flex: 1;
            }
            .main-title {
              font-size: 22pt;
              font-weight: 800;
              color: #111827;
              margin: 0 0 4px 0;
            }
            .scientific-name {
              font-size: 11pt;
              font-style: italic;
              color: #ea580c;
              font-weight: 600;
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .meta-badges {
              margin-top: 8px;
              display: flex;
              gap: 8px;
            }
            .meta-badge {
              background-color: #fff7ed;
              border: 1px solid #ffedd5;
              color: #c2410c;
              font-size: 8.5pt;
              font-weight: 700;
              padding: 3px 8px;
              border-radius: 9999px;
            }
            .meta-badge-blue {
              background-color: #f0fdf4;
              border: 1px solid #dcfce7;
              color: #15803d;
            }
            .specimen-img {
              width: 90px;
              height: 90px;
              border-radius: 12px;
              object-fit: cover;
              border: 1.5px solid #e5e7eb;
              margin-left: 15px;
            }
            .section-title {
              font-size: 12pt;
              font-weight: 700;
              color: #1f2937;
              border-bottom: 1.5px solid #e5e7eb;
              padding-bottom: 4px;
              margin-top: 20px;
              margin-bottom: 10px;
              text-transform: uppercase;
              letter-spacing: 0.03em;
              display: flex;
              align-items: center;
            }
            .section-title::before {
              content: "";
              display: inline-block;
              width: 5px;
              height: 12px;
              background-color: #ea580c;
              margin-right: 8px;
              border-radius: 1.5px;
            }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            .card {
              background-color: #f9fafb;
              border: 1px solid #f3f4f6;
              border-radius: 8px;
              padding: 10px 12px;
            }
            .card-title {
              font-size: 8pt;
              font-weight: 700;
              color: #6b7280;
              text-transform: uppercase;
              margin-bottom: 3px;
              letter-spacing: 0.02em;
            }
            .card-val {
              font-size: 12pt;
              font-weight: 800;
              color: #111827;
            }
            .bullet-list {
              margin: 0;
              padding-left: 18px;
            }
            .bullet-list li {
              margin-bottom: 4px;
              color: #374151;
            }
            .badge-container {
              display: flex;
              flex-wrap: wrap;
              gap: 5px;
              margin-top: 4px;
            }
            .badge {
              background-color: #f3f4f6;
              border: 1px solid #e5e7eb;
              color: #374151;
              font-size: 8.5pt;
              font-weight: 600;
              padding: 2.5px 7px;
              border-radius: 4px;
              display: inline-block;
            }
            .badge-teal {
              background-color: #f0fdfa;
              border: 1px solid #ccfbf1;
              color: #0f766e;
            }
            .badge-orange {
              background-color: #fff7ed;
              border: 1px solid #ffedd5;
              color: #c2410c;
            }
            .warning-box {
              background-color: #fff1f2;
              border-left: 4px solid #f43f5e;
              padding: 10px 12px;
              border-radius: 0 6px 6px 0;
              margin-top: 12px;
            }
            .warning-title {
              color: #be123c;
              font-weight: 700;
              font-size: 9pt;
              text-transform: uppercase;
              margin-bottom: 3px;
            }
            .warning-text {
              color: #9f1239;
              font-size: 9pt;
              margin: 0;
            }
            .footer {
              margin-top: 30px;
              border-top: 1px solid #e5e7eb;
              padding-top: 12px;
              text-align: center;
              font-size: 8pt;
              color: #9ca3af;
            }
            .table-producers {
              width: 100%;
              border-collapse: collapse;
              margin-top: 6px;
            }
            .table-producers th {
              background-color: #f3f4f6;
              border: 1px solid #e5e7eb;
              text-align: left;
              padding: 6px 8px;
              font-size: 8.5pt;
              font-weight: 700;
              color: #4b5563;
            }
            .table-producers td {
              border: 1px solid #e5e7eb;
              padding: 6px 8px;
              font-size: 8.5pt;
              color: #374151;
            }
            p {
              margin: 0 0 10px 0;
              color: #374151;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title-area">
              <h1 class="main-title">${commonName}</h1>
              <p class="scientific-name">${scientificName}</p>
              <div class="meta-badges">
                <span class="meta-badge">Confidence Score: ${confidence}%</span>
                <span class="meta-badge meta-badge-blue">Report Generated: ${new Date().toLocaleDateString()}</span>
              </div>
            </div>
            ${imageUrl && !imageUrl.startsWith("blob:") && !imageUrl.startsWith("data:") ? `<img src="${imageUrl}" class="specimen-img" alt="${commonName}"/>` : ""}
          </div>

          <div class="section-title">1. Botanical Profile</div>
          <p><strong>Origin & History:</strong><br/>${originHistory}</p>
          <p><strong>Physical Characteristics:</strong><br/>${physicalCharacteristics}</p>
          <p><strong>Common Varieties & Cultivars:</strong></p>
          <div class="badge-container">${varietiesList}</div>

          <div class="section-title">2. Nutrition & Wellness</div>
          <div class="grid-2">
            <div class="card">
              <div class="card-title">Energy Content</div>
              <div class="card-val">${nutritionalValue?.caloriesPer100g || 0} kcal <span style="font-size: 8.5pt; font-weight: normal; color: #4b5563;">per 100g</span></div>
            </div>
            <div class="card">
              <div class="card-title">Key Vitamins & Minerals</div>
              <div class="badge-container">${vitaminsBadges} ${mineralsBadges}</div>
            </div>
          </div>
          
          <p style="margin-top: 12px; margin-bottom: 6px;"><strong>Key Health Benefits:</strong></p>
          <ul class="bullet-list">${benefitsList}</ul>

          <p style="margin-top: 12px;"><strong>Culinary Preparation & Food Storage:</strong><br/>${culinaryUsesStorage}</p>

          <div class="section-title">3. Agricultural Economics</div>
          <div class="grid-2">
            <div>
              <p><strong>Global Production Leader:</strong><br/>${globalLeader || "N/A"}</p>
              <p><strong>Major Trade Exporters:</strong></p>
              <div class="badge-container">${exportersList}</div>
            </div>
            <div>
              <p><strong>Optimal Cultivation Climate:</strong><br/>${growingConditions || "N/A"}</p>
              <p><strong>Harvest Seasonality:</strong><br/>${seasonality || "N/A"}</p>
            </div>
          </div>

          ${producersRows ? `
            <p style="margin-top: 12px; margin-bottom: 4px;"><strong>Top Producing Countries (Thousands of Metric Tons):</strong></p>
            <table class="table-producers">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Quantity/Details</th>
                </tr>
              </thead>
              <tbody>
                ${producersRows}
              </tbody>
            </table>
          ` : ""}

          <div class="section-title">4. Trivia & Safety</div>
          <p><strong>Intriguing Trivia & Facts:</strong></p>
          <ul class="bullet-list">${factsList}</ul>

          ${healthWarnings ? `
            <div class="warning-box">
              <div class="warning-title">Safety Concerns & Cross-Reactions</div>
              <p class="warning-text">${healthWarnings}</p>
            </div>
          ` : ""}

          <div class="footer">
            Report generated by FruitExpert AI Botanical Identifier & Agricultural Analyzer.
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 350);
            };
          </script>
        </body>
        </html>
      `;

      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 60000);
    } catch (err) {
      console.error("Failed to print PDF:", err);
    }
  };

  const {
    commonName,
    scientificName,
    confidence,
    originHistory,
    physicalCharacteristics,
    nutritionalValue,
    varieties,
    culinaryUsesStorage,
    topProducers,
    globalLeader,
    majorExporters,
    growingConditions,
    seasonality,
    interestingFacts,
    healthWarnings
  } = analysis;

  // Prepare data for the Top Producers chart
  const chartData = Array.isArray(topProducers)
    ? topProducers.map((prod) => ({
        country: prod?.country || "Unknown",
        value: prod?.valueNumeric || 0, // Numeric value for the bar size
        formatted: prod?.quantity || "0"  // Visual quantity label
      }))
    : [];

  const quickActionsList = [
    { type: "more_varieties", label: lang === "bn" ? "🔍 আরও জাতসমূহ" : "🔍 More Varieties", color: "hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400" },
    { type: "production_stats", label: lang === "bn" ? "📊 উৎপাদন পরিসংখ্যান" : "📊 Production Statistics", color: "hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400" },
    { type: "recipes_uses", label: lang === "bn" ? "🍽️ রেসিপি এবং ব্যবহার" : "🍽️ Recipes & Uses", color: "hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400" },
    { type: "grow_home", label: lang === "bn" ? "🌱 বাড়িতে চাষ করুন" : "🌱 Grow at Home", color: "hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400" },
    { type: "health_nutrition", label: lang === "bn" ? "⚠️ স্বাস্থ্য সংক্রান্ত তথ্য" : "⚠️ Health Deep Dive", color: "hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400" }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col space-y-6 text-white">
      {/* 1. Header Card (Image + Quick metadata) */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/3 max-w-[220px] h-44 rounded-2xl overflow-hidden shadow-md border-2 border-slate-800 relative group shrink-0">
          <img 
            src={imageUrl} 
            alt={commonName} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[9px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider border border-slate-800">
            {lang === "bn" ? "নমুনা তথ্য" : "Specimen Spec"}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-3 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-2xl font-black text-white leading-tight">
              {commonName}
            </h2>
            <div className="inline-flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <div className="bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-bold px-3 py-1 rounded-full">
                <span>{lang === "bn" ? `মিল: ${confidence ? `${confidence}%` : "এআই সনাক্তকরণ"}` : `Match: ${confidence ? `${confidence}%` : "AI Identification"}`}</span>
              </div>
              {isPreset ? (
                <div className="bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-bold px-3 py-1 rounded-full">
                  <span>{lang === "bn" ? "প্রিসেট নমুনা" : "Preset Specimen"}</span>
                </div>
              ) : (
                <div className="bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-bold px-3 py-1 rounded-full">
                  <span>{lang === "bn" ? "রিয়েল-টাইম এআই স্ক্যান" : "Real-Time AI Scan"}</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs font-semibold text-orange-500 italic font-mono uppercase tracking-wide">
            {scientificName}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl line-clamp-3">
            {originHistory}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 justify-center md:justify-start" id="export-controls-container">
            <button
              id="btn-export-json"
              onClick={handleExportJSON}
              className="bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-300 hover:text-white text-[11px] font-black px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer hover:bg-slate-850/50"
              title={lang === "bn" ? "বিশ্লেষণ ডেটা একটি JSON ফাইল হিসাবে ডাউনলোড করুন" : "Download analysis data as a JSON file"}
            >
              <Download className="h-3.5 w-3.5 text-orange-500" />
              <span>{t.exportJson}</span>
            </button>
            <button
              id="btn-export-pdf"
              onClick={handlePrintPDF}
              className="bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/45 text-orange-400 hover:text-orange-300 text-[11px] font-black px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              title={lang === "bn" ? "একটি পিডিএফ ফাইল হিসাবে ডাউনলোড করুন" : "Save a high-fidelity summary as PDF or Print"}
            >
              <FileText className="h-3.5 w-3.5 text-orange-400" />
              <span>{t.exportPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Tabs Selector */}
      <div className="px-6">
        <div className="flex border-b border-slate-800 overflow-x-auto scrollbar-none gap-2">
          <button
            onClick={() => setActiveTab("botanical")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "botanical"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            {t.tabBotanical}
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "nutrition"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Heart className="h-4 w-4" />
            {t.tabNutrition}
          </button>
          <button
            onClick={() => setActiveTab("agriculture")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "agriculture"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Globe className="h-4 w-4" />
            {t.tabAgriculture}
          </button>
          <button
            onClick={() => setActiveTab("trivia")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "trivia"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            {t.tabTrivia}
          </button>
        </div>
      </div>

      {/* 3. Tab Content Modules */}
      <div className="px-6 pb-2 min-h-[300px]">
        {activeTab === "botanical" && (
          <div className="space-y-6 animate-fade-in">
            {/* Origin & History */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                {t.titleOrigin}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {originHistory}
              </p>
            </div>

            {/* Physical Characteristics */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                {t.titlePhysical}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {physicalCharacteristics}
              </p>
            </div>

            {/* Popular Varieties */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                {t.titleVarieties}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {varieties && Array.isArray(varieties) && varieties.map((variety, idx) => (
                  <div key={idx} className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-300 leading-relaxed font-bold">
                      {variety}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="space-y-6 animate-fade-in">
            {/* Energy Density & Micronutrient Profile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{t.titleEnergy}</div>
                  <div className="text-base font-black text-white">{nutritionalValue?.caloriesPer100g || 0} <span className="text-xs font-semibold text-slate-400">kcal / 100g</span></div>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">{t.titleVitamins}</div>
                <div className="flex flex-wrap gap-1.5">
                  {nutritionalValue?.vitamins && Array.isArray(nutritionalValue.vitamins) && nutritionalValue.vitamins.map((vit, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-800 text-orange-400 text-[10px] font-bold px-2 py-1 rounded-md">
                      {vit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">{t.titleMinerals}</div>
                <div className="flex flex-wrap gap-1.5">
                  {nutritionalValue?.minerals && Array.isArray(nutritionalValue.minerals) && nutritionalValue.minerals.map((min, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-800 text-teal-400 text-[10px] font-bold px-2 py-1 rounded-md">
                      {min}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Health & Wellness Benefits */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                {t.titleBenefits}
              </h3>
              <div className="space-y-2">
                {nutritionalValue?.healthBenefits && Array.isArray(nutritionalValue.healthBenefits) && nutritionalValue.healthBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary & Storage advice */}
            <div className="space-y-2 bg-slate-950/40 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>🍽️</span> {t.titleCulinary}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1 font-medium">
                {culinaryUsesStorage}
              </p>
            </div>
          </div>
        )}

        {activeTab === "agriculture" && (
          <div className="space-y-6 animate-fade-in">
            {/* Statistics and Leaders info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side: stats metadata */}
              <div className="space-y-4">
                <div className="bg-orange-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="bg-white/10 p-2.5 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-orange-100 uppercase tracking-wider">
                      {lang === "bn" ? "বিশ্বের শীর্ষ উৎপাদক" : "Global Production Leader"}
                    </div>
                    <div className="text-sm font-black leading-tight mt-0.5">{globalLeader}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    {lang === "bn" ? "প্রধান রপ্তানি বাজার" : "Major Trade Exporters"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {majorExporters && Array.isArray(majorExporters) && majorExporters.map((exporter, idx) => (
                      <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg">
                        {exporter}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    {lang === "bn" ? "আদর্শ জলবায়ু ও চাষাবাদ" : "Optimal Cultivation Climate"}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800 font-medium">
                    {growingConditions}
                  </p>
                </div>
              </div>

              {/* Right Side: Recharts Bar Chart */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/40 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-0.5">
                    {lang === "bn" ? "শীর্ষ ৫ উৎপাদনকারী দেশ" : "Top 5 Producing Countries"}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {lang === "bn" ? "বার্ষিক ফলন পরিমাণ (হাজার মেট্রিক টন)" : "Annual harvest quantities (Thousands of Metric Tons)"}
                  </p>
                </div>
                
                <div className="h-44 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                      <XAxis type="number" stroke="#475569" fontSize={9} />
                      <YAxis dataKey="country" type="category" stroke="#475569" fontSize={9} width={60} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-905 border border-slate-850 text-white text-[10px] px-2.5 py-1.5 rounded shadow-xl">
                                <span className="font-bold">{data.country}</span>
                                <div className="text-orange-400 mt-0.5">
                                  {lang === "bn" ? "উৎপাদন" : "Production"}: {data.formatted}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "trivia" && (
          <div className="space-y-6 animate-fade-in">
            {/* Seasonality Indicator */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 bg-orange-500/10 text-orange-400 rounded-lg flex items-center justify-center shrink-0 border border-orange-500/20 shadow-inner">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                  {lang === "bn" ? "ঋতু ও ফসল কাটার সময়" : "Harvest Seasonality Peak"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1 font-bold">
                  {seasonality}
                </p>
              </div>
            </div>

            {/* Interesting Facts Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                {lang === "bn" ? "আকর্ষণীয় উদ্ভিদবিজ্ঞান তথ্য" : "Intriguing Trivia & Facts"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {interestingFacts && Array.isArray(interestingFacts) && interestingFacts.map((fact, idx) => (
                  <div key={idx} className="bg-slate-950/30 border border-slate-800 hover:border-slate-750 p-4 rounded-xl flex flex-col justify-between transition-all">
                    <span className="text-lg">💡</span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2 font-medium">
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety and Allergens Warnings */}
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-rose-300 uppercase tracking-wider">
                  {lang === "bn" ? "অ্যালার্জি এবং সতর্কতা" : "Safety Concerns & Cross-Reactions"}
                </h4>
                <p className="text-xs text-rose-400 leading-relaxed mt-1 font-medium">
                  {healthWarnings}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Quick Actions Panel */}
      <div className="bg-slate-950 border-t border-slate-800 p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
              {lang === "bn" ? "🔘 ইন্টারেক্টিভ কুইক অ্যাকশন" : "🔘 Interactive Quick Actions"}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            {lang === "bn" ? (
              <>
                <strong className="text-orange-400">{commonName}</strong> সম্পর্কে একটি বিস্তারিত কাস্টমাইজড রিপোর্ট তৈরি করতে নিচের যেকোনো বিষয়ে ক্লিক করুন:
              </>
            ) : (
              <>
                Synthesize rich customized reports regarding <strong className="text-orange-400">{commonName}</strong> by tapping any topic below:
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {quickActionsList.map((action) => (
              <button
                key={action.type}
                onClick={() => onQuickAction(action.type, action.label)}
                disabled={isQuickActionLoading}
                className={`bg-slate-900 text-xs font-bold px-3.5 py-2 border border-slate-800 rounded-xl text-slate-300 shadow-md cursor-pointer whitespace-nowrap select-none transition-all duration-150 ${action.color} active:scale-95 disabled:opacity-50 disabled:pointer-events-none`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
