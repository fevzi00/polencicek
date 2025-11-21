import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "Polen Çiçek web sitesi kullanım şartları ve koşulları",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Kullanım Şartları</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Kullanım Şartları
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Genel Hükümler</h2>
            <p className="text-slate-700 mb-4">
              Bu web sitesini (polencicek.com) kullanarak, aşağıda belirtilen 
              kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul 
              etmiyorsanız, lütfen sitemizi kullanmayınız.
            </p>
            <p className="text-slate-700 mb-4">
              Polen Çiçek, bu kullanım şartlarını önceden haber vermeksizin 
              değiştirme hakkını saklı tutar. Güncel şartları düzenli olarak 
              kontrol etmeniz önerilir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hizmet Kapsamı</h2>
            <p className="text-slate-700 mb-4">
              Polen Çiçek, Konya Ereğli bölgesinde çiçek ve hediye ürünlerinin 
              online satışı ve teslimatını gerçekleştirmektedir. Hizmetlerimiz:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Taze çiçek satışı ve teslimatı</li>
              <li>Özel günler için çiçek düzenlemeleri</li>
              <li>Kurumsal çiçek hizmetleri</li>
              <li>Hediye ürünleri</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Üyelik ve Hesap</h2>
            <p className="text-slate-700 mb-4">
              Web sitemizden alışveriş yapmak için üye olmanız gerekmektedir. 
              Üyelik sırasında:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Doğru ve güncel bilgiler vermelisiniz</li>
              <li>Hesap güvenliğinizden siz sorumlusunuz</li>
              <li>Şifrenizi kimseyle paylaşmamalısınız</li>
              <li>Hesabınızda yapılan tüm işlemlerden sorumlusunuz</li>
              <li>18 yaşından büyük olmalısınız</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Sipariş ve Ödeme</h2>
            <p className="text-slate-700 mb-4">
              Sipariş verirken aşağıdaki kurallara uymanız gerekmektedir:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Ürün fiyatları KDV dahildir</li>
              <li>Teslimat ücretleri ödeme sayfasında gösterilir</li>
              <li>Ödeme onaylandıktan sonra sipariş işleme alınır</li>
              <li>Stok durumuna göre bazı ürünler temin edilemeyebilir</li>
              <li>Fiyatlar önceden haber verilmeksizin değiştirilebilir</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Teslimat</h2>
            <p className="text-slate-700 mb-4">
              Teslimat koşulları:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Teslimat alanımız Konya Ereğli ve çevresidir</li>
              <li>Teslimat süreleri sipariş saatine göre değişebilir</li>
              <li>Acil siparişler için ek ücret alınabilir</li>
              <li>Hava koşulları teslimat süresini etkileyebilir</li>
              <li>Alıcı adreste bulunmazsa, ürün komşu veya kapıcıya teslim edilebilir</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. İptal ve İade</h2>
            <p className="text-slate-700 mb-4">
              Taze çiçek ürünleri özel nitelikli ürün olduğundan:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Teslimat yapılmadan önce sipariş iptal edilebilir</li>
              <li>Teslim edilen ürünlerde cayma hakkı bulunmamaktadır</li>
              <li>Ürün hasarlı veya eksik gelirse 24 saat içinde bildirim yapılmalıdır</li>
              <li>Haklı sebeplerle iade durumlarında değerlendirme yapılır</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Fikri Mülkiyet Hakları</h2>
            <p className="text-slate-700 mb-4">
              Web sitemizdeki tüm içerik (metin, görsel, logo, tasarım vb.) 
              Polen Çiçek'e aittir ve fikri mülkiyet hakları ile korunmaktadır.
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>İçerikler izinsiz kopyalanamaz</li>
              <li>Görseller izinsiz kullanılamaz</li>
              <li>Site tasarımı taklit edilemez</li>
              <li>Ticari amaçla kullanılamaz</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Yasaklı Kullanımlar</h2>
            <p className="text-slate-700 mb-4">
              Web sitemizi kullanırken aşağıdaki eylemler yasaktır:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Sahte bilgi vermek</li>
              <li>Başkalarının hesaplarını kullanmak</li>
              <li>Sisteme zarar verici faaliyetlerde bulunmak</li>
              <li>Spam veya zararlı içerik göndermek</li>
              <li>Otomatik sistemlerle veri toplamak</li>
              <li>Site güvenliğini tehdit etmek</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Sorumluluk Sınırlaması</h2>
            <p className="text-slate-700 mb-4">
              Polen Çiçek, aşağıdaki durumlardan sorumlu tutulamaz:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Mücbir sebeplerden kaynaklanan gecikmeler</li>
              <li>Üçüncü taraf hizmet sağlayıcılardan kaynaklanan sorunlar</li>
              <li>Kullanıcı hatasından kaynaklanan problemler</li>
              <li>İnternet bağlantısından kaynaklanan kesintiler</li>
              <li>Yanlış adres bilgisinden kaynaklanan teslimat sorunları</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Uyuşmazlık Çözümü</h2>
            <p className="text-slate-700 mb-4">
              Bu kullanım şartlarından doğabilecek uyuşmazlıklarda:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Öncelikle dostane çözüm aranır</li>
              <li>Tüketici hakem heyetlerine başvurulabilir</li>
              <li>Konya Ereğli Mahkemeleri ve İcra Daireleri yetkilidir</li>
              <li>Türkiye Cumhuriyeti yasaları uygulanır</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. İletişim</h2>
            <p className="text-slate-700 mb-4">
              Kullanım şartlarıyla ilgili sorularınız için:
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