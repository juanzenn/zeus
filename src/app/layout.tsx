import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Zeus Polls",
  description: "Zeus Polls is a free and open source polling platform.",
  manifest: "/site.webmanifest",
  icons: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
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

        <>{children}</>

        <Footer />
      </body>

      <Toaster richColors position="bottom-left" theme="dark" />
    </html>
  );
}
