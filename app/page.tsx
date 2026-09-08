"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { CoverLeaf } from "@/components/CoverLeaf/CoverLeaf";
import { ArchFrame } from "@/components/ArchFrame/ArchFrame";
import { FlourishHeart, PanelFrame } from "@/components/Ornaments/Ornaments";
import { RoseCorner } from "@/components/RoseCorner/RoseCorner";
import { Countdown } from "@/components/Countdown/Countdown";
import { EventDetails } from "@/components/EventDetails/EventDetails";
import { BlessingSection } from "@/components/BlessingSection/BlessingSection";
import { ClosingMessage } from "@/components/ClosingMessage/ClosingMessage";
import { Reveal } from "@/components/Reveal/Reveal";
import styles from "./page.module.css";

/* Friday 30 October 2026, 21:00 Tunisia time (UTC+1, no DST). */
const WEDDING_DATE = "2026-10-30T21:00:00+01:00";
const WEDDING_MAP_URL =
  "https://www.google.com/maps/dir//Tej+Palace,+RQJV%2BCQX,+Sakiet+Eddaier/@36.8115712,10.1351424,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1301d13af6ef2ee1:0xbbdb814f2ecd1830!2m2!1d10.7943346!2d34.8312148?entry=ttu";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const { dict, dir } = useLanguage();
  const leafRef = useRef<HTMLElement>(null);
  const pagesRef = useRef<HTMLElement>(null);
  const prevRectRef = useRef<DOMRect | null>(null);

  function handleOpen() {
    prevRectRef.current = leafRef.current?.getBoundingClientRect() ?? null;
    setIsOpened(true);
  }

  useLayoutEffect(() => {
    if (!isOpened) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const leaf = leafRef.current;
    const pages = pagesRef.current;
    const prevRect = prevRectRef.current;

    if (prefersReducedMotion || !leaf || !pages || !prevRect) {
      // No FLIP: jump straight to the open state, and on mobile land the
      // guest at the top of the invitation content.
      if (pages && window.innerWidth < 760) {
        pages.scrollIntoView({ behavior: "auto", block: "start" });
      }
      return;
    }

    const nextRect = leaf.getBoundingClientRect();
    const dx = prevRect.left - nextRect.left;
    const dy = prevRect.top - nextRect.top;
    const isMobile = window.innerWidth < 760;

    if (!isMobile && (dx !== 0 || dy !== 0)) {
      leaf.style.transition = "none";
      leaf.style.transform = `translate(${dx}px, ${dy}px)`;
      // Force a reflow so the transform above is committed before the
      // transition to none is applied.
      leaf.getBoundingClientRect();
      leaf.style.transition = `transform 700ms var(--ease-open)`;
      leaf.style.transform = "none";
    }

    const insetFrom = dir === "rtl" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
    pages.style.clipPath = insetFrom;
    pages.style.transition = "none";
    pages.getBoundingClientRect();
    pages.style.transition = `clip-path 700ms var(--ease-open)`;
    pages.style.clipPath = "inset(0)";

    const cleanupTimer = window.setTimeout(() => {
      leaf.style.transition = "";
      leaf.style.transform = "";
      pages.style.transition = "";
      pages.style.clipPath = "";
    }, 750);

    if (isMobile) {
      pages.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return () => window.clearTimeout(cleanupTimer);
  }, [isOpened, dir]);

  const inlineEndCorner = dir === "rtl" ? "top-left" : "top-right";
  const inlineStartCorner = dir === "rtl" ? "bottom-right" : "bottom-left";

  return (
    <main className={styles.main}>
      <LanguageSwitcher />
      <div className={`${styles.sheet} ${!isOpened ? styles.closed : ""}`}>
        <CoverLeaf
          ref={leafRef}
          isOpen={isOpened}
          onOpen={handleOpen}
          className={styles.leaf}
        />
        <section
          ref={pagesRef}
          className={`panel ${styles.pages}`}
          aria-hidden={!isOpened}
          hidden={!isOpened}
        >
          <PanelFrame />
          <RoseCorner corner={inlineEndCorner} />
          <RoseCorner corner={inlineStartCorner} />

          <div className={styles.contentStack}>
            <div className={styles.intro}>
              <ArchFrame>
                <p className={`t-bismillah ${styles.bismillah}`}>{dict.intro.bismillah}</p>
                <p className={`t-verse ${styles.verse}`}>{dict.intro.verse}</p>
              </ArchFrame>
              <p className="t-body">{dict.intro.invitation}</p>
              <h2 className={`t-display-names ${styles.introNames}`}>{dict.cover.coupleNames}</h2>
              <FlourishHeart width="7rem" />
              <p className={`t-body ${styles.introDate}`}>{dict.intro.dateSentence}</p>
            </div>

            <Reveal>
              <Countdown targetDate={WEDDING_DATE} />
            </Reveal>
            <Reveal delayMs={80}>
              <EventDetails mapUrl={WEDDING_MAP_URL} />
            </Reveal>
            <Reveal delayMs={80}>
              <BlessingSection />
            </Reveal>
            <Reveal delayMs={80}>
              <ClosingMessage />
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}
