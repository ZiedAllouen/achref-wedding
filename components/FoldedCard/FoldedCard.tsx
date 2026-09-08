"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { WeddingCrest } from "@/components/WeddingCrest/WeddingCrest";
import { PanelFrame, FlourishHeart } from "@/components/Ornaments/Ornaments";
import { RoseCorner } from "@/components/RoseCorner/RoseCorner";
import { GuestName } from "./GuestName";
import styles from "./FoldedCard.module.css";

/**
 * The cover screen: a small closed card resting on a looping flowers video,
 * framed the same way the invitation itself is framed (PanelFrame +
 * RoseCorner). Opening it lifts the card's face away on a top hinge, as a
 * printed folded card opens, revealing the invitation underneath rather
 * than sliding an envelope off screen.
 */
export function FoldedCard({ onOpen }: { onOpen: () => void }) {
  const { dict, dir } = useLanguage();
  const [isOpening, setIsOpening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const topCorner = dir === "rtl" ? "top-left" : "top-right";
  const bottomCorner = dir === "rtl" ? "bottom-right" : "bottom-left";

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      const video = videoRef.current;
      if (!video) return;

      if (media.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      video.play().catch(() => {
        // Autoplay may be blocked; the poster/first frame stays visible.
      });
    };

    syncPlayback();
    media.addEventListener("change", syncPlayback);
    return () => media.removeEventListener("change", syncPlayback);
  }, []);

  function handleOpen() {
    if (isOpening) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsOpening(true);

    window.setTimeout(onOpen, prefersReducedMotion ? 20 : 850);
  }

  return (
    <div className={`${styles.overlay} ${isOpening ? styles.opening : ""}`}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/video/flowers.mp4" type="video/mp4" />
      </video>
      <div className={styles.groundGlow} aria-hidden="true" />

      <div className={styles.stage}>
        <div className={styles.shadow} aria-hidden="true" />

        {/* What sits behind the card face: shown once the face lifts away. */}
        <div className={styles.inside} aria-hidden="true">
          <WeddingCrest className={styles.insideCrest} />
          <FlourishHeart width="5.5rem" />
        </div>

        <div className={styles.card}>
          <PanelFrame className={styles.frame} />
          <RoseCorner corner={topCorner} className={styles.rose} />
          <RoseCorner corner={bottomCorner} className={styles.rose} />

          <div className={styles.face}>
            <p className={styles.invitationLabel}>{dict.cover.invitationLabel}</p>
            <h1 className={`t-display-names ${styles.names}`}>{dict.cover.coupleNames}</h1>
            <FlourishHeart width="5rem" />
            <Suspense fallback={null}>
              <GuestName />
            </Suspense>
            <p className={styles.dateLine}>{dict.cover.dateLine}</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.openButton}
          onClick={handleOpen}
          disabled={isOpening}
        >
          {dict.cover.tapToOpen}
        </button>
      </div>
    </div>
  );
}
