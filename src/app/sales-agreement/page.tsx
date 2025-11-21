import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  description: "Polen Çiçek mesafeli satış sözleşmesi ve koşulları",
};

export default function SalesAgreementPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Mesafeli Satış Sözleşmesi</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Mesafeli Satış Sözleşmesi
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 1 - TARAFLAR</h2>
            
            <div className="bg-purple-50 p-6 rounded-xl mb-4">
              <h3 className="text-lg font-bold text-slate-900 mb-3">SATICI BİLGİLERİ:</h3>
              <p className="text-slate-700 mb-2">
                <strong>Ünvan:</strong> Polen Çiçek
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Adres:</strong> Konya Ereğli, Türkiye
              </p>
              <p className="text-slate-700 mb-2">
                <strong>E-posta:</strong> info@polencicek.com
              </p>
              <p className="text-slate-700">
                <strong>Telefon:</strong> +905456726317
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-3">ALICI BİLGİLERİ:</h3>
              <p className="text-slate-700">
                Sipariş esnasında sisteme kaydedilen bilgiler geçerlidir.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 2 - KONU</h2>
            <p className="text-slate-700 mb-4">
              İşbu Sözleşme'nin konusu, ALICI'nın SATICI'ya ait polencicek.com 
              internet sitesinden elektronik ortamda siparişini verdiği aşağıda 
              nitelikleri ve satış fiyatı belirtilen ürün/ürünlerin satışı ve 
              teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması 
              Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri 
              gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 3 - SÖZLEŞME KONUSU ÜRÜN/ÜRÜNLER BİLGİLERİ</h2>
            <p className="text-slate-700 mb-4">
              Ürün/ürünlerin temel özelliklerine (türü, miktarı, rengi, adedi, 
              markası, modeli, boyutu) ait bilgiler ve satış fiyatı, sipariş 
              özet sayfasında gösterilmekte olup, alıcı tarafından onaylanmıştır.
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır</li>
              <li>İlan edilen fiyatlar ve vaatler güncelleme yapılana kadar geçerlidir</li>
              <li>Kampanyalı ürünlerin geçerlilik süresi kampanya süresince devam eder</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 4 - GENEL HÜKÜMLER</h2>
            <p className="text-slate-700 mb-4">
              ALICI, sözleşme konusu ürünün temel nitelikleri, satış fiyatı, 
              ödeme şekli ve teslimat koşulları ile ilgili ön bilgileri okuyup 
              bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini 
              beyan eder.
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>ALICI, sipariş vermekle işbu sözleşmenin tüm koşullarını kabul etmiş sayılır</li>
              <li>Sözleşme konusu mal fiyatına KDV dahildir</li>
              <li>Ödeme şekli sipariş formunda belirtilmiştir</li>
              <li>SATICI, ürünlerin sağlıklı bir şekilde teslim edilmesi için gerekli özeni gösterir</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 5 - TESLİMAT KOŞULLARI</h2>
            <p className="text-slate-700 mb-4">
              Ürün, ALICI'nın sipariş formunda belirttiği adrese teslim edilir:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Teslimat süresi sipariş onayından sonra başlar</li>
              <li>Konya Ereğli içi teslimat yapılmaktadır</li>
              <li>Teslimat ücreti sipariş özetinde gösterilir</li>
              <li>Teslimat süresi sipariş yoğunluğuna göre değişebilir</li>
              <li>Acil teslimat talepleri için iletişime geçilmelidir</li>
              <li>Mücbir sebeplerden kaynaklanan gecikmelerden SATICI sorumlu değildir</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 6 - ÖDEME ŞEKLİ</h2>
            <p className="text-slate-700 mb-4">
              Ödeme yöntemleri:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Kredi kartı ile online ödeme</li>
              <li>Banka kartı ile online ödeme</li>
              <li>Kapıda ödeme (nakit veya kredi kartı)</li>
            </ul>
            <p className="text-slate-700 mb-4">
              Kredi kartı bilgileri güvenli ödeme altyapısı üzerinden işlenir 
              ve SATICI tarafından saklanmaz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 7 - CAYMA HAKKI</h2>
            <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 mb-4">
              <p className="text-slate-900 font-bold mb-2">⚠️ ÖNEMLİ UYARI:</p>
              <p className="text-slate-700">
                Taze çiçek ürünleri, Mesafeli Sözleşmeler Yönetmeliği'nin 
                15. maddesi (g) bendi uyarınca <strong>"çabuk bozulabilen 
                veya son kullanma tarihi geçebilecek mallar"</strong> kapsamında 
                olduğundan <strong>cayma hakkı kapsamı dışındadır</strong>.
              </p>
            </div>
            <p className="text-slate-700 mb-4">
              Ancak:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Ürün hasarlı veya hatalı teslim edilirse 24 saat içinde bildirim yapılmalıdır</li>
              <li>Eksik teslimat durumunda SATICI ile iletişime geçilmelidir</li>
              <li>Ürün teslimat yapılmadan önce sipariş iptal edilebilir</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 8 - SATICI'NIN YÜKÜMLÜLÜKLERİ</h2>
            <p className="text-slate-700 mb-4">
              SATICI, aşağıdaki yükümlülükleri yerine getirmeyi kabul eder:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Sözleşme konusu ürünleri eksiksiz ve belirtilen niteliklerde teslim etmek</li>
              <li>Ürünün ambalajını sağlam ve ürün özelliklerine uygun yapmak</li>
              <li>Teslimat sürelerine uymak</li>
              <li>Müşteri hizmetleri desteği sağlamak</li>
              <li>Yasal düzenlemelere uymak</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 9 - ALICI'NIN YÜKÜMLÜLÜKLERİ</h2>
            <p className="text-slate-700 mb-4">
              ALICI, aşağıdaki yükümlülükleri yerine getirmeyi kabul eder:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Doğru ve güncel bilgi vermek</li>
              <li>Ödeme yükümlülüğünü yerine getirmek</li>
              <li>Teslimat adresinde hazır bulunmak veya yetkili kişi görevlendirmek</li>
              <li>Ürünü teslim almak</li>
              <li>Ürün hakkındaki şikayetleri zamanında bildirmek</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 10 - TEMERRÜT HALİ VE HUKUKİ SONUÇLARI</h2>
            <p className="text-slate-700 mb-4">
              ALICI, kredi kartı ile yaptığı işlemlerde temerrüde düştüğü 
              takdirde, kart sahibi banka ile arasındaki kredi kartı 
              sözleşmesi çerçevesinde faiz ödeyecek ve bankaya karşı 
              sorumlu olacaktır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 11 - YETKİLİ MAHKEME</h2>
            <p className="text-slate-700 mb-4">
              İşbu sözleşmenin uygulanmasından doğabilecek ihtilaflarda:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Tüketici Hakem Heyetleri</li>
              <li>Tüketici Mahkemeleri</li>
              <li>ALICI'nın veya SATICI'nın yerleşim yerindeki mahkemeler yetkilidir</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">MADDE 12 - YÜRÜRLÜK</h2>
            <p className="text-slate-700 mb-4">
              ALICI, siparişi onayladığı takdirde bu sözleşmenin tüm 
              koşullarını kabul etmiş sayılır. İşbu sözleşme, ALICI 
              tarafından elektronik ortamda onaylandığı tarihte yürürlüğe girer.
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm text-slate-600 italic">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>

          <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
            <p className="text-slate-700 mb-2">
              <strong>Sipariş vermekle bu sözleşmeyi okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.</strong>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}