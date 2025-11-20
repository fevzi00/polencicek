// src/app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/check";

/**
 * GET /api/admin/products
 * Ürünleri kategorileriyle birlikte listeler
 */
export async function GET(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) {
    return NextResponse.json({ ok: false, message: r.message }, { status: 401 });
  }

  // NOT: Aşağıdaki select, FK'ler kurulu olduğu için join yapar.
  // product_categories(categories(...)) => kategorileri getirir
  const { data, error } = await r.adminClient
    .from("products")
    .select(`
      id, title, slug, price, stock, is_active, created_at, description, images,
      product_categories (
        categories (
          id, name, slug
        )
      )
    `)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

/**
 * POST /api/admin/products
 * Body: { title, slug, price:number, stock?:number, is_active?:boolean, description?:string|null, images?:string[]|null, category_ids?: string[] }
 */
export async function POST(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) {
    return NextResponse.json({ ok: false, message: r.message }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, price, stock, is_active, description, images, category_ids } = body || {};
  if (!title || !slug || typeof price !== "number") {
    return NextResponse.json({ ok: false, message: "title, slug, price required" }, { status: 400 });
  }

  const { data: inserted, error } = await r.adminClient
    .from("products")
    .insert({
      title,
      slug,
      price,
      stock: stock ?? 0,
      is_active: is_active ?? true,
      description: description ?? null,
      images: Array.isArray(images) ? images : null,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  // Kategoriler
  if (Array.isArray(category_ids) && category_ids.length > 0) {
    const rows = category_ids.map((cid: string) => ({
      product_id: inserted.id,
      category_id: cid,
    }));
    const { error: mapErr } = await r.adminClient.from("product_categories").insert(rows);
    if (mapErr) return NextResponse.json({ ok: false, message: mapErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

/**
 * PUT /api/admin/products?id=<product_id>
 * Body: { title?, slug?, price?, stock?, is_active?, description?, images?, category_ids?: string[] }
 * - Alanlar gönderilmişse güncellenir
 * - category_ids gönderilmişse eşlemeler resetlenip yeniden yazılır
 * - "silme" yerine is_active=false yaparak pasifleştirme yapılır (1:A tercihin)
 */
export async function PUT(req: Request) {
  const r = await requireAdmin(req);
  if (!r.ok || !r.adminClient) {
    return NextResponse.json({ ok: false, message: r.message }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, message: "id required" }, { status: 400 });

  const body = await req.json();
  const patch: Record<string, any> = {};
  for (const k of ["title", "slug", "price", "stock", "is_active", "description"]) {
    if (k in body) patch[k] = body[k];
  }
  if ("images" in body) patch.images = Array.isArray(body.images) ? body.images : null;

  if (Object.keys(patch).length > 0) {
    const { error: updErr } = await r.adminClient.from("products").update(patch).eq("id", id);
    if (updErr) return NextResponse.json({ ok: false, message: updErr.message }, { status: 500 });
  }

  if (Array.isArray(body.category_ids)) {
    // önce mevcut eşlemeleri sil
    const { error: delErr } = await r.adminClient.from("product_categories").delete().eq("product_id", id);
    if (delErr) return NextResponse.json({ ok: false, message: delErr.message }, { status: 500 });

    if (body.category_ids.length > 0) {
      const rows = body.category_ids.map((cid: string) => ({ product_id: id, category_id: cid }));
      const { error: insErr } = await r.adminClient.from("product_categories").insert(rows);
      if (insErr) return NextResponse.json({ ok: false, message: insErr.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
