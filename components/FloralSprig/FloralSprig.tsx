import type { CSSProperties } from "react";
import styles from "./FloralSprig.module.css";

type Side = "left" | "right";

const FLIP: Record<Side, number> = {
  left: 1,
  right: -1,
};

/* A five-petal blossom, tip pointing outward from the stem (origin at its base). */
const BLOSSOM_PETAL = "M0 0C-9-10-9-24 0-32C9-24 9-10 0 0Z";
const RING = [0, 72, 144, 216, 288];

function Blossom({ x, y, scale = 1, turn = 0 }: { x: number; y: number; scale?: number; turn?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${scale})`}>
      {RING.map((angle) => (
        <path key={angle} d={BLOSSOM_PETAL} className={styles.petal} transform={`rotate(${angle})`} />
      ))}
      <circle r="4" className={styles.heart} />
    </g>
  );
}

/* A slim pointed leaf, base at the origin, tip along +y. */
const SPRIG_LEAF = "M0 0C-8 10-8 24 0 34C8 24 8 10 0 0Z";

function SprigLeaf({
  x,
  y,
  rotate,
  scale = 1,
}: {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d={SPRIG_LEAF} className={styles.leaf} />
      <path d="M0 3V31" className={styles.vein} />
    </g>
  );
}

type FloralSprigProps = {
  /** Which side of its container the stem grows from; mirrors the artwork. */
  side?: Side;
  className?: string;
};

/**
 * A single watercolor-style sprig: a gently curved gold stem carrying two
 * small blossoms, a scatter of sage leaves, and a couple of accent dots.
 * Meant to sit along a section edge rather than anchor a whole corner the
 * way RoseCorner does.
 */
export function FloralSprig({ side = "left", className }: FloralSprigProps) {
  const flip = FLIP[side];
  const style = { "--flip-x": String(flip) } as CSSProperties;

  return (
    <svg
      className={`${styles.root} ${className ?? ""}`}
      viewBox="0 0 120 320"
      fill="none"
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M60 8C46 60 74 110 52 160C32 206 70 254 56 312"
        className={styles.stem}
      />

      <SprigLeaf x={52 - 22} y={70} rotate={-58} scale={0.85} />
      <SprigLeaf x={52 + 20} y={118} rotate={42} scale={1} />
      <SprigLeaf x={52 - 18} y={176} rotate={-36} scale={0.8} />
      <SprigLeaf x={52 + 16} y={230} rotate={50} scale={0.72} />
      <SprigLeaf x={52 - 14} y={268} rotate={-48} scale={0.65} />

      <Blossom x={62} y={40} scale={0.85} turn={-10} />
      <Blossom x={44} y={150} scale={0.62} turn={18} />

      <circle cx="70" cy="96" r="2.2" className={styles.spark} />
      <circle cx="34" cy="200" r="1.7" className={styles.spark} />
      <circle cx="66" cy="284" r="1.9" className={styles.spark} />
    </svg>
  );
}
