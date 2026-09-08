import type { CSSProperties } from "react";
import styles from "./FloralDecoration.module.css";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const orientationStyles: Record<Corner, { scaleX: string; scaleY: string }> = {
  "top-left": { scaleX: "1", scaleY: "1" },
  "top-right": { scaleX: "-1", scaleY: "1" },
  "bottom-left": { scaleX: "1", scaleY: "-1" },
  "bottom-right": { scaleX: "-1", scaleY: "-1" },
};

type FloralDecorationProps = {
  corner: Corner;
  parallaxFactor?: number;
  swayDelay?: number;
};

export function FloralDecoration({
  corner,
  parallaxFactor = 0.015,
  swayDelay = 0,
}: FloralDecorationProps) {
  const style = {
    "--scale-x": orientationStyles[corner].scaleX,
    "--scale-y": orientationStyles[corner].scaleY,
    "--parallax-factor": String(parallaxFactor),
    "--sway-delay": `${swayDelay}s`,
  } as CSSProperties;

  return (
    <svg
      className={`${styles.root} ${styles[corner]}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <g className={styles.inner}>
        <path
          d="M4 4c13 20 21 37 42 48 19 10 34 23 44 45"
          stroke="currentColor"
          strokeWidth="1.15"
        />
        <path
          d="M21 30c-8-1-13-7-14-15 8 0 14 6 14 15Zm12 14c2-9 8-14 17-15-1 9-7 14-17 15Zm19 15c-9 1-16-3-20-11 9-2 16 2 20 11Zm15 13c2-9 8-14 17-15-1 9-7 14-17 15Z"
          fill="rgba(146, 160, 126, 0.34)"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <path
          d="M37 13c4 2 7 6 6 11-5 0-9-2-11-6-2 4-5 7-10 7-1-5 1-9 5-12-4-2-6-6-5-11 5 0 9 2 11 6 2-4 5-7 10-7 1 5-1 9-6 12Z"
          fill="rgba(246, 239, 225, 0.96)"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <circle cx="33" cy="13" r="2.1" fill="rgba(164, 126, 73, 0.72)" />
        <circle cx="58" cy="63" r="1.8" fill="rgba(133, 146, 112, 0.7)" />
      </g>
    </svg>
  );
}
