"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  is_active: boolean;
  images: string[];
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadProducts();
  }, []);

  const checkAuth = async () => {
    const supabase = clientSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || user.email !== "fevziucak4242@gmail.com") {
      router.push("/");
    }
  };

  const loadProducts = async () => {
    const supabase = clientSupabase();
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
    setLoading(false);
  };

  const toggleActive = async (productId: string, currentStatus: boolean) => {
    const supabase = clientSupabase();
    await supabase
      .from("products")
      .update({ is_active: !currentStatus })
      .eq("id", productId);

    loadProducts();
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    const supabase = clientSupabase();
    await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    loadProducts();
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Ürün Yönetimi</h1>
            <p className="text-slate-600">Toplam {products.length} ürün</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin">
              <button className="btn-secondary px-6 py-3">
                ← Geri Dön
              </button>
            </Link>
            <Link href="/admin/products/new">
              <button className="btn-primary px-6 py-3">
                + Yeni Ürün
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Resim</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Ürün Adı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fiyat</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Stok</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Durum</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            📷
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{product.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-purple-600">₺{product.price?.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{product.stock || 0}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(product.id, product.is_active)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.is_active ? "Aktif" : "Pasif"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}`}>
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold">
                            Düzenle
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-slate-600 mb-6">Henüz ürün yok</p>
              <Link href="/admin/products/new">
                <button className="btn-primary px-8 py-3">
                  İlk Ürünü Ekle
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}