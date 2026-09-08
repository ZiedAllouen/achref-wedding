import type { CSSProperties } from "react";
import styles from "./RoseCorner.module.css";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const FLIP: Record<Corner, { x: number; y: number }> = {
  "top-left": { x: 1, y: 1 },
  "top-right": { x: -1, y: 1 },
  "bottom-left": { x: 1, y: -1 },
  "bottom-right": { x: -1, y: -1 },
};

/* A single petal, tip pointing up from the rose centre (origin). */
const PETAL = "M0 0C-17-7-29-26-21-46C-13-62 13-62 21-46C29-26 17-7 0 0Z";
/* A lanceolate leaf drawn along the +x axis, base at the origin. */
const LEAF = "M0 0C10-9 26-10 38 0C26 10 10 9 0 0Z";
const RING = [0, 72, 144, 216, 288];

function Rose({ x, y, scale, turn = 0 }: { x: number; y: number; scale: number; turn?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${scale})`}>
      {RING.map((angle) => (
        <path
          key={`outer-${angle}`}
          d={PETAL}
          className={styles.petalOuter}
          transform={`rotate(${angle}) scale(1.08)`}
        />
      ))}
      {RING.map((angle) => (
        <path
          key={`mid-${angle}`}
          d={PETAL}
          className={styles.petalMid}
          transform={`rotate(${angle + 36}) scale(0.78)`}
        />
      ))}
      {RING.map((angle) => (
        <path
          key={`inner-${angle}`}
          d={PETAL}
          className={styles.petalInner}
          transform={`rotate(${angle + 12}) scale(0.5)`}
        />
      ))}
      <circle r="7" className={styles.heart} />
      <path d="M-4-3c3-4 9-3 9 2s-6 6-8 2 1-6 4-5" className={styles.swirl} />
    </g>
  );
}

function Leaf({
  x,
  y,
  rotate,
  scale = 1,
  soft = false,
}: {
  x: number;
  y: number;
  rotate: number;
  scale?: number;
  soft?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d={LEAF} className={soft ? styles.leafSoft : styles.leaf} />
      <path d="M3 0H33" className={styles.vein} />
    </g>
  );
}

function Sprig({ d, buds }: { d: string; buds: [number, number, number][] }) {
  return (
    <g>
      <path d={d} className={styles.stem} />
      {buds.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} className={styles.bud} />
      ))}
    </g>
  );
}

type RoseCornerProps = {
  corner: Corner;
  className?: string;
};

/**
 * Watercolour-style cluster of ivory roses and sage leaves, echoing the
 * printed invitation. Drawn for the top-left corner and mirrored for the
 * others.
 */
export function RoseCorner({ corner, className }: RoseCornerProps) {
  const style = {
    "--flip-x": String(FLIP[corner].x),
    "--flip-y": String(FLIP[corner].y),
  } as CSSProperties;

  return (
    <svg
      className={`${styles.root} ${styles[corner]} ${className ?? ""}`}
      viewBox="0 0 220 220"
      fill="none"
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {/* leaves sit beneath the blooms */}
      <Leaf x={112} y={104} rotate={38} scale={1.15} />
      <Leaf x={118} y={26} rotate={-28} scale={0.95} soft />
      <Leaf x={168} y={64} rotate={14} scale={0.9} />
      <Leaf x={26} y={126} rotate={112} scale={1} soft />
      <Leaf x={62} y={186} rotate={62} scale={0.9} />
      <Leaf x={8} y={52} rotate={-152} scale={0.8} />
      <Leaf x={150} y={132} rotate={58} scale={0.75} soft />

      <Sprig
        d="M132 118c20 16 40 26 64 40"
        buds={[
          [196, 158, 2.4],
          [182, 144, 1.9],
          [170, 152, 1.6],
          [188, 170, 1.7],
          [204, 148, 1.5],
        ]}
      />
      <Sprig
        d="M74 138c-2 24-6 46-12 70"
        buds={[
          [62, 208, 2.3],
          [54, 196, 1.8],
          [70, 200, 1.6],
          [58, 216, 1.4],
        ]}
      />
      <Sprig
        d="M104 26c14-8 28-14 46-16"
        buds={[
          [150, 10, 2],
          [140, 18, 1.6],
          [136, 6, 1.4],
        ]}
      />

      <Rose x={78} y={74} scale={1} turn={-12} />
      <Rose x={152} y={40} scale={0.55} turn={20} />
      <Rose x={42} y={158} scale={0.5} turn={-30} />

      <circle cx="202" cy="118" r="1.5" className={styles.spark} />
      <circle cx="120" cy="200" r="1.4" className={styles.spark} />
      <circle cx="190" cy="92" r="1.1" className={styles.spark} />
    </svg>
  );
}
