import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Amiri, Aref_Ruqaa } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import ar from "@/lib/i18n/dictionaries/ar.json";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-latin",
  weight: ["600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-body-latin",
  weight: ["400", "500", "600"],
});

const amiri = Amiri({
  subsets: ["arabic"],
  variable: "--font-heading-arabic",
  weight: ["400", "700"],
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  variable: "--font-display-arabic",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://achraf-molka.vercel.app"),
  title: ar.meta.title,
  description: ar.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${playfair.variable} ${cormorant.variable} ${amiri.variable} ${arefRuqaa.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
