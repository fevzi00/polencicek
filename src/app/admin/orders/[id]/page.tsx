"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_date: string;
  delivery_time: string;
  total_amount: number;
  status: string;
  note: string;
  payment_method: string;
  created_at: string;
  items: any;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const supabase = clientSupabase();
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    setOrder(data);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "confirmed": return "bg-blue-100 text-blue-700";
      case "preparing": return "bg-purple-100 text-purple-700";
      case "delivering": return "bg-cyan-100 text-cyan-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Beklemede";
      case "confirmed": return "Onaylandı";
      case "preparing": return "Hazırlanıyor";
      case "delivering": return "Yolda";
      case "delivered": return "Teslim Edildi";
      case "cancelled": return "İptal Edildi";
      default: return status;
    }
  };

  const getPaymentText = (method: string) => {
    switch (method) {
      case "cash": return "💵 Kapıda Nakit";
      case "card": return "💳 Kapıda Kart";
      case "transfer": return "🏦 Havale/EFT";
      default: return method;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-slate-600 mb-6">Sipariş bulunamadı</p>
          <Link href="/admin/orders">
            <button className="btn-primary px-8 py-3">Siparişlere Dön</button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/admin/orders" className="text-slate-600 hover:text-slate-900 mb-4 inline-block">
              ← Siparişlere Dön
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  Sipariş #{order.id.slice(0, 8)}
                </h1>
                <p className="text-slate-600">
                  {new Date(order.created_at).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <span className={`px-6 py-3 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Müşteri Bilgileri */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Müşteri Bilgileri</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Ad Soyad</p>
                  <p className="text-lg font-semibold text-slate-900">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">E-posta</p>
                  <p className="text-lg font-semibold text-slate-900">{order.customer_email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Telefon</p>
                  <p className="text-lg font-semibold text-slate-900">{order.customer_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Ödeme Yöntemi</p>
                  <p className="text-lg font-semibold text-slate-900">{getPaymentText(order.payment_method)}</p>
                </div>
              </div>
            </div>

            {/* Teslimat Bilgileri */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Teslimat Bilgileri</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-600 mb-1">Teslimat Adresi</p>
                  <p className="text-lg font-semibold text-slate-900">{order.delivery_address}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Teslimat Tarihi</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {new Date(order.delivery_date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Teslimat Saati</p>
                  <p className="text-lg font-semibold text-slate-900">{order.delivery_time}</p>
                </div>
              </div>
            </div>

            {/* Sipariş Ürünleri */}
            {order.items && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Sipariş Ürünleri</h2>
                <div className="space-y-3">
                  {(() => {
                    try {
                      const items = typeof order.items === 'string' 
                        ? JSON.parse(order.items) 
                        : order.items;
                      
                      if (!items || items.length === 0) {
                        return <p className="text-slate-600">Ürün bilgisi bulunamadı</p>;
                      }

                      return items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 text-lg">{item.title}</p>
                            <p className="text-sm text-slate-600 mt-1">
                              Adet: {item.quantity} × ₺{item.price?.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-600 mb-1">Ara Toplam</p>
                            <p className="font-bold text-purple-600 text-xl">
                              ₺{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ));
                    } catch (err) {
                      console.error("Items parse hatası:", err, order.items);
                      return (
                        <div className="p-4 bg-red-50 rounded-xl">
                          <p className="text-red-600">❌ Ürün bilgileri yüklenemedi</p>
                          <p className="text-xs text-red-500 mt-2">Hata: {String(err)}</p>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            )}

            {/* Sipariş Notu */}
            {order.note && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Sipariş Notu</h2>
                <p className="text-slate-700 text-lg">{order.note}</p>
              </div>
            )}

            {/* Toplam Tutar */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 shadow-lg text-white">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Toplam Tutar</div>
                <div className="text-5xl font-bold">₺{order.total_amount?.toFixed(2) || '0.00'}</div>
              </div>
              <p className="mt-2 opacity-90">
                {getPaymentText(order.payment_method)} ile ödenecek
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}