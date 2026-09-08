"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view, using IntersectionObserver.
 * Returns a ref to attach to the element and whether it should be shown as
 * "revealed" (i.e. animated in).
 *
 * The initial state is always `false` on both server and client so
 * hydration never mismatches. Guests with `prefers-reduced-motion` set
 * (or without IntersectionObserver support) still see the content: the
 * `reveal`/`revealed` CSS classes resolve to a visible, non-animated state
 * under that media query regardless of this hook's boolean.
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer support (very old browser): reveal on the next tick
      // instead of synchronously, so this stays a reaction to an external
      // signal (the timer firing) rather than an unconditional effect-body
      // setState.
      const id = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  return { ref, revealed };
}
