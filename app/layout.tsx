import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";

// Fonts configuration
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export { inter, poppins };

// Metadata for the app
export const metadata: Metadata = {
  title: "Platform Soja",
  description: "",
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body className={`${inter.className} ${poppins.className}`}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
