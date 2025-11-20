"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  stock: number | null;
  category_id: string | null;
}

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      slug: product.slug,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16">
      {/* Sol - Resim Galerisi */}
      <div className="space-y-4">
        {/* Ana Resim */}
        <div className="rounded-xl overflow-hidden bg-slate-50 aspect-square border border-slate-200">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">
              🌸
            </div>
          )}
        </div>

        {/* Thumbnail'ler */}
        {product.images && product.images.length > 1 && (
          <div className="grid grid-cols-5 gap-3">
            {product.images.slice(0, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden aspect-square border transition-all ${
                  selectedImage === index
                    ? "border-purple-600 ring-2 ring-purple-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sağ - Ürün Bilgileri */}
      <div className="flex flex-col">
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          {product.title}
        </h1>

        {/* Fiyat & Stok */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold text-slate-900">
            ₺{product.price.toFixed(2)}
          </span>
          <span className="text-sm text-slate-500">KDV Dahil</span>
          
          {/* Stok Badge */}
          {product.stock !== null && (
            product.stock > 0 ? (
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                Stokta
              </span>
            ) : (
              <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
                Tükendi
              </span>
            )
          )}
        </div>

        {/* Ayırıcı */}
        <div className="border-t border-slate-200 my-6"></div>

        {/* Açıklama */}
        {product.description && (
          <div className="mb-6">
            <p className="text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* Miktar Seçici */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Miktar
          </label>
          <div className="inline-flex items-center border border-slate-300 rounded-lg">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-6 py-2 font-semibold text-slate-900 min-w-[60px] text-center border-x border-slate-300">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock || 999, q + 1))}
              className="px-4 py-2 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ara Toplam */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <span className="text-slate-600">Ara Toplam</span>
          <span className="font-bold text-slate-900 text-lg">
            ₺{(product.price * quantity).toFixed(2)}
          </span>
        </div>

        {/* Butonlar */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleAddToCart}
            disabled={!product.stock || product.stock === 0}
            className="w-full bg-slate-900 text-white py-3.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Sepete Ekle
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!product.stock || product.stock === 0}
            className="w-full bg-purple-600 text-white py-3.5 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hemen Satın Al
          </button>
        </div>

        {/* Özellikler */}
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-slate-600">Ereğli içi ücretsiz teslimat</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-slate-600">Taze çiçek garantisi</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-slate-600">Aynı gün teslimat imkanı</span>
          </div>
        </div>

        {/* İletişim */}
        <div className="mt-auto pt-8">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Sorularınız için</p>
            <a href="tel:05456726317" className="text-slate-900 font-semibold hover:text-purple-600 transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0545 672 63 17
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}