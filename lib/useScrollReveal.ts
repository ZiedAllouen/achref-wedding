"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useScrollReveal<T extends HTMLElement>() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [node, setNode] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const ref = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!node) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    const updateProgress = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const normalized = (sectionCenter - viewportCenter) / viewportCenter;
      setProgress(clamp(normalized, -1.2, 1.2));
    };

    let rafId = 0;

    const queueUpdate = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          updateProgress();
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        setIsVisible(entry.isIntersecting);
        queueUpdate();
      },
      { rootMargin: "-6% 0px -6% 0px", threshold: [0, 0.12, 0.35, 0.65, 1] }
    );

    observer.observe(node);
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    queueUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [node, prefersReducedMotion]);

  const motionStyle = useMemo(
    () =>
      ({
        "--section-progress": (prefersReducedMotion ? 0 : progress).toFixed(3),
        "--section-progress-abs": Math.abs(prefersReducedMotion ? 0 : progress).toFixed(3),
      }) as CSSProperties,
    [prefersReducedMotion, progress]
  );

  return {
    ref,
    isVisible: prefersReducedMotion || isVisible,
    isActive: prefersReducedMotion || isActive,
    motionStyle,
  };
}
