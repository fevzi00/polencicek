// src/app/account/addresses/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Address = {
  id: string;
  title: string | null;
  receiver: string | null;
  phone: string | null;
  city: string | null;
  district: string | null;
  postal_code: string | null;
  line1: string | null;
  line2: string | null;
};

export default function AccountAddressesPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [list, setList] = useState<Address[]>([]);
  const [saving, setSaving] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [receiver, setReceiver] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postal, setPostal] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  async function load() {
    const { data } = await supabase.auth.getSession();
    const u = data.session?.user;
    if (!u) return;
    setEmail(u.email ?? null);

    const res = await fetch("/api/addresses", { credentials: "include" });
    const json = await res.json();
    if (json.ok) setList(json.data as Address[]);
    else console.error("Adresler yüklenemedi:", json.message);
  }

  useEffect(() => {
    load();
    const sub = supabase.auth.onAuthStateChange(() => load());
    return () => sub.data.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addAddress(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      const body = {
        title: title.trim() || null,
        receiver: receiver.trim() || null,
        phone: phone.trim() || null,
        city: city.trim() || null,
        district: district.trim() || null,
        postal_code: postal.trim() || null,
        line1: line1.trim() || null,
        line2: line2.trim() || null,
      };

      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.message || "Adres eklenemedi");

      // formu temizle & listeye ekle
      setTitle(""); setReceiver(""); setPhone(""); setCity("");
      setDistrict(""); setPostal(""); setLine1(""); setLine2("");

      setList(prev => [{
        id: json.data.id,
        ...body,
      } as Address, ...prev]);
    } catch (err: any) {
      alert("Adres eklenemedi: " + (err?.message ?? "Bilinmeyen hata"));
    } finally {
      setSaving(false);
    }
  }

  if (!email) {
    return (
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Adreslerim</h1>
        <p>Devam etmek için lütfen giriş yapın.</p>
      </main>
    );
  }

  return (
    <main className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Adreslerim</h1>

      <section className="card">
        <h2 className="font-semibold mb-3">Yeni Adres</h2>
        <form onSubmit={addAddress} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm muted block mb-1">Başlık</label>
            <input className="field w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-sm muted block mb-1">Alıcı Ad Soyad</label>
            <input className="field w-full" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
          </div>
          <div>
            <label className="text-sm muted block mb-1">Telefon</label>
            <input className="field w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="text-sm muted block mb-1">Şehir</label>
            <input className="field w-full" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label className="text-sm muted block mb-1">İlçe</label>
            <input className="field w-full" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
          <div>
            <label className="text-sm muted block mb-1">Posta Kodu</label>
            <input className="field w-full" value={postal} onChange={(e) => setPostal(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm muted block mb-1">Adres Satırı 1</label>
            <input className="field w-full" value={line1} onChange={(e) => setLine1(e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm muted block mb-1">Adres Satırı 2</label>
            <input className="field w-full" value={line2} onChange={(e) => setLine2(e.target.value)} />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button className="btn btn-primary" disabled={saving}>
              {saving ? "Kaydediliyor…" : "Adres Ekle"}
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-3">Kayıtlı Adresler</h2>
        {list.length === 0 ? (
          <div className="text-sm muted">Henüz adres eklenmemiş.</div>
        ) : (
          <ul className="space-y-2">
            {list.map((a) => (
              <li key={a.id} className="border border-white/10 rounded-xl p-3">
                <div className="font-medium">{a.title ?? "Adres"}</div>
                <div className="text-sm muted">
                  {a.receiver} • {a.phone}<br />
                  {a.line1}{a.line2 ? `, ${a.line2}` : ""}<br />
                  {a.district} / {a.city} {a.postal_code ? `(${a.postal_code})` : ""}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
