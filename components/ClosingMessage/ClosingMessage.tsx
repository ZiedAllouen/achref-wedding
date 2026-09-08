import { FlourishHeart } from "@/components/Ornaments/Ornaments";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import styles from "./ClosingMessage.module.css";

export function ClosingMessage() {
  const { dict } = useLanguage();

  return (
    <section className={styles.closing} aria-label="closing">
      <FlourishHeart width="7rem" />
      <p className="t-display-closing">{dict.closing.message}</p>
    </section>
  );
}
