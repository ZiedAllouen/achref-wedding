import { useLanguage } from "@/lib/i18n/LanguageContext";
import { FloralDecoration } from "@/components/FloralDecoration/FloralDecoration";
import styles from "./ClosingMessage.module.css";

export function ClosingMessage({ isVisible }: { isVisible: boolean }) {
  const { dict } = useLanguage();

  return (
    <section
      className={`${styles.closing} ${isVisible ? styles.visible : ""}`}
      aria-label="closing"
    >
      <FloralDecoration corner="bottom-left" parallaxFactor={-0.01} swayDelay={0.2} />
      <FloralDecoration corner="bottom-right" parallaxFactor={0.012} swayDelay={0.7} />
      <span className={styles.flourish} aria-hidden="true" />
      <p className={styles.message}>{dict.closing.message}</p>
    </section>
  );
}
