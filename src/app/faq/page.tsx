"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Aynı gün teslimat yapıyor musunuz?",
    answer: "Evet! Saat 14:00'a kadar verilen siparişler aynı gün içinde teslim edilir. 14:00'dan sonraki siparişler ertesi gün teslim edilir."
  },
  {
    question: "Hangi bölgelere teslimat yapıyorsunuz?",
    answer: "Konya Ereğli merkez ve çevre mahallelerine teslimat yapıyoruz. Teslimat bölgesi hakkında detaylı bilgi için bizi arayabilirsiniz."
  },
  {
    question: "Sipariş iptali yapabilir miyim?",
    answer: "Henüz hazırlanmamış siparişlerinizi iptal edebilirsiniz. Lütfen en kısa sürede 0545 672 63 17 numaralı telefondan bizi arayın."
  },
  {
    question: "Çiçeklerin tazelik garantisi var mı?",
    answer: "Evet! Tüm çiçeklerimiz her gün taze olarak temin edilir. Tazelik garantisi veriyoruz. Eğer ürün beklentinizi karşılamazsa, bize bildirin."
  },
  {
    question: "Özel tasarım buket yaptırabilir miyim?",
    answer: "Elbette! Özel günleriniz için özel tasarım buketler hazırlıyoruz. Bize isteğinizi iletin, sizin için özel bir tasarım yapalım."
  },
  {
    question: "Ödeme seçenekleri nelerdir?",
    answer: "Kredi kartı, banka kartı ve kapıda ödeme (nakit/kart) seçeneklerimiz mevcuttur. Online ödemeleriniz SSL güvenlik sertifikası ile korunmaktadır."
  },
  {
    question: "Hediye mesajı ekleyebilir miyim?",
    answer: "Evet! Sipariş sırasında hediye mesajı ekleyebilirsiniz. Mesajınız özel bir kart ile çiçeklerinizle birlikte teslim edilir."
  },
  {
    question: "Kargo ücreti ne kadar?",
    answer: "Tüm siparişlerimizde kargo ücretsizdir! Ereğli içi teslimatlarımızda ek ücret alınmaz."
  },
  {
    question: "Siparişimi takip edebilir miyim?",
    answer: "Evet! Siparişiniz hazırlanıp kargoya verildiğinde size SMS/WhatsApp ile bilgilendirme yapılır."
  },
  {
    question: "İade/değişim politikanız nedir?",
    answer: "Taze ürün olduğu için iade kabul edilmemektedir. Ancak ürün hasarlı veya eksik gelirse, 24 saat içinde bize bildirmeniz halinde ücretsiz değişim yapılır."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Sık Sorulan Sorular
            </h1>
            <p className="text-xl text-slate-600">
              Merak ettiğiniz her şey burada
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-slate-100 overflow-hidden transition-all duration-300 hover:border-purple-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-purple-50/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 flex-1">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Sorunuz mu var?
            </h2>
            <p className="text-slate-600 mb-6">
              Cevabını bulamadınız mı? Bize ulaşın, yardımcı olalım!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary px-8 py-4">
                Bize Yazın
              </a>
              <a href="tel:05456726317" className="btn-secondary px-8 py-4">
                Bizi Arayın
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}