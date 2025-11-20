"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";
import { useCartStore } from "@/store/cartStore";
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
  is_active: boolean;
  stock: number | null;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

type ViewMode = "grid-3" | "grid-4" | "list";
type SortBy = "newest" | "price-asc" | "price-desc" | "popular";

// useSearchParams kullanan ana component'i ayırdık
function ProductsContent() {
  const searchParams = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [searchQuery, setSearchQuery] = useState("");

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const cat = categories.find((c) => c.slug === category);
      if (cat) setSelectedCategory(cat.id);
    }
  }, [searchParams, categories]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategory, priceRange, inStockOnly, sortBy, searchQuery]);

  const loadData = async () => {
    try {
      const supabase = clientSupabase();

      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true);

      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Kategori filtresi
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category_id === selectedCategory);
    }

    // Fiyat filtresi
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Stok filtresi
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.stock && p.stock > 0);
    }

    // Arama
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sıralama
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "popular":
        filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 10000]);
    setInStockOnly(false);
    setSearchQuery("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 10000 ||
    inStockOnly ||
    searchQuery !== "";

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      slug: product.slug,
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 animate-pulse">
            <div className="h-12 bg-slate-200 rounded w-64 mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-96"></div>
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Tüm Ürünler
          </h1>
          <p className="text-xl text-slate-600">
            {filteredProducts.length} ürün bulundu
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Filtreler</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Temizle
                  </button>
                )}
              </div>

              {/* Arama */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Ürün Ara
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün adı..."
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-purple-400 focus:outline-none"
                  style={{ color : '#000000'}}
                />
              </div>

              {/* Kategoriler */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Kategori
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? "bg-purple-100 text-purple-700 font-semibold"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    Tümü ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-purple-100 text-purple-700 font-semibold"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {cat.icon} {cat.name} (
                      {products.filter((p) => p.category_id === cat.id).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Fiyat Aralığı */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Fiyat Aralığı
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                      }
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-purple-400 focus:outline-none"
                      style={{ color : '#000000'}}
                      placeholder="Min"
                    />
                    <span className="text-slate-600">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])
                      }
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-purple-400 focus:outline-none"
                      style={{ color : '#000000'}}
                      placeholder="Max"
                    />
                  </div>
                  <div className="text-sm text-slate-600">
                    ₺{priceRange[0]} - ₺{priceRange[1]}
                  </div>
                </div>
              </div>

              {/* Stok Durumu */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-semibold text-slate-900">
                    Sadece stokta olanlar
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Ana İçerik */}
          <div className="flex-1">
            {/* Üst Bar - Sıralama & Görünüm */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Sıralama */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-slate-900">
                  Sırala:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-purple-400 focus:outline-none font-medium"
                  style={{ color : '#000000'}}    
                >
                  <option value="newest">En Yeni</option>
                  <option value="price-asc">Ucuzdan Pahalıya</option>
                  <option value="price-desc">Pahalıdan Ucuza</option>
                  <option value="popular">Popüler</option>
                  
                </select>
              </div>

              {/* Görünüm Modu */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid-3")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid-3"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title="3 Kolon"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="13" y="3" width="8" height="7" rx="1" />
                    <rect x="3" y="13" width="7" height="8" rx="1" />
                    <rect x="13" y="13" width="8" height="8" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid-4")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid-4"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title="4 Kolon"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="4" height="4" rx="1" />
                    <rect x="10" y="3" width="4" height="4" rx="1" />
                    <rect x="17" y="3" width="4" height="4" rx="1" />
                    <rect x="3" y="10" width="4" height="4" rx="1" />
                    <rect x="10" y="10" width="4" height="4" rx="1" />
                    <rect x="17" y="10" width="4" height="4" rx="1" />
                    <rect x="3" y="17" width="4" height="4" rx="1" />
                    <rect x="10" y="17" width="4" height="4" rx="1" />
                    <rect x="17" y="17" width="4" height="4" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title="Liste"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Ürünler Grid/List */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-slate-600 mb-6">
                  Filtreleri değiştirip tekrar deneyin
                </p>
                <button onClick={clearFilters} className="btn-primary px-8 py-3">
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "list"
                      ? "space-y-4"
                      : `grid gap-6 ${
                          viewMode === "grid-3"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        }`
                  }
                >
                  {currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      onQuickView={() => setQuickViewProduct(product)}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border-2 border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-400 transition-colors"
                    >
                      ←
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          currentPage === page
                            ? "bg-purple-600 text-white border-purple-600"
                            : "border-slate-200 hover:border-purple-400"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border-2 border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-400 transition-colors"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={() => handleAddToCart(quickViewProduct)}
        />
      )}
    </main>
  );
}

// Ana sayfa componenti - Suspense ile sarmalanmış
export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 animate-pulse">
            <div className="h-12 bg-slate-200 rounded w-64 mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-96"></div>
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  );
}

// Product Card Component
function ProductCard({
  product,
  viewMode,
  onQuickView,
  onAddToCart,
}: {
  product: Product;
  viewMode: ViewMode;
  onQuickView: () => void;
  onAddToCart: () => void;
}) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 p-6 flex gap-6">
        <Link href={`/products/${product.slug}`} className="flex-shrink-0">
          <div className="w-32 h-32 rounded-lg overflow-hidden bg-slate-100">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                🌸
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-xl font-bold text-slate-900 hover:text-purple-600 transition-colors mb-2">
                {product.title}
              </h3>
            </Link>
            {product.description && (
              <p className="text-slate-600 line-clamp-2">{product.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-3xl font-bold text-purple-600">
              ₺{product.price.toFixed(2)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={onQuickView}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
              >
                Hızlı Bak
              </button>
              <button
                onClick={onAddToCart}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group">
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative h-64 bg-slate-100 overflow-hidden">
          {product.images?.[0] ? (
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
          {product.stock !== null && product.stock > 0 && (
  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
    ✓ Stokta
  </div>
)}
{product.stock === 0 && (
  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
    ✗ Tükendi
  </div>
)}
          {product.is_featured && (
            <div className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ⭐ Popüler
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2">
            {product.title}
          </h3>
        </Link>
        {product.description && (
          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">
            ₺{product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onQuickView}
              className="w-10 h-10 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
              title="Hızlı Bak"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button
              onClick={onAddToCart}
              className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              title="Sepete Ekle"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick View Modal Component
function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Hızlı Bakış</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Resim */}
            <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-square">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  🌸
                </div>
              )}
            </div>

            {/* Detaylar */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{product.title}</h3>
              {product.description && (
                <p className="text-slate-600 mb-6">{product.description}</p>
              )}

              <div className="text-4xl font-bold text-purple-600 mb-6">
                ₺{product.price.toFixed(2)}
              </div>

              {product.stock !== null && (
                <div className="mb-6">
                  <span className="text-sm text-slate-600">
                    Stok ✓
                  </span>
                </div>
              )}

              {/* Miktar */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Miktar
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(product.stock || 999, q + 1)
                      )
                    }
                    className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Butonlar */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onAddToCart();
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                >
                  Sepete Ekle
                </button>
                <Link href={`/products/${product.slug}`} className="flex-1">
                  <button
                    onClick={onClose}
                    className="w-full bg-white text-purple-600 border-2 border-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all"
                  >
                    Detayları Gör
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}