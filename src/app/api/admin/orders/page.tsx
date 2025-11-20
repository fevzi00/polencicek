// src/app/admin/orders/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

type OrderStatus = "pending" | "preparing" | "shipped" | "delivered" | "cancelled";

type Item = { qty: number | null; price: number | null };
type Row = {
  id: string;
  created_at: string;
  status: OrderStatus;
  delivery_date: string | null;
  delivery_time: string | null;
  note: string | null;
  address_id: string | null;
  user_id: string | null;
  order_items: Item[] | null;
};

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const h: Record<string, string> = {};
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "sipariş alındı" },
  { value: "preparing", label: "hazırlanıyor" },
  { value: "shipped", label: "kurye yolda" },
  { value: "delivered", label: "teslim edildi" },
  { value: "cancelled", label: "iptal edildi" },
];

function calcTotal(o: Row) {
  return (o.order_items ?? []).reduce((sum, it) => {
    const q = it.qty ?? 0;
    const p = it.price ?? 0;
    return sum + q * p;
  }, 0);
}

export default function AdminOrders() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const headers = await authHeaders();
    const res = await fetch("/api/admin/orders", { headers });
    const json = await res.json();
    setLoading(false);
    if (!json.ok) return alert("Hata: " + json.message);
    setRows(json.data as Row[]);
  }

  async function updateStatus(id: string, status: OrderStatus) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(await authHeaders()),
    };
    const res = await fetch(`/api/admin/orders?id=${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!json.ok) return alert("Hata: " + json.message);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="container p-6 space-y-4">
      <h1 className="text-2xl font-bold">Siparişler</h1>
      {loading && <div className="text-sm text-mute">Yükleniyor...</div>}

      <div className="space-y-3">
        {rows.map((o) => (
          <div key={o.id} className="card">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-semibold truncate">#{o.id.slice(0, 8).toUpperCase()}</div>
                <div className="text-sm muted">
                  {new Date(o.created_at).toLocaleString("tr-TR")}
                </div>
              </div>

              <div className="hidden md:block text-sm muted">
                {o.address_id ? `Adres ID: ${o.address_id.slice(0, 8).toUpperCase()}` : "Adres yok"}
              </div>

              <div className="text-right">
                <div className="font-semibold">₺{calcTotal(o)}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="text-sm muted">Durum</label>
              <select
                className="field w-56"
                value={o.status}
                onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <Link
                href={`/account/orders/${o.id}`}
                target="_blank"
                className="btn btn-ghost text-sm"
              >
                Kullanıcı görünümü
              </Link>

              {(o.delivery_date || o.delivery_time) && (
                <div className="text-sm muted">
                  Teslim: {o.delivery_date ?? "-"} {o.delivery_time ? `• ${o.delivery_time}` : ""}
                </div>
              )}
            </div>

            {o.note && <div className="text-sm mt-2">Not: {o.note}</div>}
          </div>
        ))}

        {rows.length === 0 && !loading && <div>Henüz sipariş yok.</div>}
      </div>
    </main>
  );
}
