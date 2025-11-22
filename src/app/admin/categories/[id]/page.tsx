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
  const [formData, setFormData] = useState({
    name: "",
    icon: "🌸",
    display_order: 1,
  });

  const emojiOptions = ["🌸", "💐", "🌹", "🌺", "🌻", "🌷", "🪴", "🌿", "🍀", "🌾"];

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
      setFormData({
        name: data.name || "",
        icon: data.icon || "🌸",
        display_order: data.display_order || 1,
      });
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = formData.name
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
        name: formData.name,
        slug: slug,
        icon: formData.icon,
        display_order: formData.display_order,
      })
      .eq("id", categoryId);

    if (error) {
      alert("❌ Hata: " + error.message);
      setSaving(false);
    } else {
      alert("✅ Kategori başarıyla güncellendi!");
      router.push("/admin/categories");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin/categories" className="hover:text-purple-600">
          Kategoriler
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Düzenle</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temel Bilgiler */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Temel Bilgiler
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Kategori Adı *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ color: '#000000' }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="Örn: Buketler"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Sıralama Numarası
              </label>
              <input
                type="number"
                min="1"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                style={{ color: '#000000' }}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                placeholder="1"
              />
              <p className="text-sm text-slate-500 mt-2">
                Kategoriler bu sayıya göre sıralanır (küçükten büyüğe)
              </p>
            </div>
          </div>
        </div>

        {/* İkon Seçimi */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            İkon
          </h3>

          <div className="mb-4">
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
              <span className="text-4xl">{formData.icon}</span>
              <div>
                <div className="font-semibold text-slate-900">Seçili İkon</div>
                <div className="text-sm text-slate-600">Aşağıdan farklı bir ikon seçebilirsiniz</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setFormData({ ...formData, icon: emoji })}
                className={`p-3 text-2xl rounded-lg transition-all ${
                  formData.icon === emoji
                    ? "bg-purple-100 ring-2 ring-purple-500 scale-110"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Önizleme */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Önizleme
          </h3>

          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-white rounded-lg border-2 border-slate-200">
              <span className="text-2xl">{formData.icon}</span>
              <div>
                <div className="font-semibold text-slate-900">{formData.name || "Kategori Adı"}</div>
                <div className="text-xs text-slate-500">
                  Sıra: {formData.display_order}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-4">
          <Link href="/admin/categories" className="flex-1">
            <button
              type="button"
              className="w-full px-6 py-4 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold"
            >
              İptal
            </button>
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Kaydediliyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Değişiklikleri Kaydet
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}