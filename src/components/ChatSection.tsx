import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, User, Trash2, HelpCircle } from "lucide-react";
import Markdown from "react-markdown";
import { ChatMessage } from "../types";
import { Language, translations } from "../i18n";

interface ChatSectionProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  isSending: boolean;
  onClearHistory: () => void;
  lang: Language;
}

export default function ChatSection({
  messages,
  onSendMessage,
  isSending,
  onClearHistory,
  lang
}: ChatSectionProps) {
  const t = translations[lang];
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sampleQuestions = [
    { text: t.promptEdibleSkin, icon: "🥝" },
    { text: t.promptVitaminC, icon: "🍊" },
    { text: t.promptAppleTrivia, icon: "🍎" },
    { text: t.promptMangoKing, icon: "🥭" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isSending) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isSending) {
        onSendMessage(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-[520px] text-white select-text">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 shrink-0">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-orange-500" />
          <h2 className="text-sm font-black text-slate-200 uppercase tracking-wider">{t.chatCompanionTitle}</h2>
        </div>
        {messages.length > 1 && (
          <button
            onClick={onClearHistory}
            className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-all flex items-center gap-1 cursor-pointer text-xs font-bold border border-slate-800"
            title={t.btnMessageHistoryClear}
          >
            <Trash2 className="h-4 w-4" />
            {lang === "bn" ? "চ্যাট মুছুন" : "Clear Chat"}
          </button>
        )}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 min-h-0 select-text">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-[85%] ${
              msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-slate-800 border border-slate-700 text-orange-400"
              }`}
            >
              {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed break-words overflow-hidden ${
                msg.role === "user"
                  ? "bg-orange-600 text-white font-bold rounded-tr-none shadow-md shadow-orange-500/5"
                  : "bg-slate-950 text-slate-300 border border-slate-800 rounded-tl-none markdown-body"
              }`}
            >
              {msg.role === "user" ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <Markdown>{msg.content}</Markdown>
              )}
              <span
                className={`text-[8px] block mt-1.5 text-right font-bold ${
                  msg.role === "user" ? "text-orange-200" : "text-slate-500"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex items-start gap-3 max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-orange-400 flex items-center justify-center shrink-0 animate-pulse">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none flex items-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions (only shows when conversation is empty or just has welcome message) */}
      {messages.length <= 1 && (
        <div className="pb-3 border-t border-slate-800 pt-3 shrink-0">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5 text-orange-500" />
            {t.suggestedHeading}:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(question.text.replace(/[^a-zA-Z\s\?।]/g, "").trim())}
                disabled={isSending}
                className="bg-slate-950 hover:bg-orange-500/5 hover:text-orange-400 hover:border-orange-500/20 border border-slate-850 text-[10px] font-bold px-3 py-1.5 rounded-xl text-slate-300 transition-all cursor-pointer active:scale-95 disabled:pointer-events-none"
              >
                {question.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Form */}
      <form onSubmit={handleSubmit} className="border-t border-slate-800 pt-3 flex gap-2 shrink-0 select-text">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.chatPlaceholder}
          disabled={isSending}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-white placeholder-slate-500 disabled:opacity-50 resize-none min-h-[44px] max-h-[120px] overflow-y-auto"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white p-3 rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer w-11 h-11 shrink-0"
        >
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </div>
  );
}
