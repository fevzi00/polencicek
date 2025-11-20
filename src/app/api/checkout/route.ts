// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// server-side Supabase (service role ile)
function serverSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // RLS'i baypas etmek için yalnızca sunucuda
    { auth: { persistSession: false } }
  );
}

type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  qty: number;
  image?: string;
  note?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerName,
      phone,
      city,
      district,
      postalCode,
      addressLine1,
      addressLine2,
      deliveryDate, // "YYYY-MM-DD"
      deliveryTime, // "HH:mm"
      items,        // CartItem[]
    }: {
      customerName: string;
      phone: string;
      city: string;
      district: string;
      postalCode?: string;
      addressLine1: string;
      addressLine2?: string;
      deliveryDate: string;
      deliveryTime: string;
      items: CartItem[];
    } = body;

    if (!items?.length) {
      return NextResponse.json({ ok: false, message: "Sepet boş." }, { status: 400 });
    }
    if (!customerName || !phone || !city || !district || !addressLine1 || !deliveryDate || !deliveryTime) {
      return NextResponse.json({ ok: false, message: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    // Teslim zamanını tek timestamptz'a çevir
    const delivery_at = new Date(`${deliveryDate}T${deliveryTime}:00`);

    const total_amount = items.reduce((a, b) => a + b.price * b.qty, 0);

    const supabase = serverSupabase();

    // 1) Address insert (misafir siparişi için user_id=null)
    const { data: addr, error: addrErr } = await supabase
      .from("addresses")
      .insert({
        user_id: null,
        title: "Teslimat",
        receiver: customerName,
        phone,
        city,
        district,
        postal_code: postalCode ?? null,
        line1: addressLine1,
        line2: addressLine2 ?? null,
      })
      .select("id")
      .single();

    if (addrErr || !addr) {
      return NextResponse.json({ ok: false, message: addrErr?.message ?? "Adres yazılamadı." }, { status: 500 });
    }

    // 2) Order insert
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: null, // giriş yokken null
        address_id: addr.id,
        total_amount,
        status: "pending",
        payment_status: "unpaid",
        delivery_at,
        notes: items.find((i) => i.note)?.note || null, // vitrin amaçlı tek not (detaylar item'larda)
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      return NextResponse.json({ ok: false, message: orderErr?.message ?? "Sipariş oluşturulamadı." }, { status: 500 });
    }

    // 3) Order items insert (çoklu)
    const rows = items.map((it) => ({
      order_id: order.id,
      product_id: it.id,
      quantity: it.qty,
      unit_price: it.price,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(rows);
    if (itemsErr) {
      return NextResponse.json({ ok: false, message: itemsErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e?.message ?? "Bilinmeyen hata" }, { status: 500 });
  }
}
