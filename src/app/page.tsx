"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  category_id: string | null;
  is_featured: boolean;
  stock: number | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {
    const supabase = clientSupabase();

    // Önce öne çıkan ürünleri dene
    let { data: products } = await supabase
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .limit(8);

    // Eğer öne çıkan ürün yoksa, en yeni ürünleri al
    if (!products || products.length === 0) {
      const { data: allProducts } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);
      
      products = allProducts;
    }

    // Categories
    const { data: cats } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    setFeaturedProducts(products || []);
    setCategories(cats || []);
  } catch (error) {
    console.error("Load data error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-white py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Ana Başlık */}
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Şıklık, Tazelik ve Özen…
            </h1>
            
            {/* Alt Başlık - El Yazısı Stil */}
            <div className="text-3xl md:text-5xl mb-8 flex items-center justify-center gap-3 flex-wrap">
              <span className="text-slate-700 font-semibold">Premium çiçek hizmeti</span>
              <span 
                className="text-purple-600 font-bold"
                style={{ 
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.3em',
                  textShadow: '2px 2px 4px rgba(147, 51, 234, 0.15)',
                  transform: 'rotate(-2deg)',
                  display: 'inline-block'
                }}
              >
                şehrin çiçekçisinde
              </span>
              <span className="text-slate-700 font-semibold">başlar.</span>
            </div>

            {/* Açıklama */}
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              2011'den beri Konya Ereğli'de en taze çiçeklerle, özenle hazırlanmış buketler sunuyoruz.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  🌸 Ürünleri Keşfet
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-10 py-4 bg-white text-purple-600 text-lg font-bold rounded-xl border-2 border-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300">
                  📞 İletişime Geç
                </button>
              </Link>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">14+</div>
                <div className="text-sm text-slate-600 font-medium">Yıllık Deneyim</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-600 mb-2">5000+</div>
                <div className="text-sm text-slate-600 font-medium">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">%100</div>
                <div className="text-sm text-slate-600 font-medium">Tazelik Garantisi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dekoratif Elementler */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🌸</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>🌹</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-pulse">✨</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>💐</div>
      </section>

      {/* Kategoriler */}
      {categories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Kategoriler</h2>
              <p className="text-xl text-slate-600">İhtiyacınıza uygun çiçeği bulun</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/products?category=${category.slug}`}>
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer group text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {category.icon || "🌸"}
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Öne Çıkan Ürünler */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-xl text-slate-600">En popüler ve özel tasarımlarımız</p>
          </div>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                    {/* Resim */}
                    <div className="relative h-64 bg-slate-100 overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          🌸
                        </div>
                      )}
                      {product.stock !== null && product.stock > 0 && product.stock < 10 && (
                               <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                 Stok ✓ 
                               </div>
                                )}
                      {product.stock === 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Tükendi
                        </div>
                      )}
                    </div>

                    {/* İçerik */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">
                          ₺{product.price.toFixed(2)}
                        </span>
                        <button className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Tümünü Gör */}
          <div className="text-center mt-12">
            <Link href="/products">
              <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Tüm Ürünleri Gör →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Neden Biz */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Neden Polen Çiçek?</h2>
            <p className="text-xl text-slate-600">Bizi tercih etmeniz için birçok neden var</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Taze Çiçekler</h3>
              <p className="text-slate-600">
                Her gün taze kesilen çiçeklerle hazırlanan buketler
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hızlı Teslimat</h3>
              <p className="text-slate-600">
                Ereğli içi aynı gün teslimat garantisi
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Özenli Hizmet</h3>
              <p className="text-slate-600">
                14 yıllık deneyimimizle kusursuz hizmet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sevdiklerinizi Mutlu Edin! 💐
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Özel günlerinizi unutulmaz kılmak için hemen sipariş verin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="px-10 py-4 bg-white text-purple-600 text-lg font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Hemen Sipariş Ver
              </button>
            </Link>
            <a href="tel:05456726317">
              <button className="px-10 py-4 bg-transparent text-white text-lg font-bold rounded-xl border-2 border-white hover:bg-white hover:text-purple-600 transition-all duration-300">
                📞 0545 672 63 17
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}