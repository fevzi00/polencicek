import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📦 Sipariş verisi:", body);

    // 1. Sipariş oluştur
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: null,
        address_id: null,
        total_amount: body.total_amount,
        status: "pending",
        payment_status: "unpaid",
        notes: `
Müşteri: ${body.customer_name}
Email: ${body.customer_email}
Telefon: ${body.customer_phone}
Adres: ${body.delivery_address}
${body.notes ? `\nSipariş Notu: ${body.notes}` : ''}
        `.trim(),
      })
      .select()
      .single();

    if (orderError) {
      console.error("❌ Sipariş hatası:", orderError);
      return NextResponse.json(
        { error: orderError.message },
        { status: 500 }
      );
    }

    console.log("✅ Sipariş oluşturuldu:", order.id);

    // 2. Sipariş ürünlerini ekle
    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.price, // ✅ unit_price olarak düzeltildi
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("❌ Ürünler hatası:", itemsError);
      return NextResponse.json(
        { error: itemsError.message },
        { status: 500 }
      );
    }

    console.log("✅ Sipariş tamamlandı!");

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error("❌ API Hatası:", error);
    return NextResponse.json(
      { error: error.message || "Bilinmeyen hata" },
      { status: 500 }
    );
  }
}
