import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Polen Çiçek çerez (cookie) kullanım politikası",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Çerez Politikası</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Çerez Politikası
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Çerez Nedir?</h2>
            <p className="text-slate-700 mb-4">
              Çerezler (cookies), web sitelerini ziyaret ettiğinizde cihazınıza 
              (bilgisayar, tablet, akıllı telefon) kaydedilen küçük metin dosyalarıdır. 
              Çerezler, web sitesinin daha verimli çalışmasını sağlar ve site 
              sahiplerine bilgi sağlar.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-slate-700">
                <strong>🍪 Basit Anlatım:</strong> Çerezler, web sitesinin sizi 
                "hatırlamasını" sağlayan küçük bilgi parçalarıdır. Örneğin, 
                sepetinizdeki ürünleri veya dil tercihlerinizi hatırlar.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Çerezleri Neden Kullanıyoruz?</h2>
            <p className="text-slate-700 mb-4">
              Polen Çiçek olarak çerezleri aşağıdaki amaçlarla kullanıyoruz:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Web sitesinin düzgün çalışmasını sağlamak</li>
              <li>Alışveriş sepetinizi hatırlamak</li>
              <li>Giriş bilgilerinizi kaydetmek (izninizle)</li>
              <li>Site kullanımını analiz etmek ve iyileştirmek</li>
              <li>Size daha iyi kullanıcı deneyimi sunmak</li>
              <li>Tercihlerinizi kaydetmek</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Kullandığımız Çerez Türleri</h2>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  🔒 Zorunlu Çerezler (Teknik Çerezler)
                </h3>
                <p className="text-slate-700 mb-2">
                  <strong>Amaç:</strong> Web sitesinin temel işlevlerinin çalışması için gereklidir.
                </p>
                <p className="text-slate-700 mb-2">
                  <strong>Örnekler:</strong>
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-1">
                  <li>Oturum yönetimi</li>
                  <li>Güvenlik çerezleri</li>
                  <li>Sepet bilgilerini saklama</li>
                  <li>Dil tercihi</li>
                </ul>
                <p className="text-slate-700 mt-2">
                  <strong>Reddedilebilir mi?</strong> Hayır - Bu çerezler olmadan site çalışmaz.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  📊 Analitik Çerezler
                </h3>
                <p className="text-slate-700 mb-2">
                  <strong>Amaç:</strong> Site kullanımını analiz etmek ve iyileştirmek için kullanılır.
                </p>
                <p className="text-slate-700 mb-2">
                  <strong>Örnekler:</strong>
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-1">
                  <li>Google Analytics (anonim istatistikler)</li>
                  <li>Sayfa görüntüleme sayısı</li>
                  <li>Kullanıcı davranışı analizi</li>
                  <li>Trafik kaynakları</li>
                </ul>
                <p className="text-slate-700 mt-2">
                  <strong>Reddedilebilir mi?</strong> Evet - Tarayıcı ayarlarından kapatabilirsiniz.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  🎯 İşlevsellik Çerezleri
                </h3>
                <p className="text-slate-700 mb-2">
                  <strong>Amaç:</strong> Tercihlerinizi hatırlamak ve size özel deneyim sunmak.
                </p>
                <p className="text-slate-700 mb-2">
                  <strong>Örnekler:</strong>
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-1">
                  <li>Dil seçiminizi hatırlama</li>
                  <li>Bölge/şehir tercihi</li>
                  <li>Görüntüleme modu tercihleri</li>
                  <li>Son görüntülenen ürünler</li>
                </ul>
                <p className="text-slate-700 mt-2">
                  <strong>Reddedilebilir mi?</strong> Evet - Ancak bazı özellikler çalışmayabilir.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  📱 Performans Çerezleri
                </h3>
                <p className="text-slate-700 mb-2">
                  <strong>Amaç:</strong> Site performansını ölçmek ve optimize etmek.
                </p>
                <p className="text-slate-700 mb-2">
                  <strong>Örnekler:</strong>
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-1">
                  <li>Sayfa yükleme süreleri</li>
                  <li>Hata raporlama</li>
                  <li>Site hızı analizi</li>
                </ul>
                <p className="text-slate-700 mt-2">
                  <strong>Reddedilebilir mi?</strong> Evet
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Üçüncü Taraf Çerezleri</h2>
            <p className="text-slate-700 mb-4">
              Web sitemizde aşağıdaki üçüncü taraf hizmetler çerez kullanabilir:
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">📈 Google Analytics</h3>
                <p className="text-slate-700 mb-2">
                  <strong>Amaç:</strong> Site trafiği ve kullanıcı davranışı analizi
                </p>
                <p className="text-slate-700 text-sm">
                  Daha fazla bilgi: <a href="https://policies.google.com/privacy" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Gizlilik Politikası</a>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">💳 Ödeme Sağlayıcıları (İyzico)</h3>
                <p className="text-slate-700 mb-2">
                  <strong>Amaç:</strong> Güvenli ödeme işlemleri
                </p>
                <p className="text-slate-700 text-sm">
                  Güvenli ödeme altyapısı için gerekli çerezler
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p className="text-slate-700 mb-4">
              Çerezleri kontrol etmek ve yönetmek için birkaç seçeneğiniz var:
            </p>

            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">1️⃣ Tarayıcı Ayarları</h3>
                <p className="text-slate-700 mb-2">
                  Tüm modern tarayıcılar çerez kontrolü sunar:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-1 text-sm">
                  <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                  <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler ve site verileri</li>
                  <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezleri yönet</li>
                  <li><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">2️⃣ Gizli Mod Kullanımı</h3>
                <p className="text-slate-700">
                  Tarayıcınızın "gizli" veya "özel" modunu kullanarak çerezlerin 
                  kalıcı olarak kaydedilmesini engelleyebilirsiniz.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">3️⃣ Analitik Çerezleri Reddetme</h3>
                <p className="text-slate-700">
                  Google Analytics çerezlerini reddetmek için:
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-purple-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    Google Analytics Opt-out
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mt-4">
              <p className="text-slate-700">
                <strong>⚠️ Dikkat:</strong> Çerezleri tamamen engellerseniz, 
                web sitesinin bazı özellikleri düzgün çalışmayabilir (örneğin 
                alışveriş sepeti, oturum yönetimi).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Çerezlerin Saklama Süresi</h2>
            <p className="text-slate-700 mb-4">
              Çerezler türlerine göre farklı sürelerde saklanır:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><strong>Oturum Çerezleri:</strong> Tarayıcıyı kapatana kadar</li>
              <li><strong>Kalıcı Çerezler:</strong> 30 gün ile 2 yıl arası (türüne göre)</li>
              <li><strong>Analitik Çerezler:</strong> Genellikle 2 yıl</li>
              <li><strong>Tercih Çerezleri:</strong> 1 yıl</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Çocukların Gizliliği</h2>
            <p className="text-slate-700 mb-4">
              Web sitemiz 18 yaş altı kullanıcılara yönelik değildir. 
              18 yaşından küçük kişilerin verilerini bilerek toplamıyoruz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Politika Güncellemeleri</h2>
            <p className="text-slate-700 mb-4">
              Bu çerez politikasını zaman zaman güncelleyebiliriz. Önemli 
              değişiklikler olduğunda sizi bilgilendireceğiz. En son güncelleme 
              tarihini sayfanın altında görebilirsiniz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Daha Fazla Bilgi</h2>
            <p className="text-slate-700 mb-4">
              Çerezler hakkında daha fazla bilgi edinmek için:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li><a href="https://www.aboutcookies.org" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">AboutCookies.org</a></li>
              <li><a href="https://www.allaboutcookies.org" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">AllAboutCookies.org</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. İletişim</h2>
            <p className="text-slate-700 mb-4">
              Çerez politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="text-slate-700 mb-2">
                <strong>📧 E-posta:</strong> info@polencicek.com
              </p>
              <p className="text-slate-700 mb-2">
                <strong>📞 Telefon:</strong> [Telefon numaranız]
              </p>
              <p className="text-slate-700">
                <strong>📍 Adres:</strong> Konya Ereğli, Türkiye
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
              <p className="text-slate-700 mb-2">
                <strong>✅ Onayınız:</strong>
              </p>
              <p className="text-slate-700">
                Web sitemizi kullanmaya devam ederek, bu Çerez Politikası'nda 
                açıklanan şekilde çerez kullanımını kabul etmiş sayılırsınız.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <p className="text-sm text-slate-600 italic">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}