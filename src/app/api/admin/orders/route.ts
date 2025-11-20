// src/app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/check";

type OrderStatus = "pending" | "preparing" | "shipped" | "delivered" | "cancelled";

export async function GET(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) {
    return NextResponse.json({ ok: false, message: r.message }, { status: 401 });
  }

  // İlişkisiz, ama kalemleri komple getiriyoruz (qty veya quantity hangisiyse gelsin)
  const { data, error } = await r.adminClient
    .from("orders")
    .select(`
      id, created_at, status, delivery_date, delivery_time, note, address_id, user_id,
      order_items (*)
    `)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

export async function PUT(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) {
    return NextResponse.json({ ok: false, message: r.message }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, message: "id required" }, { status: 400 });

  const body = await req.json();
  const status = body?.status as OrderStatus | undefined;
  if (!status) return NextResponse.json({ ok: false, message: "status required" }, { status: 400 });

  const { error } = await r.adminClient.from("orders").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
