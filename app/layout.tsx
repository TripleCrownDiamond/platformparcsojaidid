"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getUserId } from "@/utils/userServices";
import { metadata } from "./metadatas"; // Vérifie l'importation ici

// Fonts configuration
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700", "900"] });

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const fetchedUserId = await getUserId();
      setUserId(fetchedUserId);
    };

    fetchUserId();
  }, []);

  return (
    <ClerkProvider localization={frFR} signInFallbackRedirectUrl="/dashboard" signUpFallbackRedirectUrl="/dashboard">
      <html lang="fr">
        <head>
          <title>{typeof metadata.title === 'string' ? metadata.title : "Titre par défaut"}</title>
          <meta name="description" content={typeof metadata.description === 'string' ? metadata.description : "Description par défaut"} />
          {/* Ajoute d'autres balises meta si nécessaire */}
        </head>
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <div className="flex-grow">
            <NavBar userId={userId} />
            <main>{children}</main>
          </div>
          <Footer userId={userId} />
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
