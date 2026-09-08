import type { Metadata } from "next";
import { Katibeh, Scheherazade_New, EB_Garamond } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import ar from "@/lib/i18n/dictionaries/ar.json";
import "./globals.css";

const katibeh = Katibeh({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-katibeh",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});

const garamond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
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
      className={`${katibeh.variable} ${scheherazade.variable} ${garamond.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
