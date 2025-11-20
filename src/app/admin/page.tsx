"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0
  });
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);

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

    const adminEmails = ["fevziucak4242@gmail.com"];
    const userIsAdmin = adminEmails.includes(user.email || "");

    if (!userIsAdmin) {
      router.push("/account");
      return;
    }

    setUser(user);
    setIsAdmin(true);
    setLoading(false);
    loadStats();
  };

  const loadStats = async () => {
    const supabase = clientSupabase();
    
    const { count: productsCount } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    const { count: categoriesCount } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const { count: ordersCount } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    // Düşük stoklu ürünler (5'ten az)
    const { data: lowStock } = await supabase
      .from("products")
      .select("*")
      .lte("stock", 5)
      .gt("stock", 0)
      .eq("is_active", true);

    setStats({
      products: productsCount || 0,
      categories: categoriesCount || 0,
      orders: ordersCount || 0,
    });

    setLowStockProducts(lowStock || []);
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Paneli</h1>
          <p className="text-slate-600">Hoş geldiniz, {user?.email}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.products}</div>
            <div className="text-sm text-slate-600">Toplam Ürün</div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.categories}</div>
            <div className="text-sm text-slate-600">Toplam Kategori</div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.orders}</div>
            <div className="text-sm text-slate-600">Toplam Sipariş</div>
          </div>
        </div>

        {/* Düşük Stok Uyarısı */}
        {lowStockProducts.length > 0 && (
          <div className="mb-12 bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6">
            <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
              ⚠️ Düşük Stok Uyarısı
            </h2>
            <p className="text-yellow-700 mb-4">
              {lowStockProducts.length} ürünün stoğu azalıyor!
            </p>
            <div className="space-y-2">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between bg-white p-3 rounded-xl">
                  <span className="font-semibold text-slate-900">{product.title}</span>
                  <span className="text-yellow-700 font-bold">
                    {product.stock} adet kaldı
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/admin/products">
                <button className="btn-primary px-6 py-2 text-sm">
                  Stokları Güncelle
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/products">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:border-purple-300 transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ürün Yönetimi</h3>
              <p className="text-slate-600 text-sm">Ürün ekle, düzenle, sil</p>
            </div>
          </Link>

          <Link href="/admin/categories">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:border-blue-300 transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kategori Yönetimi</h3>
              <p className="text-slate-600 text-sm">Kategori ekle, düzenle, sil</p>
            </div>
          </Link>

          <Link href="/admin/orders">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:border-green-300 transition-all cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sipariş Yönetimi</h3>
              <p className="text-slate-600 text-sm">Siparişleri görüntüle</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </main>
  );
}