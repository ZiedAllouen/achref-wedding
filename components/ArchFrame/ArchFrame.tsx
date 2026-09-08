import type { ReactNode } from "react";
import styles from "./ArchFrame.module.css";

type ArchFrameProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The closed gold mihrab niche from the printed card: a double-line ogee
 * head with a small finial, straight double-line rails, and a closing
 * sill at the base. Filled with --paper-light so the verse sits on a
 * subtly raised panel.
 */
export function ArchFrame({ children, className }: ArchFrameProps) {
  return (
    <div className={`${styles.arch} ${className ?? ""}`}>
      <svg
        className={styles.head}
        viewBox="0 0 400 96"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0.65 95.5V78C0.65 50 60 46 120 34C160 26 186 20 200 12C214 20 240 26 280 34C340 46 399.35 50 399.35 78V95.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="var(--paper-light)"
        />
        <path
          d="M10.65 95.5V80C10.65 58 66 54 124 42C162 34 188 28 200 22C212 28 238 34 276 42C334 54 389.35 58 389.35 80V95.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.62"
        />
        <path d="M200 12V6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <path
          d="M200 1.4l2.6 2.6-2.6 2.6-2.6-2.6Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.55"
        />
      </svg>
      <div className={styles.body}>{children}</div>
      <div className={styles.sill} aria-hidden="true" />
    </div>
  );
}
