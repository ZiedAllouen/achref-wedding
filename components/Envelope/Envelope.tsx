"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { WeddingCrest } from "@/components/WeddingCrest/WeddingCrest";
import { MonogramCrest } from "@/components/MonogramCrest/MonogramCrest";
import { GuestName } from "./GuestName";
import styles from "./Envelope.module.css";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const { dict } = useLanguage();
  const [isOpening, setIsOpening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        // The poster remains visible if the browser blocks background playback.
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

    window.setTimeout(onOpen, prefersReducedMotion ? 20 : 1100);
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
        poster="/video/nurback-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="/video/nurback-mobile.mp4"
          type="video/mp4"
          media="(prefers-reduced-motion: no-preference) and (max-width: 700px)"
        />
        <source
          src="/video/nurback.mp4"
          type="video/mp4"
          media="(prefers-reduced-motion: no-preference)"
        />
      </video>
      <div className={styles.videoVeil} aria-hidden="true" />
      <div className={styles.scene}>
        <div className={styles.ambientGlow} aria-hidden="true" />
        <header className={styles.coverHeading}>
          <span className={styles.invitationLabel}>{dict.cover.invitationLabel}</span>
          <h1 className={styles.names}>{dict.cover.coupleNames}</h1>
          <Suspense fallback={null}>
            <GuestName />
          </Suspense>
          <span className={styles.dateLine}>{dict.cover.dateLine}</span>
        </header>
        <div className={styles.envelope}>
          <div className={styles.shadow} aria-hidden="true" />
          <div className={styles.envelopeBody} aria-hidden="true" />
          <div className={styles.letter} aria-hidden="true">
            <WeddingCrest className={styles.letterCrest} />
            <span className={styles.letterRule} />
            <span className={styles.letterNames}>{dict.cover.coupleNames}</span>
          </div>
          <div className={styles.flap} aria-hidden="true" />
          <div className={styles.seal} aria-hidden="true">
            <MonogramCrest initials="A & M" className={styles.sealCrest} />
          </div>
          <div className={styles.buttonWrap}>
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
      </div>
    </div>
  );
}
