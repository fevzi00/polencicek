import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK - Kişisel Verilerin Korunması",
  description: "Polen Çiçek KVKK (Kişisel Verilerin Korunması Kanunu) Aydınlatma Metni",
};

export default function KVKKPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">KVKK</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Kişisel Verilerin Korunması ve İşlenmesi Politikası
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Veri Sorumlusu</h2>
            <p className="text-slate-700 mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, 
              kişisel verileriniz; veri sorumlusu olarak Polen Çiçek tarafından 
              aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. İşlenen Kişisel Veriler</h2>
            <p className="text-slate-700 mb-4">
              Sizlerden talep edilen kişisel veriler şunlardır:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Kimlik Bilgileri (Ad, Soyad)</li>
              <li>İletişim Bilgileri (E-posta, Telefon, Adres)</li>
              <li>Müşteri İşlem Bilgileri (Sipariş geçmişi, ödeme bilgileri)</li>
              <li>İşlem Güvenliği Bilgileri (IP adresi, çerez verileri)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p className="text-slate-700 mb-4">
              Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Sipariş ve teslimat süreçlerinin yürütülmesi</li>
              <li>Müşteri hizmetlerinin sunulması</li>
              <li>Fatura ve ödeme işlemlerinin gerçekleştirilmesi</li>
              <li>İletişim faaliyetlerinin yürütülmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Kişisel Verilerin Aktarımı</h2>
            <p className="text-slate-700 mb-4">
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi 
              doğrultusunda kargo firmaları, ödeme kuruluşları ve yasal mercilere 
              aktarılabilecektir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Kişisel Veri Sahibinin Hakları</h2>
            <p className="text-slate-700 mb-4">
              KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 text-slate-700 space-y-2">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Kişisel verilerin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>Kişisel verilerin silinmesini veya yok edilmesini isteme</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. İletişim</h2>
            <p className="text-slate-700 mb-4">
              Kişisel verilerinizle ilgili taleplerinizi bize aşağıdaki iletişim kanallarından iletebilirsiniz:
            </p>
            <div className="bg-purple-50 p-6 rounded-xl">
              <p className="text-slate-700 mb-2">
                <strong>E-posta:</strong> info@polencicek.com
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Telefon:</strong> [+90 545 672 6317]
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