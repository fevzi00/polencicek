import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı - 404",
  description: "Aradığınız sayfa bulunamadı.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white flex items-center justify-center px-4 pt-24">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Büyük Yazı */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
          <div className="text-6xl mt-4">🌸</div>
        </div>

        {/* Başlık */}
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Sayfa Bulunamadı
        </h2>

        {/* Açıklama */}
        <p className="text-xl text-slate-600 mb-8">
          Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>

        {/* Öneriler */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Ne yapmak istersiniz?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/"
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all text-center group"
            >
              <div className="text-3xl mb-2">🏠</div>
              <div className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                Ana Sayfa
              </div>
            </Link>

            <Link 
              href="/products"
              className="p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition-all text-center group"
            >
              <div className="text-3xl mb-2">🌺</div>
              <div className="font-semibold text-slate-900 group-hover:text-pink-600 transition-colors">
                Ürünler
              </div>
            </Link>

            <Link 
              href="/contact"
              className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all text-center group"
            >
              <div className="text-3xl mb-2">📞</div>
              <div className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                İletişim
              </div>
            </Link>
          </div>
        </div>

        {/* Arama */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-slate-600 mb-4">
            veya aradığınız ürünü bulun:
          </p>
          <Link href="/search">
            <button className="btn-primary px-8 py-3 text-lg">
              🔍 Ürün Ara
            </button>
          </Link>
        </div>

        {/* Yardım */}
        <div className="mt-8 text-slate-600">
          <p>Yardıma mı ihtiyacınız var?</p>
          <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-semibold">
            Bizimle iletişime geçin →
          </Link>
        </div>
      </div>
    </main>
  );
}