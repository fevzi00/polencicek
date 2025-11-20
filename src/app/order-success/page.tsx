"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center animate-scale-in">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Siparişiniz Alındı!
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            Teşekkür ederiz! Siparişiniz başarıyla oluşturuldu.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 mb-8">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <div className="text-sm text-slate-600 mb-1">Sipariş Numarası</div>
                <div className="text-lg font-bold text-purple-600">
                  #ORD-{Math.floor(Math.random() * 100000)}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Tahmini Teslimat</div>
                <div className="text-lg font-bold text-slate-900">
                  {new Date(Date.now() + 86400000).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Sipariş durumunuz hakkında e-posta ile bilgilendirileceksiniz.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="btn-primary px-8 py-4">
                Alışverişe Devam Et
              </button>
            </Link>
            <Link href="/">
              <button className="btn-secondary px-8 py-4">
                Ana Sayfaya Dön
              </button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Tazelik Garantisi
              </h3>
              <p className="text-sm text-slate-600">
                Her gün taze çiçekler
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Hızlı Teslimat
              </h3>
              <p className="text-sm text-slate-600">
                Aynı gün teslim
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                E-posta Takibi
              </h3>
              <p className="text-sm text-slate-600">
                Anlık bildirimler
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}