// src/app/api/addresses/route.ts
import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/supabase/server";

export async function GET() {
  const supabase = serverSupabase();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("id, title, receiver, phone, city, district, postal_code, line1, line2")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
  const supabase = serverSupabase();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const payload = {
    user_id: auth.user.id, // RLS için zorunlu
    title: (body.title ?? null),
    receiver: (body.receiver ?? null),
    phone: (body.phone ?? null),
    city: (body.city ?? null),
    district: (body.district ?? null),
    postal_code: (body.postal_code ?? null),
    line1: (body.line1 ?? null),
    line2: (body.line2 ?? null),
  };

  const { data, error } = await supabase
    .from("addresses")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message, details: error.details }, { status: 400 });
  }
  return NextResponse.json({ ok: true, data });
}
