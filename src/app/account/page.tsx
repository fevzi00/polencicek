"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const supabase = clientSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setUser(user);
    setLoading(false);
    loadOrders(user.id);
  };

  const loadOrders = async (userId: string) => {
    const supabase = clientSupabase();
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    setOrders(data || []);
  };

  const handleLogout = async () => {
    const supabase = clientSupabase();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Hesabım</h1>
            <p className="text-slate-600">Hoş geldiniz, {user?.email}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Hesap Bilgileri</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-slate-600">E-posta</div>
                  <div className="text-lg font-semibold text-slate-900">{user?.email}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Üyelik Tarihi</div>
                  <div className="text-lg font-semibold text-slate-900">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('tr-TR') : '-'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">İstatistikler</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Toplam Sipariş</span>
                  <span className="text-2xl font-bold text-purple-600">{orders.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Son Siparişlerim</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-purple-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-900">Sipariş #{order.id.slice(0, 8)}</div>
                        <div className="text-sm text-slate-600">
                          {new Date(order.created_at).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          ₺{order.total_amount?.toFixed(2) || '0.00'}
                        </div>
                        <div className="text-sm text-slate-600">{order.status || 'Beklemede'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-slate-600 mb-6">Henüz siparişiniz yok</p>
                <Link href="/products">
                  <button className="btn-primary px-8 py-3">
                    Alışverişe Başla
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}