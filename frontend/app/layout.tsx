import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import CookieBanner from "@/components/ui/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConsoNum - Mesurez votre empreinte numérique",
  description: "Découvrez l'impact environnemental de vos habitudes digitales en 5 minutes. Conseils personnalisés pour un numérique plus responsable et écoresponsable.",
  keywords: ["empreinte numérique", "sobriété numérique", "impact environnemental", "digital responsable"],
  openGraph: {
    title: "ConsoNum - Mesurez votre empreinte numérique",
    description: "Découvrez l'impact de vos habitudes digitales",
    url: "https://consonum.fr",
    siteName: "ConsoNum",
    images: ['/images/og-home.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <CookieBanner/>
        </Providers>
      </body>
    </html>
  );
}
