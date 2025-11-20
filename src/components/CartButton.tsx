// src/components/CartButton.tsx
"use client";
import Link from "next/link";
import { useCart } from "@/lib/store/cart";

export default function CartButton() {
  const count = useCart((s) => s.count);
  return (
    <Link href="/cart" className="relative hover:underline">
      Sepet
      {count > 0 && (
        <span className="ml-2 inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full bg-brand text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
