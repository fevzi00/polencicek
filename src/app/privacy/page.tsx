export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Gizlilik Politikası
            </h1>
            <p className="text-slate-600 mb-8">
              Son güncellenme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Genel Bilgiler</h2>
                <p className="text-slate-700 leading-relaxed">
                  Polen Çiçek olarak, müşterilerimizin kişisel verilerinin gizliliğine önem veriyoruz. 
                  Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda 
                  toplanan kişisel verilerinizin nasıl işlendiğini açıklamaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Toplanan Bilgiler</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Hizmetlerimizi kullanırken aşağıdaki bilgileri toplayabiliriz:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Ad, soyad ve iletişim bilgileri (telefon, e-posta)</li>
                  <li>Teslimat adresi bilgileri</li>
                  <li>Sipariş geçmişi ve tercihler</li>
                  <li>Ödeme bilgileri (güvenli ödeme sistemleri aracılığıyla)</li>
                  <li>Web sitesi kullanım bilgileri (çerezler aracılığıyla)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Bilgilerin Kullanımı</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Topladığımız kişisel veriler aşağıdaki amaçlarla kullanılır:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Siparişlerinizi işleme almak ve teslimat yapmak</li>
                  <li>Müşteri hizmetleri desteği sağlamak</li>
                  <li>Ürün ve hizmetlerimizi geliştirmek</li>
                  <li>Kampanya ve özel teklifler hakkında bilgilendirme yapmak (onay vermeniz halinde)</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Bilgi Güvenliği</h2>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel verilerinizin güvenliği bizim için önceliklidir. Verilerinizi yetkisiz erişim, 
                  değişiklik, ifşa veya imha edilmeye karşı korumak için uygun teknik ve idari güvenlik 
                  önlemlerini kullanıyoruz. Ödeme bilgileriniz SSL şifreleme teknolojisi ile korunmaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Çerezler</h2>
                <p className="text-slate-700 leading-relaxed">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezler, 
                  tarayıcınız tarafından saklanan küçük metin dosyalarıdır. Tarayıcı ayarlarınızdan 
                  çerezleri yönetebilir veya engelleyebilirsiniz.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Üçüncü Taraflarla Paylaşım</h2>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel verilerinizi, yasal zorunluluklar dışında üçüncü taraflarla paylaşmıyoruz. 
                  Sipariş teslimatı için kargo şirketleri ve ödeme işlemleri için ödeme hizmet sağlayıcıları 
                  ile gerekli minimum bilgiler paylaşılabilir.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Haklarınız</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>Kişisel verilerinizin işlenme amacını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                  <li>Kişisel verilerinizin düzeltilmesini isteme</li>
                  <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. İletişim</h2>
                <p className="text-slate-700 leading-relaxed">
                  Gizlilik politikamız hakkında sorularınız varsa veya haklarınızı kullanmak isterseniz, 
                  bizimle iletişime geçebilirsiniz:
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <p className="text-slate-900 font-semibold">Polen Çiçek</p>
                  <p className="text-slate-700">Hacı Mütahir mah, Dr. Rauf Denktaş Cd. No:5, 42320 Ereğli/Konya</p>
                  <p className="text-slate-700">Telefon: 0545 672 63 17</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Politika Güncellemeleri</h2>
                <p className="text-slate-700 leading-relaxed">
                  Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, 
                  web sitemiz üzerinden veya e-posta yoluyla sizi bilgilendireceğiz. Güncel politikayı 
                  düzenli olarak kontrol etmenizi öneririz.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 text-center">
              <a href="/contact" className="btn-primary px-8 py-4">
                Bizimle İletişime Geçin
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}