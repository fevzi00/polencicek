"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { clientSupabase } from "@/lib/supabase/client";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images?: string[];
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
    delivery_date: "",
    delivery_time: "09:00-12:00",
    note: "",
    payment_method: "bank_transfer",
  });

  useEffect(() => {
    setMounted(true);
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = clientSupabase();
      const { data: { user } } = await supabase.auth.getUser();

      // Stok kontrolü
      for (const item of items) {
        const { data: product } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single();

        if (product && product.stock !== null && product.stock < item.quantity) {
          (window as any).showToast?.(`"${item.title}" için yeterli stok yok! Mevcut: ${product.stock}`, "error");
          setLoading(false);
          return;
        }
      }

      const orderItems = items.map((item: CartItem) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      // Sipariş oluştur
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id || null,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          delivery_address: formData.delivery_address,
          delivery_date: formData.delivery_date,
          delivery_time: formData.delivery_time,
          note: formData.note,
          payment_method: formData.payment_method,
          total_amount: getTotalPrice(),
          status: "pending",
          items: JSON.stringify(orderItems),
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || orderData.error) {
        console.error("Sipariş hatası:", orderData.error);
        (window as any).showToast?.("Sipariş oluşturulamadı: " + (orderData.error || 'Bilinmeyen hata'), "error");
        setLoading(false);
        return;
      }

      const order = orderData.order;

      // Sepeti temizle ve IBAN sayfasına yönlendir
      clearCart();
      window.location.href = "/checkout/payment-info/" + order.id;

    } catch (err) {
      console.error("❌ Checkout error:", err);
      (window as any).showToast?.("Bir hata oluştu. Lütfen tekrar deneyin.", "error");
      setLoading(false);
    }
  };

  const getMinDeliveryDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-900">Sepet</p>
            </div>
            <div className="flex-1 h-1 bg-purple-600 mx-2"></div>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-sm font-bold text-purple-600">Bilgiler</p>
            </div>
            <div className="flex-1 h-1 bg-slate-200 mx-2"></div>
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-slate-400 font-bold">3</span>
              </div>
              <p className="text-sm font-medium text-slate-400">Ödeme</p>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Teslimat Bilgileri
          </h1>
          <p className="text-xl text-slate-600">
            Bilgilerinizi doldurun ve siparişinizi tamamlayın
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {/* İletişim Bilgileri */}
              <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">İletişim Bilgileri</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      required
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none text-slate-900 font-semibold"
                      style={{ color: '#000000' }}
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        name="customer_email"
                        required
                        value={formData.customer_email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none text-slate-900 font-semibold"
                        style={{ color: '#000000' }}
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        name="customer_phone"
                        required
                        value={formData.customer_phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none text-slate-900 font-semibold"
                        style={{ color: '#000000' }}
                        placeholder="0555 555 55 55"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Teslimat Bilgileri */}
              <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Teslimat Bilgileri</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      Teslimat Adresi *
                    </label>
                    <textarea
                      name="delivery_address"
                      required
                      rows={3}
                      value={formData.delivery_address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none text-slate-900 font-semibold"
                      style={{ color: '#000000' }}
                      placeholder="Mahalle, sokak, bina no, daire no..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        Teslimat Tarihi *
                      </label>
                      <input
                        type="date"
                        name="delivery_date"
                        required
                        min={getMinDeliveryDate()}
                        value={formData.delivery_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none text-slate-900 font-semibold"
                        style={{ color: '#000000' }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2">
                        Teslimat Saati *
                      </label>
                      <select
                        name="delivery_time"
                        required
                        value={formData.delivery_time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none cursor-pointer text-slate-900 font-semibold"
                        style={{ color: '#000000' }}
                      >
                        <option value="09:00-12:00">09:00 - 12:00</option>
                        <option value="12:00-15:00">12:00 - 15:00</option>
                        <option value="15:00-18:00">15:00 - 18:00</option>
                        <option value="18:00-21:00">18:00 - 21:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      Sipariş Notu (Opsiyonel)
                    </label>
                    <textarea
                      name="note"
                      rows={2}
                      value={formData.note}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none text-slate-900 font-semibold"
                      style={{ color: '#000000' }}
                      placeholder="Özel bir mesaj veya not..."
                    />
                  </div>
                </div>
              </div>

              {/* Ödeme Yöntemi Bilgisi */}
              <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Ödeme Yöntemi</h2>
                </div>

                <div className="p-6 border-2 border-purple-400 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xl">🏦 Banka Havalesi / EFT</div>
                      <div className="text-sm text-slate-600 mt-1">Bir sonraki adımda IBAN bilgilerimizi göreceksiniz</div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm text-slate-700">
                        <p className="font-bold mb-1">Nasıl Çalışır?</p>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>Siparişinizi oluşturduktan sonra IBAN bilgilerimizi göreceksiniz</li>
                          <li>Banka havalesi veya EFT ile ödeme yapabilirsiniz</li>
                          <li>Ödemeniz kontrol edildikten sonra siparişiniz hazırlanır</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    İşleniyor...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Ödemeye Geç
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Sipariş Özeti
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-purple-200">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🌸
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 truncate text-sm">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {item.quantity} x ₺{item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="font-bold text-purple-600">
                      ₺{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t-2 border-purple-300">
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium">Ara Toplam</span>
                  <span className="font-bold">₺{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium">Kargo</span>
                  <span className="font-bold text-green-600">Ücretsiz</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium">KDV</span>
                  <span className="font-bold">Dahil</span>
                </div>
                <div className="flex justify-between text-3xl font-bold text-slate-900 pt-3 border-t-2 border-purple-300">
                  <span>Toplam</span>
                  <span className="text-purple-600">₺{getTotalPrice().toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-600 text-right">KDV Dahil</p>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-purple-200">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-bold">Ereğli içi ücretsiz kargo!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}