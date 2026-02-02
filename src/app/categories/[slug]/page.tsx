import { serverSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Metadata } from "next";

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const supabase = serverSupabase();
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!category) {
    return {
      title: "Kategori Bulunamadı",
    };
  }

  return {
    title: category.name,
    description: `${category.name} kategorisindeki taze çiçek ürünlerimizi keşfedin. Polen Çiçek - Konya Ereğli`,
    openGraph: {
      title: `${category.name} - Polen Çiçek`,
      description: `${category.name} kategorisindeki ürünler`,
    },
  };
}
interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = serverSupabase();

  // Kategoriyi bul
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!category) {
    notFound();
  }

  // Bu kategorideki ürünleri bul
  const { data: productCategories } = await supabase
    .from("product_categories")
    .select("product_id")
    .eq("category_id", category.id);

  const productIds = productCategories?.map(pc => pc.product_id) || [];

  let products = [];
  if (productIds.length > 0) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds)
      .eq("is_active", true);
    
    products = data || [];
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-purple-600">Ürünler</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{category.name}</span>
          </div>
        </div>

        {/* Başlık */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">{category.name}</h1>
          <p className="text-xl text-slate-600">
            {products.length} ürün bulundu
          </p>
        </div>

        {/* Ürünler */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌸</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Bu kategoride henüz ürün yok
            </h2>
            <p className="text-slate-600 mb-6">
              Yakında yeni ürünler eklenecek
            </p>
            <Link href="/products">
              <button className="btn-primary px-8 py-3">
                Tüm Ürünleri Gör
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}