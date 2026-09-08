"use client";

import { startTransition, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n/types";
import styles from "./LanguageSwitcher.module.css";

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
];

export function LanguageSwitcher() {
  const { lang, setLang, dir, dict } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = dict.meta.title;
  }, [dict.meta.title, dir, lang]);

  return (
    <div className={styles.switcher} role="group" aria-label={dict.languageSwitcher.label}>
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={code === lang ? styles.active : styles.button}
          onClick={() => startTransition(() => setLang(code))}
          aria-pressed={code === lang}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
