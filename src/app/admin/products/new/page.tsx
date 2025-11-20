"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    images: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const supabase = clientSupabase();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    
    setCategories(data || []);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = clientSupabase();
    
    const slug = formData.title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const imagesArray = formData.images
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    // Önce ürünü ekle
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        title: formData.title,
        slug: slug,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: imagesArray,
        is_active: true,
      })
      .select()
      .single();

    if (productError) {
      alert("Hata: " + productError.message);
      setLoading(false);
      return;
    }

    // Kategorileri bağla
    if (selectedCategories.length > 0 && product) {
      const categoryLinks = selectedCategories.map(catId => ({
        product_id: product.id,
        category_id: catId,
      }));

      await supabase
        .from("product_categories")
        .insert(categoryLinks);
    }

    router.push("/admin/products");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Yeni Ürün Ekle</h1>
            <p className="text-slate-600">Yeni bir çiçek ürünü ekleyin</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Ürün Adı *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none"
                  placeholder="Örn: Kırmızı Gül Buketi"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Kategoriler (Çoklu Seçim)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedCategories.includes(cat.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200 hover:border-purple-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
                      />
                      <span className="font-medium text-slate-900">{cat.name}</span>
                    </label>
                  ))}
                </div>
                {selectedCategories.length > 0 && (
                  <p className="text-sm text-purple-600 mt-2">
                    {selectedCategories.length} kategori seçildi
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none"
                  placeholder="Ürün açıklaması..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none"
                    placeholder="299.90"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Stok *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none"
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Resim URL'leri (Her satıra bir URL)
                </label>
                <textarea
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none font-mono text-sm"
                  placeholder="https://example.com/resim1.jpg&#10;https://example.com/resim2.jpg"
                />
                <p className="text-xs text-slate-500 mt-2">Her satıra bir resim URL'si yazın</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Link href="/admin/products" className="flex-1">
                <button type="button" className="w-full btn-secondary py-4">
                  İptal
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary py-4 disabled:opacity-50"
              >
                {loading ? "Ekleniyor..." : "Ürünü Ekle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}