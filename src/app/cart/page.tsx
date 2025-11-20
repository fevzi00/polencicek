"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Sepetiniz Boş</h1>
            <p className="text-xl text-slate-600 mb-8">
              Henüz sepetinize ürün eklemediniz
            </p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:scale-105 transition-all">
                🛍️ Alışverişe Başla
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Sepetim
          </h1>
          <p className="text-xl text-slate-600">
            {getTotalItems()} ürün
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sepet İçeriği */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex gap-6">
                    {/* Resim */}
                    <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100">
                        {item.images?.[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">
                            🌸
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Bilgiler */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="text-lg font-bold text-slate-900 hover:text-purple-600 transition-colors mb-2">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-2xl font-bold text-purple-600">
                          ₺{item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Miktar & Sil */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Miktar */}
                        <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-purple-100 hover:text-purple-600 transition-colors font-bold"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-bold text-lg text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-purple-100 hover:text-purple-600 transition-colors font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Ara Toplam & Sil */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-slate-600">Ara Toplam</p>
                            <p className="text-xl font-bold text-slate-900">
                              ₺{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                            title="Sil"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alışverişe Devam */}
            <div className="mt-6">
              <Link href="/products">
                <button className="w-full bg-slate-100 text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors">
                  ← Alışverişe Devam Et
                </button>
              </Link>
            </div>
          </div>

          {/* Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Sipariş Özeti
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium">Ara Toplam</span>
                  <span className="font-bold">₺{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium">Kargo</span>
                  <span className="font-bold text-green-600">Ücretsiz</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium">KDV</span>
                  <span className="font-bold">Dahil</span>
                </div>
                <div className="border-t-2 border-purple-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-900">Toplam</span>
                    <span className="text-3xl font-bold text-purple-600">
                      ₺{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 text-right mt-1">KDV Dahil</p>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all mb-4">
                  Siparişi Tamamla →
                </button>
              </Link>

              {/* Güvenlik Bildirimi */}
              <div className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-bold text-slate-900">Güvenli Ödeme</span>
                </div>
                <p className="text-sm text-slate-600">
                  Ödeme bilgileriniz SSL ile şifrelenir
                </p>
              </div>

              {/* İletişim */}
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-600 mb-2">Yardıma mı ihtiyacınız var?</p>
                <a href="tel:05456726317" className="text-lg font-bold text-purple-600 hover:text-purple-700">
                  📞 0545 672 63 17
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}