"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  stock: number | null;
  is_featured?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      slug: product.slug,
    });
  };

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
          
          {/* Stok Badge */}
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
          
          {/* Popüler Badge */}
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
          <button
            onClick={handleAddToCart}
            disabled={!product.stock || product.stock === 0}
            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
  );
}