"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    checkAuth();
    loadCategories();
  }, []);

  const checkAuth = async () => {
    const supabase = clientSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || user.email !== "fevziucak4242@gmail.com") {
      router.push("/");
    }
  };

  const loadCategories = async () => {
    const supabase = clientSupabase();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    setCategories(data || []);
    setLoading(false);
  };

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    const slug = newCategoryName
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const supabase = clientSupabase();
    const { error } = await supabase
      .from("categories")
      .insert({
        name: newCategoryName,
        slug: slug,
      });

    if (error) {
      alert("Hata: " + error.message);
    } else {
      setNewCategoryName("");
      setShowAddModal(false);
      loadCategories();
    }

    setAdding(false);
  };

  const deleteCategory = async (categoryId: string) => {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;

    const supabase = clientSupabase();
    await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId);

    loadCategories();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Kategori Yönetimi</h1>
            <p className="text-slate-600">Toplam {categories.length} kategori</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin">
              <button className="btn-secondary px-6 py-3">
                ← Geri Dön
              </button>
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary px-6 py-3"
            >
              + Yeni Kategori
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500">/{category.slug}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/categories/${category.id}`} className="flex-1">
                  <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold">
                    Düzenle
                  </button>
                </Link>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-slate-100 text-center">
            <div className="text-6xl mb-4">🏷️</div>
            <p className="text-slate-600 mb-6">Henüz kategori yok</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary px-8 py-3"
            >
              İlk Kategoriyi Ekle
            </button>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Yeni Kategori</h2>
            <form onSubmit={addCategory}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Kategori Adı
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none"
                  placeholder="Örn: Buketler"
                  autoFocus
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewCategoryName("");
                  }}
                  className="flex-1 btn-secondary py-3"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 btn-primary py-3 disabled:opacity-50"
                >
                  {adding ? "Ekleniyor..." : "Ekle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}