"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clientSupabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isValidLink, setIsValidLink] = useState(false);

  useEffect(() => {
    // URL'den hash kontrol et
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    const accessToken = hashParams.get("access_token");
    
    if (type === "recovery" && accessToken) {
      setIsValidLink(true);
    } else {
      setMessage({ type: "error", text: "Geçersiz veya süresi dolmuş bağlantı." });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Şifreler eşleşmiyor!" });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: "error", text: "Şifre en az 6 karakter olmalıdır!" });
      return;
    }

    setLoading(true);

    const supabase = clientSupabase();
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setMessage({ type: "success", text: "✅ Şifreniz başarıyla değiştirildi!" });
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
  };

  if (!isValidLink && !message) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50/30 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Yeni Şifre Belirle</h1>
              <p className="text-slate-600">Lütfen yeni şifrenizi girin.</p>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-xl ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border-2 border-green-200"
                    : "bg-red-50 text-red-800 border-2 border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <svg 
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      message.type === "success" ? "text-green-600" : "text-red-600"
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {message.type === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <p className="text-sm font-medium">{message.text}</p>
                </div>
              </div>
            )}

            {isValidLink && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Yeni Şifre *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    style={{ color: '#000000' }}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                    placeholder="En az 6 karakter"
                  />
                  <p className="text-xs text-slate-500 mt-1">Şifreniz en az 6 karakter içermelidir</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Yeni Şifre (Tekrar) *
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    style={{ color: '#000000' }}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors"
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Şifre Güncelleniyor...
                    </>
                  ) : (
                    "Şifreyi Güncelle"
                  )}
                </button>
              </form>
            )}

            {!isValidLink && (
              <div className="text-center">
                <p className="text-slate-600 mb-6">
                  Bağlantınız geçersiz veya süresi dolmuş. Lütfen yeni bir şifre sıfırlama talebi oluşturun.
                </p>
                
                  href="/auth/forgot-password"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                
                  Yeni Talep Oluştur
                
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}