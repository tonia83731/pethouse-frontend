import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PetHouse",
  description:
    "給無家可歸的寵物一個充滿愛的永久家 Give homeless pets a loving forever home.",
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
