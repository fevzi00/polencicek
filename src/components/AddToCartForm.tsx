'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

interface AddToCartFormProps {
  product: {
    id: string;
    slug: string;
    title: string;
    price: number;
    image?: string;
  };
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    setIsAdding(true);
    
    addItem(
      {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        images: product.image ? [product.image] : undefined,
      },
      quantity
    );

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      router.push('/cart');
    }, 300);
  };

  return (
    <div className="space-y-4">
      {/* Miktar Seçici */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Miktar
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-brand-600 transition-colors flex items-center justify-center font-bold text-lg"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-brand-600 focus:outline-none"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-brand-600 transition-colors flex items-center justify-center font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Toplam Fiyat */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Toplam:</span>
          <span className="text-2xl font-bold text-brand-600">
            ₺{(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Butonlar */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex-1 bg-white border-2 border-brand-600 text-brand-600 py-3 rounded-xl font-medium hover:bg-brand-50 transition-colors disabled:opacity-50"
        >
          {isAdding ? '✓ Eklendi!' : 'Sepete Ekle'}
        </button>
        
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-medium hover:bg-brand-700 transition-colors"
        >
          Hemen Al
        </button>
      </div>
    </div>
  );
}