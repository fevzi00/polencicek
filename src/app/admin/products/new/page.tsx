"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    isFeatured: false,
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

  const handleImagesUploaded = (urls: string[]) => {
    setUploadedImages(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      alert("❌ Lütfen en az bir resim yükleyin!");
      return;
    }

    if (!formData.title.trim()) {
      alert("❌ Ürün adı gereklidir!");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("❌ Geçerli bir fiyat girin!");
      return;
    }

    setLoading(true);

    try {
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

      // Önce ürünü ekle
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          title: formData.title,
          slug: slug,
          description: formData.description || null,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0,
          images: uploadedImages,
          is_active: true,
          is_featured: formData.isFeatured,
        })
        .select()
        .single();

      if (productError) {
        console.error("❌ Ürün ekleme hatası:", productError);
        alert("❌ Ürün eklenemedi: " + productError.message);
        setLoading(false);
        return;
      }

      console.log("✅ Ürün eklendi:", product);

      // Kategorileri bağla
      if (selectedCategories.length > 0 && product) {
        const categoryLinks = selectedCategories.map(catId => ({
          product_id: product.id,
          category_id: catId,
        }));

        console.log("📌 Kategori bağlantıları ekleniyor:", categoryLinks);

        const { data: categoryData, error: categoryError } = await supabase
          .from("product_categories")
          .insert(categoryLinks)
          .select();

        if (categoryError) {
          console.error("❌ Kategori bağlama hatası:", categoryError);
          alert("⚠️ Ürün eklendi ama kategoriler bağlanamadı!\n\nHata: " + categoryError.message + "\n\nLütfen product_categories tablosunun var olduğundan emin olun.");
        } else {
          console.log("✅ Kategoriler bağlandı:", categoryData);
        }
      }

      alert("✅ Ürün başarıyla eklendi!");
      router.push("/admin/products");
      
    } catch (error: any) {
      console.error("❌ Beklenmeyen hata:", error);
      alert("❌ Beklenmeyen bir hata oluştu: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin/products" className="hover:text-purple-600">
          Ürünler
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Yeni Ürün</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resim Upload */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <ImageUpload 
            onImagesUploaded={handleImagesUploaded}
            existingImages={uploadedImages}
          />
        </div>

        {/* Temel Bilgiler */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Temel Bilgiler
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Ürün Adı *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ color: '#000000' }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Örn: Kırmızı Gül Buketi - 21 Adet"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                style={{ color: '#000000' }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none transition-colors"
                placeholder="Ürün hakkında detaylı bilgi..."
              />
            </div>
          </div>
        </div>

        {/* Fiyat & Stok */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Fiyat ve Stok
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Fiyat (₺) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                  ₺
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  style={{ color: '#000000' }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                  placeholder="299.90"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Stok Miktarı *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
                style={{ color: '#000000' }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="50"
              />
            </div>
          </div>
        </div>

        {/* Kategoriler */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Kategoriler
            {selectedCategories.length > 0 && (
              <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                {selectedCategories.length} seçili
              </span>
            )}
          </h3>

          {categories.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">Henüz kategori yok</p>
              <Link href="/admin/categories">
                <button type="button" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Kategori Ekle →
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedCategories.includes(cat.id)
                      ? "border-purple-500 bg-purple-50 shadow-sm"
                      : "border-slate-200 hover:border-purple-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
                  />
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg flex-shrink-0">{cat.icon}</span>
                    <span className="font-medium text-slate-900 truncate">{cat.name}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Ek Ayarlar */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Ek Ayarlar
          </h3>

          <label className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
            />
            <div>
              <div className="font-semibold text-slate-900 flex items-center gap-2">
                <span>⭐</span>
                Öne Çıkan Ürün
              </div>
              <div className="text-sm text-slate-600">
                Bu ürün ana sayfada ve öne çıkanlar bölümünde görüntülenir
              </div>
            </div>
          </label>
        </div>

        {/* Butonlar */}
        <div className="flex gap-4">
          <Link href="/admin/products" className="flex-1">
            <button 
              type="button" 
              className="w-full px-6 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
            >
              İptal
            </button>
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Ekleniyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ürünü Ekle
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}