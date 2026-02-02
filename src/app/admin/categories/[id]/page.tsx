"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  is_active: boolean;
}

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    icon: "🌸",
    display_order: 1,
  });

  // Ürün yönetimi için state'ler
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true);

  const emojiOptions = ["🌸", "💐", "🌹", "🌺", "🌻", "🌷", "🪴", "🌿", "🍀", "🌾"];

  useEffect(() => {
    loadCategory();
    loadProducts();
  }, []);

  const loadCategory = async () => {
    const supabase = clientSupabase();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (data) {
      setFormData({
        name: data.name || "",
        icon: data.icon || "🌸",
        display_order: data.display_order || 1,
      });
    }

    setLoading(false);
  };

  const loadProducts = async () => {
    const supabase = clientSupabase();
    
    // Tüm ürünleri çek
    const { data: products } = await supabase
      .from("products")
      .select("id, title, price, images, is_active")
      .eq("is_active", true)
      .order("title");

    setAllProducts(products || []);

    // Bu kategorideki ürünleri çek
    const { data: categoryProducts } = await supabase
      .from("product_categories")
      .select("product_id")
      .eq("category_id", categoryId);

    const productIds = categoryProducts?.map(pc => pc.product_id) || [];
    setSelectedProductIds(productIds);

    setLoadingProducts(false);
  };

  const toggleProduct = (productId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const slug = formData.name
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
      
      // 1. Kategori bilgilerini güncelle
      const { error: categoryError } = await supabase
        .from("categories")
        .update({
          name: formData.name,
          slug: slug,
          icon: formData.icon,
          display_order: formData.display_order,
        })
        .eq("id", categoryId);

      if (categoryError) {
        throw categoryError;
      }

      // 2. Ürün-kategori ilişkilerini güncelle
      // Önce mevcut ilişkileri sil
      await supabase
        .from("product_categories")
        .delete()
        .eq("category_id", categoryId);

      // Sonra yeni seçilenleri ekle
      if (selectedProductIds.length > 0) {
        const categoryLinks = selectedProductIds.map(productId => ({
          product_id: productId,
          category_id: categoryId,
        }));

        const { error: linkError } = await supabase
          .from("product_categories")
          .insert(categoryLinks);

        if (linkError) {
          console.error("❌ Ürün bağlama hatası:", linkError);
          throw linkError;
        }
      }

      alert("✅ Kategori ve ürünler başarıyla güncellendi!");
      router.push("/admin/categories");
      
    } catch (error: any) {
      console.error("❌ Güncelleme hatası:", error);
      alert("❌ Hata: " + error.message);
      setSaving(false);
    }
  };

  // Arama filtresi
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin/categories" className="hover:text-purple-600">
          Kategoriler
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Düzenle</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                Kategori Adı *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ color: '#000000' }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Örn: Buketler"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Sıralama Numarası
              </label>
              <input
                type="number"
                min="1"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                style={{ color: '#000000' }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="1"
              />
              <p className="text-sm text-slate-500 mt-2">
                Kategoriler bu sayıya göre sıralanır (küçükten büyüğe)
              </p>
            </div>
          </div>
        </div>

        {/* İkon Seçimi */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            İkon
          </h3>

          <div className="mb-4">
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <span className="text-4xl">{formData.icon}</span>
              <div>
                <div className="font-semibold text-slate-900">Seçili İkon</div>
                <div className="text-sm text-slate-600">Aşağıdan farklı bir ikon seçebilirsiniz</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setFormData({ ...formData, icon: emoji })}
                className={`p-3 text-2xl rounded-lg transition-all ${
                  formData.icon === emoji
                    ? "bg-purple-100 ring-2 ring-purple-500 scale-110"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Seçimi - YENİ! */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Kategorideki Ürünler
              {selectedProductIds.length > 0 && (
                <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                  {selectedProductIds.length} ürün seçili
                </span>
              )}
            </h3>
            
            {selectedProductIds.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedProductIds([])}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                Tümünü Kaldır
              </button>
            )}
          </div>

          {loadingProducts ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Arama */}
              <div className="mb-4">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    style={{ color: '#000000' }}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Ürün Listesi */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <p>{searchQuery ? "Ürün bulunamadı" : "Henüz ürün yok"}</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <label
                      key={product.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedProductIds.includes(product.id)
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200 hover:border-purple-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={() => toggleProduct(product.id)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-400"
                      />
                      
                      {/* Ürün Görseli */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🌸
                          </div>
                        )}
                      </div>

                      {/* Ürün Bilgisi */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 truncate">
                          {product.title}
                        </h4>
                        <p className="text-sm text-slate-600">
                          ₺{product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Seçili İşareti */}
                      {selectedProductIds.includes(product.id) && (
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Butonlar */}
        <div className="flex gap-4">
          <Link href="/admin/categories" className="flex-1">
            <button
              type="button"
              className="w-full px-6 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
            >
              İptal
            </button>
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Kaydediliyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Değişiklikleri Kaydet
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}