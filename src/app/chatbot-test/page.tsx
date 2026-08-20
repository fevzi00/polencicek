"use client";

import { useState } from "react";
import Script from "next/script";

export default function ChatbotTestPage() {
  const defaultUrl = process.env.NEXT_PUBLIC_CHATBOT_WIDGET_URL || "http://localhost:8080/static/widget.js";
  const [widgetUrl, setWidgetUrl] = useState(defaultUrl);
  const [activeUrl, setActiveUrl] = useState(defaultUrl);

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (widgetUrl.trim()) {
      setActiveUrl(widgetUrl.trim());
      // Reload page to re-inject script cleanly if changed
      window.location.href = `/chatbot-test?url=${encodeURIComponent(widgetUrl.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
              AI
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Yapay Zeka Sohbet Asistanı — Canlı Test Sayfası
              </h1>
              <p className="text-sm text-slate-500">
                Polen Çiçek & RAG Chatbot Entegrasyonu
              </p>
            </div>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Bu test sayfası, RAG (Retrieval-Augmented Generation) mimarisiyle çalışan 
            yapay zeka sohbet asistanını canlı web sitemiz üzerinde test etmek için oluşturulmuştur.
          </p>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 mb-6">
            <h2 className="font-semibold text-purple-950 mb-2 flex items-center gap-2">
              💡 Test Talimatları
            </h2>
            <ul className="text-sm text-purple-900 space-y-1.5 list-disc list-inside">
              <li>Ekranın sağ alt köşesindeki <strong>mor sohbet balonuna</strong> tıklayın.</li>
              <li>Sohbet botuna ürünler, çiçek bakımı veya sipariş durumları hakkında sorular sorun.</li>
              <li>Yanıtların altındaki doküman kaynaklarını (citations) kontrol edin.</li>
            </ul>
          </div>

          <form onSubmit={handleApplyUrl} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Widget Script Sunucu Adresi
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={widgetUrl}
                onChange={(e) => setWidgetUrl(e.target.value)}
                placeholder="https://xxxx.ngrok-free.app/static/widget.js"
                className="flex-1 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Guncelle & Test Et
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Ngrok, Cloudflare Tunnel veya canlı sunucu adresinizi girdiğinizde widget bu adresten yüklenecektir.
            </p>
          </form>
        </div>
      </div>

      {/* Inject Chatbot Widget Script */}
      <Script
        key={activeUrl}
        src={activeUrl}
        strategy="afterInteractive"
        onLoad={() => console.log("Chatbot Widget script successfully loaded on polencicek.com!")}
        onError={(e) => console.error("Chatbot Widget script failed to load:", e)}
      />
    </div>
  );
}
