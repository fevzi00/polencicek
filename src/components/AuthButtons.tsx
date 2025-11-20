// src/components/AuthButtons.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function AuthButtons() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // 1) ilk load: mevcut session
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
    });

    // 2) giriş/çıkış olduğunda tetiklenir
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!email) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/auth/login" className="hover:underline">Giriş</Link>
        <Link href="/auth/register" className="hover:underline">Kayıt ol</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-mute hidden sm:inline">{email}</span>
      <Link href="/account/addresses" className="hover:underline">Hesabım</Link>
      <Link href="/account/orders" className="hover:underline">Siparişlerim</Link>
     
      <button
        className="text-sm hover:underline"
        onClick={async () => {
          await supabase.auth.signOut();
          location.reload(); // header'ı kesin yenile
        }}
      >
        Çıkış
      </button>
    </div>
  );
}
