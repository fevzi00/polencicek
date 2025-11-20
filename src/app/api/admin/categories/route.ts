// src/app/api/admin/categories/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/check";

export async function GET(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) return NextResponse.json({ ok: false, message: r.message }, { status: 401 });

  const { data, error } = await r.adminClient.from("categories")
    .select("*").order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) return NextResponse.json({ ok: false, message: r.message }, { status: 401 });

  const body = await req.json();
  const { name, slug } = body || {};
  if (!name || !slug) return NextResponse.json({ ok: false, message: "name, slug required" }, { status: 400 });

  const { error } = await r.adminClient.from("categories").insert({ name, slug });
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) return NextResponse.json({ ok: false, message: r.message }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, message: "id required" }, { status: 400 });

  const { error } = await r.adminClient.from("categories").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
