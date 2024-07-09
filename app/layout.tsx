import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
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
      <body>
        <Header />
        <main className="mt-[30px] mb-[100px] md:mb-[120px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
