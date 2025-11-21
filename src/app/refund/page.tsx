import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İptal ve İade Koşulları",
  description: "Polen Çiçek ürün iptali ve iade koşulları",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">İptal ve İade</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          İptal ve İade Koşulları
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-300 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">⚠️ Önemli Bilgilendirme</h2>
            <p className="text-slate-700 mb-4">
              <strong>Taze çiçek ürünleri</strong>, Mesafeli Sözleşmeler Yönetmeliği'nin 
              15. maddesi (g) bendi uyarınca <strong>"çabuk bozulabilen veya son 
              kullanma tarihi geçebilecek mallar"</strong> kategorisinde yer aldığından, 
              <strong className="text-red-600">cayma hakkı kapsamı dışındadır</strong>.
            </p>
            <p className="text-slate-700">
              Bu nedenle, teslim edilen taze çiçek ürünlerinde yasal cayma hakkı 
              kullanılamaz.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Sipariş İptali</h2>
            <p className="text-slate-700 mb-4">
              <strong>Teslimat Öncesi İptal:</strong>
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Ürün teslimat için hazırlanmadan önce sipariş iptal edilebilir</li>
              <li>İptal talebi için <strong>info@polencicek.com</strong> adresine 
                  veya telefon ile <strong>derhal</strong> bildirim yapılmalıdır</li>
              <li>Sipariş numaranızı ve iptal gerekçenizi belirtmelisiniz</li>
              <li>Ödeme yapıldıysa, iptal onayından sonra 14 iş günü içinde iade edilir</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-slate-700">
                <strong>💡 Not:</strong> Sipariş hazırlanmaya başladıktan sonra 
                iptal kabul edilmeyebilir. Bu nedenle iptal talebinizi mümkün 
                olan en kısa sürede iletiniz.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Ürün Değişimi ve İade Durumları</h2>
            <p className="text-slate-700 mb-4">
              Aşağıdaki durumlarda ürün değişimi veya iadesi yapılabilir:
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-slate-900 mb-2">✅ Kabul Edilen Durumlar:</h3>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li><strong>Hasarlı Teslimat:</strong> Ürün ezilmiş, kırılmış veya hasar görmüş halde teslim edilmişse</li>
                  <li><strong>Yanlış Ürün:</strong> Sipariş edilen ürün yerine farklı bir ürün gönderilmişse</li>
                  <li><strong>Eksik Teslimat:</strong> Siparişteki bazı ürünler eksik gönderilmişse</li>
                  <li><strong>Kalite Sorunu:</strong> Ürün bayat, solmuş veya düşük kalitede ise</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-slate-900 mb-2">❌ Kabul Edilmeyen Durumlar:</h3>
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>Ürünün renk tonu beklentiyle tam olarak eşleşmemesi (doğal farklılıklar)</li>
                  <li>Çiçeklerin doğal yapısından kaynaklanan küçük farklılıklar</li>
                  <li>Alıcının beğenmemesi veya fikir değiştirmesi</li>
                  <li>Ürün teslim alındıktan sonra zarar görmesi</li>
                  <li>Yanlış adres bilgisi nedeniyle teslimat yapılamaması</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Şikayet ve İade Süreci</h2>
            <p className="text-slate-700 mb-4">
              Ürününüzle ilgili bir sorun varsa şu adımları izleyin:
            </p>

            <div className="bg-slate-50 p-6 rounded-xl space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Bildirim</h3>
                  <p className="text-slate-700">
                    Ürün teslim alındıktan sonra <strong>24 saat içinde</strong> 
                    bizimle iletişime geçin. Fotoğraf çekerek sorunu belgelemeniz önerilir.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Değerlendirme</h3>
                  <p className="text-slate-700">
                    Müşteri hizmetlerimiz talebinizi inceler ve en kısa sürede 
                    (genellikle 24 saat içinde) size geri dönüş yapar.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Çözüm</h3>
                  <p className="text-slate-700">
                    Haklı bulunması durumunda:
                  </p>
                  <ul className="list-disc pl-6 text-slate-700 mt-2 space-y-1">
                    <li>Yeni ürün gönderimi</li>
                    <li>Kısmi iade</li>
                    <li>Tam iade (ödeme iadesi)</li>
                    <li>Veya alternatif çözüm önerileri sunulur</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. İade ve Ödeme İadesi</h2>
            <p className="text-slate-700 mb-4">
              İade onayı verildiğinde:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>İade tutarı <strong>14 iş günü içinde</strong> ödeme yönteminize geri yansıtılır</li>
              <li>Kredi kartı ödemelerinde banka tarafından 2-3 hafta sürebilir</li>
              <li>Kısmi iade durumunda sadece sorunlu kısım iade edilir</li>
              <li>Teslimat ücreti iade kapsamında değerlendirilir</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Özel Durumlar</h2>
            
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">🎁 Hediye Siparişleri</h3>
                <p className="text-slate-700">
                  Hediye olarak gönderilen siparişlerde, alıcı tarafından yapılan 
                  şikayetler değerlendirilir. Sipariş veren kişi ile iletişime geçilir.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">⚡ Acil Siparişler</h3>
                <p className="text-slate-700">
                  Acil sipariş statüsündeki ürünlerde iptal süresi daha kısadır. 
                  Hazırlık başlamışsa iptal mümkün olmayabilir.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">🌧️ Hava Koşulları</h3>
                <p className="text-slate-700">
                  Olumsuz hava koşulları nedeniyle teslimat gecikebilir veya 
                  iptal edilebilir. Bu durumda tam iade yapılır.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. İletişim Kanalları</h2>
            <p className="text-slate-700 mb-4">
              İptal, iade veya şikayet için bize ulaşın:
            </p>
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="text-slate-700 mb-2">
                <strong>📧 E-posta:</strong> info@polencicek.com
              </p>
              <p className="text-slate-700 mb-2">
                <strong>📞 Telefon:</strong> +905456726317
              </p>
              <p className="text-slate-700 mb-2">
                <strong>⏰ Çalışma Saatleri:</strong> 09:00 - 20:00
              </p>
              <p className="text-slate-700">
                <strong>📍 Adres:</strong> Konya Ereğli, Türkiye
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Müşteri Memnuniyeti</h2>
            <p className="text-slate-700 mb-4">
              Polen Çiçek olarak müşteri memnuniyeti önceliğimizdir. Her türlü 
              sorun ve şikayetinizde çözüm odaklı yaklaşarak size en iyi 
              hizmeti sunmaya çalışırız.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-slate-700">
                <strong>💚 Taahhüdümüz:</strong> Haklı şikayetlerde 24 saat 
                içinde çözüm üretiriz ve müşteri memnuniyetini sağlarız.
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