import { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "ConsoNum - Mesurez votre empreinte numérique",
  description: "Découvrez l'impact environnemental de vos habitudes digitales en 5 minutes. Conseils personnalisés pour un numérique plus responsable et écoresponsable.",
  keywords: ["empreinte numérique", "sobriété numérique", "impact environnemental", "digital responsable"],
  icons: {
    icon: '/logos/icon.png',
  },
  openGraph: {
    title: "ConsoNum - Mesurez votre empreinte numérique",
    description: "Découvrez l'impact de vos habitudes digitales",
    url: "https://consonum.fr",
    siteName: "ConsoNum",
    images: ['/images/og-home.jpg'],
    type: 'website',
  },
};