// src/app/account/orders/[id]/page.tsx
import { serverSupabase } from "@/lib/supabase/server";
import { statusText, type OrderStatus } from "@/lib/order/status";

export const dynamic = "force-dynamic";

export default async function OrderDetail({ params }: { params: { id: string } }) {
  const supabase = serverSupabase();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      id, created_at, status, delivery_date, delivery_time, note, address_id,
      order_items (
        id, qty, quantity, price, product_id,
        products ( title, slug, images )
      )
    `)
    .eq("id", params.id)
    .single();

  if (error || !order) {
    return (
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Sipariş</h1>
        <p>Bu sipariş bulunamadı.</p>
      </main>
    );
  }

  const { data: address } = await supabase
    .from("addresses")
    .select("title, receiver, phone, city, district, postal_code, line1, line2")
    .eq("id", order.address_id)
    .single();

  const total = (order.order_items ?? []).reduce(
    (s: number, it: any) => s + (it.qty ?? it.quantity ?? 0) * (it.price ?? 0),
    0
  );
  const status = statusText(order.status as OrderStatus);

  return (
    <main className="container py-6 space-y-4">
      <h1 className="text-2xl font-bold">
        Sipariş #{String(order.id).slice(0, 8).toUpperCase()}
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Ürünler */}
        <section className="md:col-span-2 card">
          <h2 className="font-semibold mb-2">Ürünler</h2>
          <div className="space-y-2">
            {order.order_items?.map((it: any) => (
              <div key={it.id} className="flex items-center justify-between border border-white/10 rounded-xl p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-16 h-16 bg-black/20 rounded overflow-hidden shrink-0">
                    {it.products?.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.products.images[0]}
                        alt={it.products.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="truncate">
                    <div className="font-medium truncate">{it.products?.title}</div>
                    <div className="text-sm muted">
                      Adet: {it.qty ?? it.quantity ?? 0}
                    </div>
                  </div>
                </div>
                <div className="font-semibold shrink-0">₺{it.price ?? 0}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Özet + Adres */}
        <section className="card space-y-2">
          <div>
            <div className="text-sm muted">Durum</div>
            <div className="font-semibold">{status}</div>
          </div>
          <div>
            <div className="text-sm muted">Toplam</div>
            <div className="font-semibold">₺{total}</div>
          </div>
          {(order.delivery_date || order.delivery_time) && (
            <div>
              <div className="text-sm muted">Teslim</div>
              <div>
                {order.delivery_date ?? "-"} {order.delivery_time ? `• ${order.delivery_time}` : ""}
              </div>
            </div>
          )}
          {order.note && (
            <div>
              <div className="text-sm muted">Not</div>
              <div>{order.note}</div>
            </div>
          )}

          {address && (
            <div className="mt-2">
              <h3 className="font-semibold">Teslimat Adresi</h3>
              <div className="text-sm muted">
                {address.title ? `${address.title} • ` : ""}
                {address.receiver}<br />
                {address.phone}<br />
                {address.line1}{address.line2 ? `, ${address.line2}` : ""}<br />
                {address.district} / {address.city} {address.postal_code ? `(${address.postal_code})` : ""}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
