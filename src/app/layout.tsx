import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/shared/components/layout/Header";
import { Footer } from "@/shared/components/layout/Footer";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { siteConfig } from "@/core/config/site.config";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Xịt Thơm Quần Áo Thiên Nhiên 30ml | Mộc Hương — Lưu Hương & Khử Mùi",
    template: `%s | Xịt Thơm Quần Áo Mộc Hương`,
  },
  description:
    "Mộc Hương chuyên xịt thơm quần áo và phòng chiết xuất 100% tinh dầu thiên nhiên 30ml. Khử mùi ẩm mốc, kháng khuẩn tự nhiên, lưu hương thảo mộc thanh khiết suốt cả ngày dài.",
  keywords: [
    "xịt thơm quần áo",
    "xịt thơm quần áo thiên nhiên",
    "xịt thơm quần áo lưu hương lâu",
    "xịt thơm phòng",
    "xịt thơm vải thảo mộc",
    "xịt thơm khử mùi ẩm mốc",
    "Mộc Hương",
    "tinh dầu thiên nhiên 30ml",
  ],
  authors: [{ name: "Mộc Hương Nature" }],
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Xịt Thơm Quần Áo Thiên Nhiên 30ml | Mộc Hương — Lưu Hương Tự Nhiên",
    description:
      "Khám phá 18 nốt hương xịt thơm quần áo chiết xuất 100% tinh dầu thiên nhiên giúp trang phục luôn thơm ngát, khử mùi ẩm mốc hiệu quả và an toàn cho làn da.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-cream text-ink antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
