import { Metadata } from "next";
import { serverSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/product/ProductCard";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const supabase = serverSupabase();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  return {
    title: product.title,
    description: product.description || `${product.title} - ₺${product.price.toFixed(2)} - Polen Çiçek'ten taze çiçek siparişi verin.`,
    openGraph: {
      title: product.title,
      description: product.description || `${product.title} - Polen Çiçek`,
      images: product.images?.[0] ? [product.images[0]] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description || `${product.title} - Polen Çiçek`,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = serverSupabase();

  // Ürünü getir
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!product) {
    notFound();
  }

  // Benzer ürünler
  const { data: similarProducts } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .neq("id", product.id)
    .limit(4);

  return (
    <>
      {/* Structured Data (Product) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title,
            "description": product.description || product.title,
            "image": product.images?.[0] || "",
            "sku": product.id,
            "offers": {
              "@type": "Offer",
              "url": `https://polencicek.com/products/${product.slug}`,
              "priceCurrency": "TRY",
              "price": product.price,
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Organization",
                "name": "Polen Çiçek"
              }
            }
          })
        }}
      />

      <main className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <a href="/" className="hover:text-purple-600">Ana Sayfa</a>
              <span>/</span>
              <a href="/products" className="hover:text-purple-600">Ürünler</a>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{product.title}</span>
            </div>
          </div>

          {/* Ürün Detayı */}
          <ProductDetail product={product} />

          {/* Benzer Ürünler */}
          {similarProducts && similarProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Benzer Ürünler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}