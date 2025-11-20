"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  images: string[];
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductsClient({ initialProducts, categories }: ProductsClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtreleme
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.id === selectedCategory; // Not: Kategori filtreleme için product_categories tablosu gerekli

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Tüm Ürünler</h1>
          <p className="text-xl text-slate-600">
            En taze ve kaliteli çiçeklerimizi keşfedin
          </p>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 mb-8">
          {/* Arama */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="w-full px-6 py-4 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none text-lg"
            />
          </div>

          {/* Kategori Filtreleri */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Kategoriler</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Tümü
              </button>
              {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <button className="px-6 py-3 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-700 transition-all">
                    {category.name}
                  </button>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-600">
                💡 Kategoriye tıklayarak o kategorideki tüm ürünleri görebilirsiniz
              </p>
            </div>
          </div>
        </div>

        {/* Sonuçlar */}
        <div className="mb-6">
          <p className="text-slate-600">
            <strong>{filteredProducts.length}</strong> ürün bulundu
          </p>
        </div>

        {/* Ürünler */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl shadow-lg border border-slate-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Ürün bulunamadı
            </h2>
            <p className="text-slate-600 mb-6">
              Arama kriterlerinizi değiştirmeyi deneyin
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="btn-primary px-8 py-3"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </main>
  );
}