import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Polen Çiçek Gizlilik Politikası ve Kişisel Verilerin Korunması",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Gizlilik Politikası</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Gizlilik Politikası
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Genel Bilgiler</h2>
            <p className="text-slate-700 mb-4">
              Polen Çiçek olarak, müşterilerimizin gizliliğine saygı duyuyor ve 
              kişisel verilerini korumak için gerekli tüm önlemleri alıyoruz. 
              Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya 
              hizmetlerimizi kullandığınızda kişisel verilerinizin nasıl toplandığını, 
              kullanıldığını ve korunduğunu açıklamaktadır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Toplanan Bilgiler</h2>
            <p className="text-slate-700 mb-4">
              Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
              <li>Teslimat adresi bilgileri</li>
              <li>Sipariş geçmişi ve tercihleriniz</li>
              <li>Ödeme bilgileri (güvenli ödeme sistemleri üzerinden)</li>
              <li>Web sitesi kullanım bilgileri (çerezler aracılığıyla)</li>
              <li>IP adresi ve tarayıcı bilgileri</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Bilgilerin Kullanımı</h2>
            <p className="text-slate-700 mb-4">
              Topladığımız bilgileri şu amaçlarla kullanırız:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Siparişlerinizi işlemek ve teslimatınızı gerçekleştirmek</li>
              <li>Müşteri hizmetleri desteği sağlamak</li>
              <li>Size özel kampanya ve teklifler sunmak (onay vermeniz durumunda)</li>
              <li>Web sitemizi geliştirmek ve kullanıcı deneyimini iyileştirmek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              <li>Dolandırıcılığı önlemek ve güvenliği sağlamak</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Çerezler (Cookies)</h2>
            <p className="text-slate-700 mb-4">
              Web sitemiz, kullanıcı deneyimini geliştirmek amacıyla çerezler kullanmaktadır. 
              Çerezler, cihazınıza kaydedilen küçük metin dosyalarıdır ve size daha iyi 
              bir hizmet sunmamıza yardımcı olur.
            </p>
            <p className="text-slate-700 mb-4">
              Tarayıcı ayarlarınızdan çerezleri reddedebilir veya silebilirsiniz. 
              Ancak bu durumda web sitesinin bazı özelliklerini kullanamazsınız.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Bilgi Güvenliği</h2>
            <p className="text-slate-700 mb-4">
              Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı 
              güvenlik önlemleri kullanıyoruz:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>SSL şifreleme ile güvenli veri iletimi</li>
              <li>Güvenli sunucularda veri saklama</li>
              <li>Sınırlı erişim kontrolleri</li>
              <li>Düzenli güvenlik güncellemeleri</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Üçüncü Taraf Paylaşımı</h2>
            <p className="text-slate-700 mb-4">
              Kişisel bilgilerinizi, hizmet sağlayıcılarımız dışında üçüncü taraflarla 
              paylaşmıyoruz. Bilgileriniz yalnızca şu durumlarda paylaşılabilir:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Kargo firmaları (teslimat için)</li>
              <li>Ödeme işlem sağlayıcıları (güvenli ödeme için)</li>
              <li>Yasal merciler (yasal zorunluluk durumunda)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Pazarlama İletişimi</h2>
            <p className="text-slate-700 mb-4">
              Size kampanya, yeni ürünler ve özel teklifler hakkında bilgilendirme 
              e-postaları gönderebiliriz. Bu iletişimi almak istemiyorsanız, 
              e-posta içindeki "abonelikten çık" linkini kullanabilir veya 
              bizimle iletişime geçebilirsiniz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Haklarınız</h2>
            <p className="text-slate-700 mb-4">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Kişisel verilerinize erişim talep etme</li>
              <li>Kişisel verilerinizin düzeltilmesini isteme</li>
              <li>Kişisel verilerinizin silinmesini isteme</li>
              <li>Veri işlemeye itiraz etme</li>
              <li>Verilerinizin taşınabilirliğini talep etme</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Çocukların Gizliliği</h2>
            <p className="text-slate-700 mb-4">
              Web sitemiz 18 yaş altı kullanıcılara yönelik değildir. 
              18 yaşından küçük kişilerin kişisel bilgilerini bilerek toplamıyoruz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Politika Değişiklikleri</h2>
            <p className="text-slate-700 mb-4">
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz. 
              Önemli değişiklikler olduğunda sizi bilgilendireceğiz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. İletişim</h2>
            <p className="text-slate-700 mb-4">
              Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="text-slate-700 mb-2">
                <strong>E-posta:</strong> info@polencicek.com
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Telefon:</strong> +90 545 672 6317
              </p>
              <p className="text-slate-700">
                <strong>Adres:</strong> Konya Ereğli, Türkiye
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