"use client";

import { Inter } from "next/font/google";
import { MainNav } from "@/components/MainNav";
import Footer from "@/components/Footer";
import Body from "@/components/Body";
import { Providers } from "@/app/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Body className={`${inter.className} font-sans flex flex-col min-h-screen`}>
        <Providers>
          <MainNav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </Body>
    </html>
  );
}
