"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    checkAuth();
    loadOrders();
  }, [filterStatus]);

  const checkAuth = async () => {
    const supabase = clientSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || user.email !== "fevziucak4242@gmail.com") {
      router.push("/");
    }
  };

  const loadOrders = async () => {
    setLoading(true);
    const supabase = clientSupabase();
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (filterStatus !== "all") {
      query = query.eq("status", filterStatus);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error("Siparişler yüklenirken hata:", error);
    }
    
    setOrders(data || []);
    setLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const supabase = clientSupabase();
      
      console.log("🔄 Güncelleniyor:", { orderId, newStatus });
      
      const { data, error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId)
        .select();

      console.log("📊 Sonuç:", { data, error });

      if (error) {
        console.error("❌ Durum güncelleme hatası:", error);
        alert("Durum güncellenemedi: " + error.message);
      } else {
        console.log("✅ Başarılı! Güncellenen:", data);
        alert(`Sipariş durumu "${getStatusText(newStatus)}" olarak güncellendi!`);
        await loadOrders();
      }
    } catch (err) {
      console.error("💥 Beklenmeyen hata:", err);
      alert("Bir hata oluştu!");
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Bu siparişi silmek istediğinize emin misiniz?")) return;

    const supabase = clientSupabase();
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (error) {
      alert("Sipariş silinemedi: " + error.message);
    } else {
      alert("Sipariş silindi!");
      loadOrders();
    }
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Sipariş Yönetimi</h1>
            <p className="text-slate-600">Toplam {orders.length} sipariş</p>
          </div>
          <Link href="/admin">
            <button className="btn-secondary px-6 py-3">
              ← Geri Dön
            </button>
          </Link>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filterStatus === "all"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filterStatus === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Beklemede
            </button>
            <button
              onClick={() => setFilterStatus("confirmed")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filterStatus === "confirmed"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Onaylandı
            </button>
            <button
              onClick={() => setFilterStatus("preparing")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filterStatus === "preparing"
                  ? "bg-purple-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Hazırlanıyor
            </button>
            <button
              onClick={() => setFilterStatus("delivering")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filterStatus === "delivering"
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Yolda
            </button>
            <button
              onClick={() => setFilterStatus("delivered")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filterStatus === "delivered"
                  ? "bg-green-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Teslim Edildi
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                filterStatus === "cancelled"
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              İptal
            </button>
          </div>
        </div>

        {/* Sipariş Listesi */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      #{order.id.slice(0, 8)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {new Date(order.created_at).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    ₺{order.total_amount?.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-sm text-slate-600">
                    {getPaymentText(order.payment_method)}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Müşteri Bilgileri</h4>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p><strong>Ad:</strong> {order.customer_name}</p>
                    <p><strong>E-posta:</strong> {order.customer_email}</p>
                    <p><strong>Telefon:</strong> {order.customer_phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Teslimat Bilgileri</h4>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p><strong>Adres:</strong> {order.delivery_address}</p>
                    <p><strong>Tarih:</strong> {new Date(order.delivery_date).toLocaleDateString('tr-TR')}</p>
                    <p><strong>Saat:</strong> {order.delivery_time}</p>
                  </div>
                </div>
              </div>

              {order.note && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm font-semibold text-slate-900 mb-1">Not:</p>
                  <p className="text-sm text-slate-600">{order.note}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="px-4 py-2 border-2 border-slate-200 rounded-lg text-sm font-semibold focus:border-purple-400 focus:outline-none"
                >
                  <option value="pending">Beklemede</option>
                  <option value="confirmed">Onaylandı</option>
                  <option value="preparing">Hazırlanıyor</option>
                  <option value="delivering">Yolda</option>
                  <option value="delivered">Teslim Edildi</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>

                <Link href={`/admin/orders/${order.id}`}>
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold">
                    Detaylar
                  </button>
                </Link>

                <button
                  onClick={() => deleteOrder(order.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-slate-100 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-slate-600 mb-2">
              {filterStatus === "all" ? "Henüz sipariş yok" : "Bu durumda sipariş yok"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}