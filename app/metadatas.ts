// app/metadata.ts
import type { Metadata } from "next";

// Metadata for the app
export const metadata: Metadata = {
  title: "Platform Soja",
  description: "Une plateforme dédiée à l'agriculture et à la culture du soja.",
  keywords: ["soja", "agriculture", "plateforme"], // Ajoute des mots-clés si nécessaire
  authors: [{ name: "Nom de l'Auteur", url: "https://site-auteur.com" }], // Ajoute des informations sur l'auteur si nécessaire
  openGraph: {
    title: "Platform Soja",
    description: "Une plateforme dédiée à l'agriculture et à la culture du soja.",
    url: "https://www.platformsoja.com",
    siteName: "Platform Soja",
    images: [
      {
        url: "https://www.platformsoja.com/image.png",
        width: 800,
        height: 600,
        alt: "Une image de la plateforme",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Soja",
    description: "Une plateforme dédiée à l'agriculture et à la culture du soja.",
    images: ["https://www.platformsoja.com/image.png"],
  },
};
