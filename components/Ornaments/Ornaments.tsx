import type { CSSProperties } from "react";
import styles from "./Ornaments.module.css";

/**
 * The card's own ornament vocabulary. Everything here is decorative
 * (aria-hidden) and drawn in the foil colour.
 */

type FlourishHeartProps = {
  /** CSS width of the flourish, e.g. "7rem" or "5rem". */
  width?: string;
  className?: string;
};

/** Two mirrored filigree curls meeting at a small heart. */
export function FlourishHeart({ width = "7rem", className }: FlourishHeartProps) {
  return (
    <svg
      className={`${styles.flourish} ${className ?? ""}`}
      style={{ width } as CSSProperties}
      viewBox="0 0 200 26"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* left curl */}
        <path d="M10 14c16-9 32-9 48-3c10 4 18 4 30 2" />
        <path d="M10 14c-3-3-1-8 3-7c3 1 3 5 0 6" />
        <path d="M46 10c4-4 10-4 14 0c-4 4-10 4-14 0Z" opacity="0.7" />
        {/* right curl (mirrored) */}
        <g transform="translate(200 0) scale(-1 1)">
          <path d="M10 14c16-9 32-9 48-3c10 4 18 4 30 2" />
          <path d="M10 14c-3-3-1-8 3-7c3 1 3 5 0 6" />
          <path d="M46 10c4-4 10-4 14 0c-4 4-10 4-14 0Z" opacity="0.7" />
        </g>
        {/* heart */}
        <path
          d="M100 20.5c-4.2-3.2-8-6.2-8-9.8a4 4 0 0 1 8-1.2a4 4 0 0 1 8 1.2c0 3.6-3.8 6.6-8 9.8Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
      </g>
    </svg>
  );
}

type Corner = "tl" | "tr" | "bl" | "br";

const CURL_FLIP: Record<Corner, string> = {
  tl: "scale(1, 1)",
  tr: "scale(-1, 1)",
  bl: "scale(1, -1)",
  br: "scale(-1, -1)",
};

function Curl({ corner }: { corner: Corner }) {
  return (
    <svg
      className={`${styles.curl} ${styles[corner]}`}
      style={{ transform: CURL_FLIP[corner] } as CSSProperties}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 37C3 20 12 8 33 3" />
        <path d="M33 3c-5 1-8 5-6 9c2 4 7 3 7-1" />
        <path d="M3 37c1-5 5-8 9-6c4 2 3 7-1 7" />
        <path d="M12 22c3-6 8-9 15-10" opacity="0.6" />
        <circle cx="20" cy="15" r="1.1" fill="currentColor" />
      </g>
    </svg>
  );
}

/** The four filigree curls that sit inside a panel's frame corners. */
export function CornerCurls() {
  return (
    <>
      <Curl corner="tl" />
      <Curl corner="tr" />
      <Curl corner="bl" />
      <Curl corner="br" />
    </>
  );
}

type PanelFrameProps = {
  className?: string;
};

/**
 * The double gold frame of a panel plus its corner curls. Position the
 * parent `relative`; the frame is absolute, inset by `--frame-inset`.
 */
export function PanelFrame({ className }: PanelFrameProps) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`} aria-hidden="true">
      <CornerCurls />
    </div>
  );
}
