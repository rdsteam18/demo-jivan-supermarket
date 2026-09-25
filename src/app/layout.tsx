import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCart from "@/components/cart/FloatingCart";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jivan Supermarket | Online Grocery Store (New Maninagar)",
  description:
    "Fast 12-minute grocery, dairy, and staples delivery from Jivan Supermarket in New Maninagar, Ahmedabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] text-[#1A1A1A] antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <FloatingCart />
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
