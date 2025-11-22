"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { clientSupabase } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get("type");
      const accessToken = hashParams.get("access_token");

      if (type === "signup" && accessToken) {
        const supabase = clientSupabase();
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: hashParams.get("refresh_token") || "",
        });

        if (error) {
          setStatus("error");
          setMessage("E-posta doğrulama başarısız oldu.");
        } else {
          setStatus("success");
          setMessage("E-posta adresiniz başarıyla doğrulandı!");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      } else {
        setStatus("error");
        setMessage("Geçersiz doğrulama bağlantısı.");
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">E-posta Doğrulanıyor...</h1>
              <p className="text-slate-600">Lütfen bekleyin.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Başarılı!</h1>
              <p className="text-slate-600 mb-6">{message}</p>
              <p className="text-sm text-slate-500">Anasayfaya yönlendiriliyorsunuz...</p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Hata!</h1>
              <p className="text-slate-600 mb-6">{message}</p>
              <Link href="/auth/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Giriş Sayfasına Dön →
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}