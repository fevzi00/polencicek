// src/lib/admin/check.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function requireAdmin(req: Request) {
  // Client -> Server: Authorization: Bearer <access_token>
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return { ok: false, message: "No token" };

  // Token'dan user çek (server tarafı, admin yetkisiyle)
  const admin = createClient(url, service, { auth: { persistSession: false } });
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return { ok: false, message: "Invalid token" };

  const email = (data.user.email || "").toLowerCase();
  const allow = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!allow.includes(email)) return { ok: false, message: "Not an admin" };

  return { ok: true, email, adminClient: admin };
}
