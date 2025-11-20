"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CheckoutErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Ödeme işlemi başarısız oldu";

  return (
    <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-4">Ödeme Başarısız</h1>
          <p className="text-lg text-slate-600 mb-8">{message}</p>

          <div className="space-y-3">
            <Link href="/checkout">
              <button className="w-full btn-primary py-4">
                Tekrar Dene
              </button>
            </Link>
            <Link href="/cart">
              <button className="w-full btn-secondary py-4">
                Sepete Dön
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}