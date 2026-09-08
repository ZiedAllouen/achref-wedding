"use client";

import type { ElementType, ReactNode } from "react";
import { useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  /** HTML element to render as. Defaults to "div". */
  as?: ElementType;
  className?: string;
  /** Stagger the reveal by this many milliseconds once in view. */
  delayMs?: number;
};

/**
 * Fades and rises its children into place the first time they scroll into
 * view. A no-op (renders already visible) when the guest prefers reduced
 * motion, so this never gates content behind JavaScript.
 */
export function Reveal({ children, as: Tag = "div", className, delayMs = 0 }: RevealProps) {
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${revealed ? styles.revealed : ""} ${className ?? ""}`}
      style={delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
