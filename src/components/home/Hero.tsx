import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8 animate-bounce-slow">🌸</div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Sevdiklerinize
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              En Taze Çiçekleri
            </span>
            <br />
            Gönderin
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
            2011'den beri Konya Ereğli'de kalite ve güvenin adresi. Aynı gün teslimat, ücretsiz kargo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="cursor-pointer">
              <button className="btn-primary px-10 py-5 text-lg shadow-xl hover:shadow-2xl">
                Alışverişe Başla
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-secondary px-10 py-5 text-lg">
                İletişime Geç
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">14+</div>
              <div className="text-slate-600">Yıllık Deneyim</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-slate-600">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">%100</div>
              <div className="text-slate-600">Memnuniyet</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
