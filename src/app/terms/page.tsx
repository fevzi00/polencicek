export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Kullanım Koşulları
            </h1>
            <p className="text-slate-600 mb-8">
              Son güncellenme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Genel Hükümler</h2>
                <p className="text-slate-700 leading-relaxed">
                  Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. 
                  Bu koşulları kabul etmiyorsanız, lütfen sitemizi kullanmayın. Polen Çiçek, bu koşulları 
                  önceden haber vermeksizin değiştirme hakkını saklı tutar.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hizmet Kapsamı</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Polen Çiçek, taze çiçek satışı ve teslimat hizmeti sunmaktadır. Hizmetlerimiz:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Online sipariş ve ödeme imkanı</li>
                  <li>Konya Ereğli içi teslimat</li>
                  <li>Aynı gün veya ileri tarihli teslimat seçenekleri</li>
                  <li>Özel tasarım buket hizmetleri</li>
                  <li>Hediye mesajı ekleme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Sipariş ve Ödeme</h2>
                <p className="text-slate-700 leading-relaxed">
                  Sipariş verdiğinizde, ürün fiyatı, teslimat ücreti (varsa) ve toplam tutarı onaylamış 
                  olursunuz. Tüm ödemeler güvenli SSL sertifikalı sistemler üzerinden yapılır. Sipariş 
                  sonrası onay e-postası veya SMS gönderilir. Stok durumuna göre siparişinizin kabulü 
                  veya reddi hakkımız saklıdır.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Teslimat</h2>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Teslimat koşullarımız:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                  <li>Saat 14:00'e kadar verilen siparişler aynı gün teslim edilir</li>
                  <li>14:00'dan sonraki siparişler ertesi gün teslim edilir</li>
                  <li>Teslimat adresi Konya Ereğli sınırları içinde olmalıdır</li>
                  <li>Teslimat saatini belirtebilirsiniz (garanti verilmez, en yakın zaman dilimi hedeflenir)</li>
                  <li>Alıcıya ulaşılamazsa, sipariş veren ile iletişime geçilir</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. İptal ve İade</h2>
                <p className="text-slate-700 leading-relaxed">
                  Taze ürün olması nedeniyle, hazırlanmış siparişlerde iade kabul edilmez. Ancak:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mt-3">
                  <li>Henüz hazırlanmamış siparişler 0545 672 63 17 numaralı telefondan iptal edilebilir</li>
                  <li>Ürün hasarlı veya eksik teslim edilirse, 24 saat içinde bildirim yapılması halinde ücretsiz değişim yapılır</li>
                  <li>Yanlış ürün teslimi durumunda tam iade veya değişim yapılır</li>
                  <li>Tazelik sorunu olan ürünler için fotoğraf ile bildirim yapılmalıdır</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Fikri Mülkiyet Hakları</h2>
                <p className="text-slate-700 leading-relaxed">
                  Bu web sitesindeki tüm içerik, görseller, logolar ve tasarımlar Polen Çiçek'e aittir 
                  ve telif hakkı yasaları ile korunmaktadır. İzinsiz kullanım, kopyalama veya dağıtım 
                  yasaktır.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Sorumluluk Sınırlaması</h2>
                <p className="text-slate-700 leading-relaxed">
                  Polen Çiçek, doğal afetler, elektrik kesintileri, internet bağlantı sorunları veya 
                  diğer beklenmedik durumlar nedeniyle oluşabilecek gecikmelerden sorumlu tutulamaz. 
                  Çiçeklerin doğal ürün olması nedeniyle, görsellerdeki renkler ve şekiller gerçek 
                  üründe küçük farklılıklar gösterebilir.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Kişisel Verilerin Korunması</h2>
                <p className="text-slate-700 leading-relaxed">
                  Kişisel verileriniz, Gizlilik Politikamız doğrultusunda işlenir ve korunur. 
                  Detaylı bilgi için Gizlilik Politikası sayfamızı inceleyebilirsiniz.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Uyuşmazlık Çözümü</h2>
                <p className="text-slate-700 leading-relaxed">
                  Bu kullanım koşullarından doğabilecek uyuşmazlıklarda, Türkiye Cumhuriyeti yasaları 
                  geçerlidir. Uyuşmazlıkların çözümünde Konya Mahkemeleri ve İcra Daireleri yetkilidir.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. İletişim</h2>
                <p className="text-slate-700 leading-relaxed">
                  Kullanım koşulları hakkında sorularınız için:
                </p>
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <p className="text-slate-900 font-semibold">Polen Çiçek</p>
                  <p className="text-slate-700">Hacı Mütahir mah, Dr. Rauf Denktaş Cd. No:5, 42320 Ereğli/Konya</p>
                  <p className="text-slate-700">Telefon: 0545 672 63 17</p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/privacy" className="btn-secondary px-8 py-4">
                Gizlilik Politikası
              </a>
              <a href="/contact" className="btn-primary px-8 py-4">
                Bize Ulaşın
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}