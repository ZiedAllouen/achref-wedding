import type { ReactNode } from "react";
import styles from "./ArchFrame.module.css";

type ArchFrameProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Gold double-line arch with a small finial, as on the printed card.
 * The head is an SVG that keeps its proportions; the side rails continue
 * down beside the content and fade out.
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
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M0.65 96V78C0.65 50 60 46 120 34C160 26 186 20 200 12C214 20 240 26 280 34C340 46 399.35 50 399.35 78V96"
            strokeWidth="1.3"
          />
          <path
            d="M10.65 96V80C10.65 58 66 54 124 42C162 34 188 28 200 22C212 28 238 34 276 42C334 54 389.35 58 389.35 80V96"
            strokeWidth="1"
            opacity="0.62"
          />
          <path d="M200 12V6" strokeWidth="1.1" />
          <path
            d="M200 1.4l2.6 2.6-2.6 2.6-2.6-2.6Z"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.55"
          />
        </g>
      </svg>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
