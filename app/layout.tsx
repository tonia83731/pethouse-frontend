import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/navbar/Header";
import Footer from "@/components/common/Footer";
export const metadata: Metadata = {
  title: "PetHouse",
  description: "Give homeless pets a loving forever home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
