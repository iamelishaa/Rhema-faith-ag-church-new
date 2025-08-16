import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/MainNav";
import Footer from "@/components/Footer";
import Body from "@/components/Body";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rhema Faith AG Church",
  description:
    "Welcome to Rhema Faith AG Church - A place of worship and community",
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Body className={`${inter.className} font-sans flex flex-col min-h-screen`}>
        <MainNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </Body>
    </html>
  );
}
