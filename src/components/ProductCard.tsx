// src/components/ProductCard.tsx
type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  images?: string[];
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <a
      href={`/products/${p.slug}`}
      className="rounded-2xl border bg-white shadow-sm p-3 block hover:shadow-md transition"
    >
      <div className="aspect-square bg-gray-100 rounded-xl mb-2 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p.images?.[0] ? (
          <img
            src={p.images[0]}
            alt={p.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-mute text-sm">
            Görsel yok
          </div>
        )}
      </div>
      <div className="font-medium">{p.title}</div>
      <div className="text-sm text-mute">{p.price} ₺</div>
    </a>
  );
}
