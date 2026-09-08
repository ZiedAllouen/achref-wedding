"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { Envelope } from "@/components/Envelope/Envelope";
import { ArchFrame } from "@/components/ArchFrame/ArchFrame";
import { FlourishHeart, PanelFrame } from "@/components/Ornaments/Ornaments";
import { RoseCorner } from "@/components/RoseCorner/RoseCorner";
import { Countdown } from "@/components/Countdown/Countdown";
import { EventDetails } from "@/components/EventDetails/EventDetails";
import { BlessingSection } from "@/components/BlessingSection/BlessingSection";
import { ClosingMessage } from "@/components/ClosingMessage/ClosingMessage";
import { Reveal } from "@/components/Reveal/Reveal";
import { useState } from "react";
import styles from "./page.module.css";

/* Friday 30 October 2026, 21:00 Tunisia time (UTC+1, no DST). */
const WEDDING_DATE = "2026-10-30T21:00:00+01:00";
const WEDDING_MAP_URL =
  "https://www.google.com/maps/dir//Tej+Palace,+RQJV%2BCQX,+Sakiet+Eddaier/@36.8115712,10.1351424,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1301d13af6ef2ee1:0xbbdb814f2ecd1830!2m2!1d10.7943346!2d34.8312148?entry=ttu";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const { dict, dir } = useLanguage();

  const topCorner = dir === "rtl" ? "top-left" : "top-right";
  const bottomCorner = dir === "rtl" ? "bottom-right" : "bottom-left";

  return (
    <main className={styles.main}>
      <LanguageSwitcher />
      {!isOpened && <Envelope onOpen={() => setIsOpened(true)} />}

      <article
        className={`${styles.invitation} ${isOpened ? styles.visible : ""}`}
        hidden={!isOpened}
      >
        <PanelFrame />
        <RoseCorner corner={topCorner} />
        <RoseCorner corner={bottomCorner} />

        <header className={styles.hero}>
          <p className={styles.eyebrow}>{dict.cover.invitationLabel}</p>
          <ArchFrame>
            <p className={`t-bismillah ${styles.bismillah}`}>{dict.intro.bismillah}</p>
            <p className={`t-verse ${styles.verse}`}>{dict.intro.verse}</p>
          </ArchFrame>
          <p className={`t-body ${styles.familyLine}`}>{dict.intro.invitation}</p>
          <h1 className={`t-display-names ${styles.names}`}>{dict.cover.coupleNames}</h1>
          <FlourishHeart width="7rem" />
          <p className={`t-body ${styles.dateSentence}`}>{dict.intro.dateSentence}</p>
        </header>

        <Reveal as="section" className={`${styles.section} ${styles.countdownBand}`}>
          <Countdown targetDate={WEDDING_DATE} />
        </Reveal>

        <Reveal as="section" className={`${styles.section} ${styles.eventCard}`} delayMs={80}>
          <RoseCorner corner="top-left" className={styles.smallRose} />
          <RoseCorner corner="bottom-right" className={styles.smallRose} />
          <span className={styles.sectionNumber} aria-hidden="true">
            01
          </span>
          <EventDetails mapUrl={WEDDING_MAP_URL} />
        </Reveal>

        <Reveal as="section" className={`${styles.section} ${styles.blessing}`} delayMs={80}>
          <BlessingSection />
        </Reveal>

        <Reveal as="footer" className={`${styles.section} ${styles.closing}`} delayMs={80}>
          <ClosingMessage />
          <p className={styles.signature} aria-hidden="true">
            A&nbsp;&amp;&nbsp;M
          </p>
        </Reveal>
      </article>
    </main>
  );
}
