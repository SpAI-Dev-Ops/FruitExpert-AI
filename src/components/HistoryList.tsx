import React, { useState } from "react";
import { History, Trash2, Calendar, Search, Star, MoreVertical, Eye, Heart } from "lucide-react";
import { ScanHistoryItem } from "../types";
import { Language, translations } from "../i18n";

interface HistoryListProps {
  history: ScanHistoryItem[];
  onSelect: (item: ScanHistoryItem) => void;
  activeId: string | undefined;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onClearAll: () => void;
  lang: Language;
}

export default function HistoryList({
  history,
  onSelect,
  activeId,
  onDelete,
  onToggleFavorite,
  onClearAll,
  lang
}: HistoryListProps) {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "favorites">("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Filter logs based on search and favorites filter
  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.analysis.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.analysis.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || !!item.isFavorite;

    return matchesSearch && matchesFilter;
  });

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Close menu on click outside
  React.useEffect(() => {
    const handleOutsideClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  if (history.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center py-12 space-y-4 text-white">
        <div className="w-14 h-14 bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner">
          <History className="h-6 w-6" />
        </div>
        <div className="max-w-[240px] space-y-1">
          <h3 className="text-sm font-bold text-slate-200">{t.noLogsTitle}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.noLogsDesc}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-4 text-white relative">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
          <History className="h-4.5 w-4.5 text-orange-500" />
          {t.historyTitle}
        </h3>
        <button
          onClick={onClearAll}
          className="text-[10px] font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 py-1.5 px-2.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-slate-800"
        >
          <Trash2 className="h-3 w-3" />
          {t.clearAll}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>

        {/* Filters Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setFilterType("all")}
            className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === "all"
                ? "bg-slate-850 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.allLogs} ({history.length})
          </button>
          <button
            onClick={() => setFilterType("favorites")}
            className={`flex-1 text-center py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              filterType === "favorites"
                ? "bg-slate-850 text-orange-500 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Star className={`h-3 w-3 ${filterType === "favorites" ? "fill-orange-500" : ""}`} />
            {t.starred} ({history.filter((h) => h.isFavorite).length})
          </button>
        </div>
      </div>

      {/* Main List container */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            {t.noMatchingResults}
          </div>
        ) : (
          filteredHistory.map((item) => {
            const isActive = item.id === activeId;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`group relative flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-850/60 border-orange-500/50 shadow-md"
                    : "bg-slate-950/40 border-slate-800 hover:bg-slate-850/30 hover:border-slate-800"
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-11 h-11 rounded-lg overflow-hidden border border-slate-800/80 shrink-0 bg-slate-900">
                    <img
                      src={item.imageUrl}
                      alt={item.analysis.commonName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-xs font-bold truncate ${isActive ? "text-orange-400" : "text-slate-200"}`}>
                      {item.analysis.commonName}
                    </h4>
                    <p className="text-[9px] text-slate-400 truncate font-mono italic">
                      {item.analysis.scientificName}
                    </p>
                    <div className="flex items-center gap-1 text-[9px] text-slate-500 mt-0.5 font-medium">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
                  {/* Star Button */}
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className={`p-1 rounded-lg hover:bg-slate-800 transition-all ${
                      item.isFavorite
                        ? "text-orange-500"
                        : "text-slate-500 hover:text-orange-400"
                    }`}
                    title={item.isFavorite ? (lang === "bn" ? "স্টার মুছুন" : "Unstar Specimen") : (lang === "bn" ? "স্টার করুন" : "Star Specimen")}
                  >
                    <Star className={`h-3.5 w-3.5 ${item.isFavorite ? "fill-orange-500" : ""}`} />
                  </button>

                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "bg-slate-800 text-slate-400"}`}>
                    {item.analysis.confidence}%
                  </span>

                  {/* Three-Dot Menu Button */}
                  <div className="relative">
                    <button
                      onClick={(e) => toggleMenu(e, item.id)}
                      className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
                      title={lang === "bn" ? "অ্যাকশন" : "Actions"}
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>

                    {openMenuId === item.id && (
                      <div className="absolute right-0 mt-1 w-32 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1 z-30 animate-fade-in text-[11px] font-semibold text-slate-300">
                        <button
                          onClick={() => {
                            onSelect(item);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-850 hover:text-white flex items-center gap-2"
                        >
                          <Eye className="h-3 w-3 text-slate-400" />
                          {lang === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
                        </button>
                        <button
                          onClick={() => {
                            onToggleFavorite(item.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-850 hover:text-white flex items-center gap-2"
                        >
                          <Heart className="h-3 w-3 text-orange-500" />
                          {item.isFavorite ? (lang === "bn" ? "স্টার মুছুন" : "Unstar") : (lang === "bn" ? "স্টার করুন" : "Star")}
                        </button>
                        <hr className="border-slate-800 my-1" />
                        <button
                          onClick={() => {
                            onDelete(item.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-red-500/10 hover:text-red-400 flex items-center gap-2 text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                          {lang === "bn" ? "লগ মুছুন" : "Delete Log"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
