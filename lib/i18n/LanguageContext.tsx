"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Dictionary, Lang } from "./types";
import en from "./dictionaries/en.json";
import fr from "./dictionaries/fr.json";
import ar from "./dictionaries/ar.json";

const dictionaries: Record<Lang, Dictionary> = {
  en: en as Dictionary,
  fr: fr as Dictionary,
  ar: ar as Dictionary,
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dict: Dictionary;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      dict: dictionaries[lang],
      dir: lang === "ar" ? "rtl" : "ltr",
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
