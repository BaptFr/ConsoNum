import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/features/navigation/footer";

import CookieBanner from "@/components/ui/CookieBanner";
import { homeMetadata } from "./metadata"; 
const inter = Inter({ subsets: ["latin"] });

export const metadata = homeMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col">
            <Navbar />
              <main className="flex-1">
              {children}
              </main>
            <Footer />
          </div>
          <CookieBanner/>
        </Providers>
      </body>
    </html>
  );
}
