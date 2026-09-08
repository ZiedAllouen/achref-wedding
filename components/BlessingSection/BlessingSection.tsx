import { FlourishHeart } from "@/components/Ornaments/Ornaments";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import styles from "./BlessingSection.module.css";

export function BlessingSection() {
  const { dict } = useLanguage();

  return (
    <section className={styles.section} aria-label={dict.blessing.heading}>
      <h2 className="t-heading">{dict.blessing.heading}</h2>
      <blockquote className="t-prayer">{dict.blessing.prayer}</blockquote>
      <FlourishHeart width="5rem" />
      <p className={`t-body ${styles.message}`}>{dict.blessing.message}</p>
    </section>
  );
}
