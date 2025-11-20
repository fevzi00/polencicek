"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";
import { ProductCard } from "@/components/product/ProductCard";

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  is_active: boolean;
  stock: number | null;
}

// useSearchParams kullanan component'i ayırdık
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    if (query) {
      searchProducts(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const searchProducts = async (searchTerm: string) => {
    setLoading(true);
    const supabase = clientSupabase();

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);

    setProducts(data || []);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Arama</span>
          </div>
        </div>

        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Arama Sonuçları
          </h1>
          {query && (
            <p className="text-xl text-slate-600">
              "<span className="font-semibold text-purple-600">{query}</span>" için sonuçlar
            </p>
          )}
        </div>

        {/* Arama Formu */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="btn-primary px-8 py-4 text-lg whitespace-nowrap"
            >
              🔍 Ara
            </button>
          </form>
        </div>

        {/* Sonuçlar */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-slate-600">
                <strong>{products.length}</strong> ürün bulundu
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-slate-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Sonuç bulunamadı
            </h2>
            <p className="text-slate-600 mb-6">
              "<span className="font-semibold">{query}</span>" için ürün bulunamadı
            </p>
            <div className="space-y-3">
              <p className="text-slate-600">Öneriler:</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Farklı anahtar kelimeler deneyin</li>
                <li>• Daha genel terimler kullanın</li>
                <li>• Yazım hatalarını kontrol edin</li>
              </ul>
            </div>
            <div className="mt-8">
              <Link href="/products">
                <button className="btn-primary px-8 py-3">
                  Tüm Ürünleri Gör
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-slate-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Ürün Arayın
              
            </h2>
            <p className="text-slate-600 mb-6">
              Yukarıdaki arama kutusundan ürün arayabilirsiniz
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// Ana sayfa componenti - Suspense ile sarmalanmış
export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </main>
    }>
      <SearchContent />
    </Suspense>
  );
}