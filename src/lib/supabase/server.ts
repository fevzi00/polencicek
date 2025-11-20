// src/lib/supabase/server.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Server Component / Route Handler içinde kullanacağımız
 * basit Supabase client. (Anon key yeterli; cookies vs. gerekmiyor.)
 */
export function serverSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
