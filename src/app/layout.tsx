import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Rhema Faith AG Church",
  description:
    "Welcome to Rhema Faith AG Church - A place of worship and community",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
