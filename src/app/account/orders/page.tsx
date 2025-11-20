"use client";

import { useEffect, useState } from "react";
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
  note: string | null;
  payment_method: string;
  total_amount: number;
  status: string;
  items: string | any[];
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const supabase = clientSupabase();
      
      // Kullanıcı kontrolü
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      // Siparişleri çek
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Orders fetch error:", error);
      } else {
        setOrders(data || []);
      }
    } catch (err) {
      console.error("Load orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "Beklemede",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: "⏳"
      },
      confirmed: {
        label: "Onaylandı",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: "✓"
      },
      preparing: {
        label: "Hazırlanıyor",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: "🌸"
      },
      shipped: {
        label: "Yolda",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        icon: "🚚"
      },
      delivered: {
        label: "Teslim Edildi",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: "✅"
      },
      cancelled: {
        label: "İptal Edildi",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: "❌"
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${config.color}`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods: { [key: string]: string } = {
      card: "💳 Kredi Kartı",
      cash: "💵 Kapıda Nakit",
      transfer: "🏦 Havale/EFT"
    };
    return methods[method] || method;
  };

  const parseItems = (items: string | any[]) => {
    if (typeof items === "string") {
      try {
        return JSON.parse(items);
      } catch {
        return [];
      }
    }
    return items || [];
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Giriş Yapın</h1>
            <p className="text-lg text-slate-600 mb-8">
              Siparişlerinizi görmek için giriş yapmalısınız
            </p>
            <Link href="/auth/login">
              <button className="btn-primary px-8 py-3">
                Giriş Yap
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Başlık */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Siparişlerim
          </h1>
          <p className="text-xl text-slate-600">
            Geçmiş siparişlerinizi ve durumlarını görüntüleyin
          </p>
        </div>

        {/* Siparişler */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Henüz sipariş yok</h2>
            <p className="text-slate-600 mb-6">İlk siparişinizi vererek başlayın!</p>
            <Link href="/products">
              <button className="btn-primary px-8 py-3">
                Ürünleri Keşfet
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const items = parseItems(order.items);
              
              return (
                <div key={order.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                  {/* Üst Bilgiler */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          Sipariş #{order.id.slice(0, 8).toUpperCase()}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-slate-600">
                        {new Date(order.created_at).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600 mb-1">Toplam Tutar</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ₺{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Ürünler */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-3">Ürünler</h4>
                    <div className="space-y-3">
                      {items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🌸
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-slate-900 truncate">{item.title}</h5>
                            <p className="text-sm text-slate-600">
                              {item.quantity} adet × ₺{item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="font-bold text-purple-600">
                            ₺{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alt Bilgiler */}
                  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Teslimat Bilgileri</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-600 w-24">Adres:</span>
                          <span className="text-slate-900 flex-1">{order.delivery_address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 w-24">Tarih:</span>
                          <span className="text-slate-900">
                            {new Date(order.delivery_date).toLocaleDateString("tr-TR")} - {order.delivery_time}
                          </span>
                        </div>
                        {order.note && (
                          <div className="flex items-start gap-2">
                            <span className="text-slate-600 w-24">Not:</span>
                            <span className="text-slate-900 flex-1">{order.note}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">İletişim & Ödeme</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 w-24">İsim:</span>
                          <span className="text-slate-900">{order.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 w-24">Telefon:</span>
                          <span className="text-slate-900">{order.customer_phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 w-24">E-posta:</span>
                          <span className="text-slate-900">{order.customer_email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 w-24">Ödeme:</span>
                          <span className="text-slate-900">{getPaymentMethodLabel(order.payment_method)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}