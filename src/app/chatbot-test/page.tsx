"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";

function ChatbotTestContent() {
  const searchParams = useSearchParams();
  const urlFromParam = searchParams.get("url");

  const [widgetUrl, setWidgetUrl] = useState("");
  const [activeUrl, setActiveUrl] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (urlFromParam) {
      setWidgetUrl(urlFromParam);
      setActiveUrl(urlFromParam);
    }
  }, [urlFromParam]);

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = widgetUrl.trim();
    if (!trimmed) return;

    // Ensure URL ends with /static/widget.js
    let finalUrl = trimmed;
    if (!finalUrl.endsWith("/static/widget.js")) {
      finalUrl = finalUrl.replace(/\/+$/, "") + "/static/widget.js";
    }

    setActiveUrl(finalUrl);
    setWidgetUrl(finalUrl);
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
                Yapay Zeka Sohbet Asistani — Canli Test Sayfasi
              </h1>
              <p className="text-sm text-slate-500">
                RAG Chatbot Entegrasyonu
              </p>
            </div>
          </div>

          <p className="text-slate-600 mb-6 leading-relaxed">
            Bu test sayfasi, RAG (Retrieval-Augmented Generation) mimarisiyle calisan
            yapay zeka sohbet asistanini canli web sitemiz uzerinde test etmek icin olusturulmustur.
          </p>

          {!activeUrl && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <h2 className="font-semibold text-amber-900 mb-2">
                Baglanti Gerekli
              </h2>
              <p className="text-sm text-amber-800">
                Chatbot widget&apos;ini yuklemek icin asagidaki kutuya sunucu adresinizi girin.
                Ornek: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">https://abc123.ngrok-free.app</code>
              </p>
            </div>
          )}

          {activeUrl && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
              <h2 className="font-semibold text-green-900 mb-2">
                Widget Yuklendi
              </h2>
              <p className="text-sm text-green-800">
                Sag alt kosedeki <strong>mor sohbet balonuna</strong> tiklayarak asistanla konusmaya baslayabilirsiniz.
              </p>
            </div>
          )}

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-5 mb-6">
            <h2 className="font-semibold text-purple-950 mb-2">
              Test Talimatlari
            </h2>
            <ul className="text-sm text-purple-900 space-y-1.5 list-disc list-inside">
              <li>Bilgisayarinizda <code className="bg-purple-100 px-1 rounded text-xs">ngrok http 8080</code> komutunu calistirin.</li>
              <li>Ngrok&apos;un verdigi HTTPS adresini asagiya yapisitirin.</li>
              <li>Sag alt kosedeki <strong>mor sohbet balonuna</strong> tiklayin.</li>
            </ul>
          </div>

          <form onSubmit={handleApplyUrl} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Chatbot Sunucu Adresi (Ngrok / Cloudflare Tunnel)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={widgetUrl}
                onChange={(e) => setWidgetUrl(e.target.value)}
                placeholder="https://abc123.ngrok-free.app"
                className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                Baglan
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Adres girildiginde widget otomatik olarak yuklenecektir. /static/widget.js otomatik eklenir.
            </p>
          </form>
        </div>
      </div>

      {/* Inject Chatbot Widget Script only when URL is set */}
      {activeUrl && (
        <Script
          key={activeUrl}
          src={activeUrl}
          strategy="afterInteractive"
          onLoad={() => {
            console.log("Chatbot Widget loaded successfully from:", activeUrl);
            setIsConnected(true);
          }}
          onError={(e) => {
            console.error("Chatbot Widget failed to load:", e);
            setIsConnected(false);
          }}
        />
      )}
    </div>
  );
}

export default function ChatbotTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><p>Yukleniyor...</p></div>}>
      <ChatbotTestContent />
    </Suspense>
  );
}
