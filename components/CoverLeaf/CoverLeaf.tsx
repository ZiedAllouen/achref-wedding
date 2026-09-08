"use client";

import { Suspense, useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PanelFrame, FlourishHeart } from "@/components/Ornaments/Ornaments";
import { RoseCorner } from "@/components/RoseCorner/RoseCorner";
import { GuestName } from "./GuestName";
import styles from "./CoverLeaf.module.css";

type CoverLeafProps = {
  isOpen: boolean;
  onOpen: () => void;
  className?: string;
  ref?: React.Ref<HTMLElement>;
};

export function CoverLeaf({ isOpen, onOpen, className, ref }: CoverLeafProps) {
  const { dict, dir } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);

  const inlineEndCorner = dir === "rtl" ? "top-left" : "top-right";
  const inlineStartCorner = dir === "rtl" ? "bottom-right" : "bottom-left";

  function handleOpen() {
    audioRef.current?.play().catch(() => {
      // Autoplay may be blocked, or the placeholder track may not exist yet.
    });
    onOpen();
  }

  return (
    <section ref={ref} className={`panel ${styles.leaf} ${className ?? ""}`} aria-label={dict.cover.invitationLabel}>
      <audio ref={audioRef} src="/audio/wedding-music.mp3" loop preload="none" />
      <PanelFrame />
      <RoseCorner corner={inlineEndCorner} />
      <RoseCorner corner={inlineStartCorner} />

      <h1 className={`t-display-word ${styles.word}`}>{dict.cover.word}</h1>
      <FlourishHeart width="7rem" />
      <div className={styles.guestLine}>
        <Suspense fallback={null}>
          <GuestName />
        </Suspense>
      </div>

      {!isOpen && (
        <button type="button" className="btn-outline t-ui" onClick={handleOpen}>
          {dict.cover.tapToOpen}
        </button>
      )}
    </section>
  );
}
