import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: {
    default: "Polen Çiçek - Konya Ereğli",
    template: "%s | Polen Çiçek"
  },
  description: "2011'den beri Konya Ereğli'de taze ve kaliteli çiçek teslimatı.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white">
        <Header />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}