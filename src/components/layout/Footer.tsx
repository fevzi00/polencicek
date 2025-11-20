import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center text-2xl">
                &#127800;
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Polen Çiçek
                </h3>
                <p className="text-sm text-gray-400">Şehrin Çiçekçisi</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              2011'den beri Konya Ereğli'de taze ve kaliteli çiçeklerle özel anlarınızı unutulmaz kılıyoruz.
            </p>
            
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com/polencicek.eregli" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-500 flex items-center justify-center transition-all">
                <span className="text-lg">📷</span>
              </a>
              <a href="https://facebook.com/paris.cicek" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-500 flex items-center justify-center transition-all">
                <span className="text-lg">f</span>
              </a>
              <a href="https://wa.me/905456726317" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center transition-all">
                <span className="text-lg">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Hızlı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  SSS
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Kategoriler</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Buketler
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Aranjmanlar
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Orkideler
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Özel Tasarımlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">İletişim</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <div className="font-medium text-white mb-1">Telefon</div>
                <a href="tel:05456726317" className="hover:text-purple-400 transition-colors">
                  0545 672 63 17
                </a>
              </li>
              <li>
                <div className="font-medium text-white mb-1">Adres</div>
                <p className="leading-relaxed">
                  Hacı Mütahir mah<br />
                  Dr. Rauf Denktaş Cd. No:5<br />
                  42320 Ereğli/Konya
                </p>
              </li>
              <li>
                <div className="font-medium text-white mb-1">Çalışma Saatleri</div>
                <p>Haftanın Her Günü: 09:00 - 19:00</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>
              &copy; {currentYear} Polen Çiçek. Tüm hakları saklıdır.
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors">
                SSS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}