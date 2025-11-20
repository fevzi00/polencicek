"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const supabase = clientSupabase();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (data) {
      setName(data.name || "");
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const supabase = clientSupabase();
    const { error } = await supabase
      .from("categories")
      .update({
        name: name,
        slug: slug,
      })
      .eq("id", categoryId);

    if (error) {
      alert("Hata: " + error.message);
      setSaving(false);
    } else {
      router.push("/admin/categories");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Kategoriyi Düzenle</h1>
            <p className="text-slate-600">Kategori bilgilerini güncelleyin</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Kategori Adı *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none"
                placeholder="Örn: Buketler"
              />
            </div>

            <div className="flex gap-4">
              <Link href="/admin/categories" className="flex-1">
                <button type="button" className="w-full btn-secondary py-4">
                  İptal
                </button>
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 btn-primary py-4 disabled:opacity-50"
              >
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}