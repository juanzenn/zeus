import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Zeus Polls",
  description: "Zeus Polls is a free and open source polling platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />

        <main className="h-full">{children}</main>

        <nav className="h-[50px]">Hola</nav>
      </body>
    </html>
  );
}
