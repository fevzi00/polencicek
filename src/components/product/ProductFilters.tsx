"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  currentParams: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  };
}

export function ProductFilters({ categories, currentParams }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState(currentParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(currentParams.maxPrice || "");
  const [search, setSearch] = useState(currentParams.search || "");

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    router.push("/products");
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft p-6 space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Ara
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && updateFilters("search", search)}
            placeholder="Ürün ara..."
            className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Kategori
        </label>
        <div className="space-y-2">
          <button
            onClick={() => updateFilters("category", "")}
            className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${
              !currentParams.category
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
          >
            Tümü
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters("category", cat.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                currentParams.category === cat.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Fiyat Aralığı
        </label>
        <div className="space-y-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min ₺"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max ₺"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
          />
          <button
            onClick={handlePriceFilter}
            className="w-full btn-primary"
          >
            Filtrele
          </button>
        </div>
      </div>

      {/* Clear Filters */}
      {(currentParams.category || currentParams.minPrice || currentParams.maxPrice || currentParams.search) && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Filtreleri Temizle
        </button>
      )}
    </div>
  );
}