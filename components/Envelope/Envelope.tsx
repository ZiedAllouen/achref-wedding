"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { WeddingCrest } from "@/components/WeddingCrest/WeddingCrest";
import { RoseCorner } from "@/components/RoseCorner/RoseCorner";
import styles from "./Envelope.module.css";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const { dict } = useLanguage();
  const [isOpening, setIsOpening] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleOpen() {
    if (isOpening) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsOpening(true);

    audioRef.current?.play().catch(() => {
      // Autoplay may be blocked or the placeholder track may not exist yet.
    });

    window.setTimeout(onOpen, prefersReducedMotion ? 20 : 1100);
  }

  return (
    <div className={`${styles.overlay} ${isOpening ? styles.opening : ""}`}>
      <audio ref={audioRef} src="/audio/wedding-music.mp3" loop preload="none" />
      <div className={styles.parchment} aria-hidden="true" />
      <div className={styles.frame} aria-hidden="true">
        <span className={`${styles.frameCorner} ${styles.frameCornerTl}`} />
        <span className={`${styles.frameCorner} ${styles.frameCornerTr}`} />
        <span className={`${styles.frameCorner} ${styles.frameCornerBl}`} />
        <span className={`${styles.frameCorner} ${styles.frameCornerBr}`} />
      </div>
      <RoseCorner corner="top-right" className={styles.coverRose} />
      <RoseCorner corner="bottom-left" className={styles.coverRose} />
      <div className={styles.scene}>
        <div className={styles.ambientGlow} aria-hidden="true" />
        <header className={styles.coverHeading}>
          <span className={styles.invitationLabel}>{dict.cover.invitationLabel}</span>
          <h1 className={styles.names}>{dict.cover.coupleNames}</h1>
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
            <WeddingCrest className={styles.sealCrest} />
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
