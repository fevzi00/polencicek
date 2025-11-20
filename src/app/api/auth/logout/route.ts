import { serverSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function POST() {
  const supabase = serverSupabase();
  await supabase.auth.signOut();
  redirect("/");
}