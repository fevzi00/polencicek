"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { clientSupabase } from "@/lib/supabase/client";

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  customer_name: string;
  customer_email: string;
  status: string;
  created_at: string;
}

export default function PaymentInfoPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [copied, setCopied] = useState(false);

  // IBAN Bilgileri - Buraya kendi bilgilerinizi yazın
  const BANK_INFO = {
    bankName: "Türkiye İş Bankası",
    accountHolder: "Polen Çiçek",
    iban: "TR00 0000 0000 0000 0000 0000 00", // Gerçek IBAN'ınızı yazın
    branch: "Konya Ereğli Şubesi"
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const supabase = clientSupabase();
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error("Sipariş yüklenemedi:", error);
      (window as any).showToast?.("Sipariş bulunamadı", "error");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText(BANK_INFO.iban);
    setCopied(true);
    (window as any).showToast?.("IBAN kopyalandı!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancel = async () => {
    if (!confirm("Siparişi iptal etmek istediğinize emin misiniz?")) return;

    setCancelling(true);
    try {
      const supabase = clientSupabase();
      const { error } = await supabase
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", orderId);

      if (error) throw error;

      (window as any).showToast?.("Sipariş iptal edildi", "info");
      router.push("/");
    } catch (error) {
      console.error("İptal hatası:", error);
      (window as any).showToast?.("İptal edilemedi", "error");
    } finally {
      setCancelling(false);
    }
  };

  const handleConfirmPayment = async () => {
    setConfirming(true);
    try {
      const supabase = clientSupabase();
      const { error } = await supabase
        .from("orders")
        .update({ status: "payment_pending" })
        .eq("id", orderId);

      if (error) throw error;

      router.push(`/checkout/success?orderId=${orderId}`);
    } catch (error) {
      console.error("Onay hatası:", error);
      (window as any).showToast?.("Bir hata oluştu", "error");
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!order) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Başlık */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Ödeme Bilgileri
            </h1>
            <p className="text-xl text-slate-600">
              Siparişiniz oluşturuldu. Ödemenizi tamamlayın.
            </p>
          </div>

          {/* Ana Kart */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Sipariş Bilgisi */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Sipariş Numarası</p>
                  <p className="text-2xl font-bold">#{order.order_number}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-sm mb-1">Ödenecek Tutar</p>
                  <p className="text-3xl font-bold">₺{order.total_amount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* IBAN Bilgileri */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Banka Bilgileri
                </h2>

                <div className="space-y-4">
                  {/* Banka Adı */}
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">Banka</p>
                    <p className="text-lg font-bold text-slate-900">{BANK_INFO.bankName}</p>
                    <p className="text-sm text-slate-500">{BANK_INFO.branch}</p>
                  </div>

                  {/* Hesap Sahibi */}
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-600 mb-1">Hesap Sahibi</p>
                    <p className="text-lg font-bold text-slate-900">{BANK_INFO.accountHolder}</p>
                  </div>

                  {/* IBAN - Kopyalanabilir */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                    <p className="text-sm text-slate-600 mb-2">IBAN Numarası</p>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-mono font-bold text-slate-900 flex-1">
                        {BANK_INFO.iban}
                      </p>
                      <button
                        onClick={handleCopyIBAN}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 font-bold"
                      >
                        {copied ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Kopyalandı
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Kopyala
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ödeme Talimatları */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3 mb-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Ödeme Talimatları</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">1.</span>
                        <span>Yukarıdaki IBAN numarasına <strong>₺{order.total_amount.toFixed(2)}</strong> tutarında havale/EFT yapın</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">2.</span>
                        <span>Havale açıklamasına mutlaka <strong className="text-purple-600">#{order.order_number}</strong> sipariş numaranızı yazın</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">3.</span>
                        <span>Ödemenizi yaptıktan sonra aşağıdaki <strong>"Ödemeyi Yaptım"</strong> butonuna tıklayın</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">4.</span>
                        <span>Ödemeniz 1-2 saat içinde kontrol edilecek ve siparişiniz hazırlanmaya başlanacaktır</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Butonlar */}
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="py-4 px-6 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cancelling ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                      İptal Ediliyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Vazgeç
                    </>
                  )}
                </button>

                <button
                  onClick={handleConfirmPayment}
                  disabled={confirming}
                  className="py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {confirming ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Kontrol Ediliyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ödemeyi Yaptım
                    </>
                  )}
                </button>
              </div>

              {/* Uyarı */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-800 flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><strong>Önemli:</strong> Ödeme yapmadan "Ödemeyi Yaptım" butonuna tıklamayın. Sipariş numaranızı havale açıklamasına yazmayı unutmayın!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}