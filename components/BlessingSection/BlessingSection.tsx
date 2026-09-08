"use client";

import { WeddingCrest } from "@/components/WeddingCrest/WeddingCrest";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import styles from "./BlessingSection.module.css";

interface BlessingSectionProps {
  isVisible: boolean;
}

export function BlessingSection({ isVisible }: BlessingSectionProps) {
  const { dict } = useLanguage();

  return (
    <section
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
      aria-label={dict.blessing.heading}
    >
      <p className={styles.eyebrow}>{dict.blessing.heading}</p>

      <div className={styles.crestFrame} aria-hidden="true">
        <WeddingCrest className={styles.crest} />
      </div>

      <blockquote className={styles.prayer}>{dict.blessing.prayer}</blockquote>
      <span className={styles.divider} aria-hidden="true" />
      <p className={styles.message}>{dict.blessing.message}</p>
    </section>
  );
}
