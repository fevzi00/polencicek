import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "Polen Çiçek - Konya Ereğli Çiçekçi | Online Çiçek Siparişi",
    template: "%s | Polen Çiçek"
  },
  description: "2011'den beri Konya Ereğli'de taze ve kaliteli çiçek teslimatı. Doğum günü, anneler günü, sevgililer günü çiçekleri. Hızlı teslimat, uygun fiyat.",
  keywords: ["çiçek", "çiçekçi", "Konya Ereğli çiçekçi", "online çiçek siparişi", "çiçek gönder", "Polen Çiçek"],
  authors: [{ name: "Polen Çiçek" }],
  creator: "Polen Çiçek",
  publisher: "Polen Çiçek",
  
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://polencicek.com",
    siteName: "Polen Çiçek",
    title: "Polen Çiçek - Konya Ereğli Çiçekçi | Online Çiçek Siparişi",
    description: "2011'den beri Konya Ereğli'de taze ve kaliteli çiçek teslimatı. Hızlı teslimat, uygun fiyat.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Polen Çiçek - Konya Ereğli Çiçekçi",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Polen Çiçek - Konya Ereğli Çiçekçi",
    description: "2011'den beri Konya Ereğli'de taze ve kaliteli çiçek teslimatı.",
    images: ["/android-chrome-512x512.png"],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Dancing Script - Mevcut */}
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
        {/* Great Vibes - İmza için ince el yazısı */}
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white">
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}