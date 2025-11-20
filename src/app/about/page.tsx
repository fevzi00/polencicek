import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-slate-600">
              2011'den beri Ereğli'nin en taze çiçeklerini kapınıza getiriyoruz
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Hikayemiz
              </h2>
              <div className="prose prose-lg text-slate-700 space-y-4">
                <p>
                  Polen Çiçek, çiçeklere olan tutkumuzdan ve sevdiklerinize özel anlar 
                  yaşatma arzumuzdan doğdu. 2011 yılında Konya Ereğli'de başlayan 
                  yolculuğumuz, yıllardır binlerce mutlu müşteriyle devam ediyor.
                </p>
                <p>
                  Her sabah özenle seçilen en taze çiçekleri, her bir buketi sevgiyle 
                  hazırlıyoruz. Amacımız, özel anlarınızı daha da özel kılmak ve 
                  sevdiklerinize en güzel hisleri ulaştırmak. Çiçeklerin evrensel dilini 
                  konuşarak, duygularınızı en güzel şekilde ifade etmenize yardımcı oluyoruz.
                </p>
                <p>
                  Yılların deneyimiyle kazandığımız uzmanlık ve çiçeklere olan tutkumuz, 
                  her ürünümüze yansıyor. Kalite, tazelik ve müşteri memnuniyeti bizim 
                  için her zaman öncelikli oldu ve olmaya devam edecek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Değerlerimiz
            </h2>
            <p className="text-slate-600 text-lg">
              Bizi biz yapan prensipler
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Kalite
              </h3>
              <p className="text-slate-600">
                Sadece en taze ve en kaliteli çiçeklerle çalışıyoruz. Her ürünümüz özenle seçiliyor.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Hız
              </h3>
              <p className="text-slate-600">
                Aynı gün teslimat ile sevdiklerinize hızlı bir şekilde ulaşıyoruz.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Sevgi
              </h3>
              <p className="text-slate-600">
                Her buket sevgiyle hazırlanıyor. Müşteri memnuniyeti bizim için her şeyden önemli.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Konya Ereğli'de Hizmetinizdeyiz
            </h2>
            <p className="text-purple-100 text-lg mb-6">
              Yıllardır bölgenin güvenilir çiçekçisi olarak, 
              taze ve kaliteli çiçeklerimizle yanınızdayız.
            </p>
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
              <p className="text-white font-medium">
                📍 Hacı Mütahir mah, Dr. Rauf Denktaş Cd. No:5
              </p>
              <p className="text-purple-100 text-sm mt-1">
                42320 Ereğli/Konya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 border-2 border-purple-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-slate-600 mb-8">
              Sorularınız mı var? Size yardımcı olmak için buradayız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-primary px-8 py-8">
                  İletişim
                </button>
              </Link>
              <Link href="/products">
                <button className="btn-secondary px-8 py-4">
                  Ürünleri Gör
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}