import { MetadataRoute } from 'next';
import { clientSupabase } from '@/lib/supabase/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://polencicek.com';

  // Ürünleri çek
  const supabase = clientSupabase();
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true);

  // Kategorileri çek
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, created_at');

  // Statik sayfalar
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Ürün sayfaları
  const productRoutes = products?.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  // Kategori sayfaları
  const categoryRoutes = categories?.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(category.created_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  return [...routes, ...productRoutes, ...categoryRoutes];
}