"use client";

import { useEffect, type CSSProperties, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { Envelope } from "@/components/Envelope/Envelope";
import { Countdown } from "@/components/Countdown/Countdown";
import { EventCard } from "@/components/EventCard/EventCard";
import { BlessingSection } from "@/components/BlessingSection/BlessingSection";
import { ClosingMessage } from "@/components/ClosingMessage/ClosingMessage";
import { ArchFrame } from "@/components/ArchFrame/ArchFrame";
import { RoseCorner } from "@/components/RoseCorner/RoseCorner";
import { InvitationBotanicals } from "@/components/InvitationBotanicals/InvitationBotanicals";
import styles from "./page.module.css";

/* Friday 30 October 2026, 21:00 Tunisia time (UTC+1, no DST). */
const WEDDING_DATE = "2026-10-30T21:00:00+01:00";
const WEDDING_MAP_URL =
  "https://www.google.com/maps/dir//Tej+Palace,+RQJV%2BCQX,+Sakiet+Eddaier/@36.8115712,10.1351424,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x1301d13af6ef2ee1:0xbbdb814f2ecd1830!2m2!1d10.7943346!2d34.8312148?entry=ttu";

function renderVerseWords(verse: string) {
  const words = verse.split(" ");

  return words.map((word, index) => (
    <span
      key={`${word}-${index}`}
      className={styles.verseWord}
      style={{ "--word-index": index } as CSSProperties}
      aria-hidden="true"
    >
      {word}
      {index < words.length - 1 ? " " : ""}
    </span>
  ));
}

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const { dict } = useLanguage();

  const {
    ref: introRef,
    isVisible: introVisible,
    isActive: introActive,
    motionStyle: introMotionStyle,
  } = useScrollReveal<HTMLElement>();
  const {
    ref: countdownRef,
    isVisible: countdownVisible,
    isActive: countdownActive,
    motionStyle: countdownMotionStyle,
  } = useScrollReveal<HTMLDivElement>();
  const {
    ref: eventsRef,
    isVisible: eventsVisible,
    isActive: eventsActive,
    motionStyle: eventsMotionStyle,
  } = useScrollReveal<HTMLElement>();
  const {
    ref: blessingRef,
    isVisible: blessingVisible,
    isActive: blessingActive,
    motionStyle: blessingMotionStyle,
  } = useScrollReveal<HTMLDivElement>();
  const {
    ref: closingRef,
    isVisible: closingVisible,
    isActive: closingActive,
    motionStyle: closingMotionStyle,
  } = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      document.documentElement.style.setProperty("--page-scroll", "0px");
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      document.documentElement.style.setProperty("--page-scroll", `${window.scrollY}px`);
    };

    const queueUpdate = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      document.documentElement.style.removeProperty("--page-scroll");
    };
  }, []);

  return (
    <main className={styles.main}>
      <LanguageSwitcher />
      {!isOpened && <Envelope onOpen={() => setIsOpened(true)} />}
      {isOpened && (
        <>
          <InvitationBotanicals />
          <div className={styles.content}>
            <RoseCorner corner="top-right" className={styles.frameRose} />
            <RoseCorner corner="bottom-left" className={styles.frameRose} />

            <section
              ref={introRef}
              style={introMotionStyle}
              className={`reveal ${introVisible ? `revealed ${styles.sectionVisible} ${styles.verseVisible}` : ""} ${introActive ? styles.sectionActive : ""} ${styles.sectionShell} ${styles.toneIvory} ${styles.introSection}`}
              aria-label="intro"
            >
              <div className={styles.scrollFrame}>
                <ArchFrame className={styles.archBlock}>
                  <p className="bismillah">{dict.intro.bismillah}</p>
                  <p className={`verse ${styles.verseLine}`} aria-label={dict.intro.verse}>
                    {renderVerseWords(dict.intro.verse)}
                  </p>
                </ArchFrame>
                <p className={`invitation ${styles.familiesLine}`}>{dict.intro.invitation}</p>
                <h1 className={styles.coupleNames}>{dict.cover.coupleNames}</h1>
                <div className={styles.invitationOrnament} aria-hidden="true">
                  <span />
                </div>
                <p className={`invitation ${styles.dateSentence}`}>{dict.intro.dateSentence}</p>
              </div>
            </section>

            <div
              ref={countdownRef}
              style={countdownMotionStyle}
              className={`reveal ${countdownVisible ? `revealed ${styles.sectionVisible}` : ""} ${countdownActive ? styles.sectionActive : ""} ${styles.sectionShell} ${styles.toneGold}`}
            >
              <div className={styles.scrollFrame}>
                <Countdown targetDate={WEDDING_DATE} />
              </div>
            </div>

            <section
              ref={eventsRef}
              style={eventsMotionStyle}
              className={`reveal ${eventsVisible ? `revealed ${styles.sectionVisible}` : ""} ${eventsActive ? styles.sectionActive : ""} ${styles.sectionShell} ${styles.toneSage} ${styles.eventsSection}`}
              aria-label="events"
            >
              <div className={styles.scrollFrame}>
                <h2 className={styles.sectionHeading}>{dict.events.heading}</h2>
                <div className={styles.eventsGrid}>
                  <EventCard
                    title={dict.events.wedding.title}
                    dateLabel={dict.events.wedding.dateLabel}
                    timeLabel={dict.events.wedding.timeLabel}
                    venueName={dict.events.wedding.venueName}
                    venueSubName={dict.events.wedding.venueSubName}
                    addressLabel={dict.events.wedding.addressLabel}
                    mapNote={dict.events.wedding.mapNote}
                    mapUrl={WEDDING_MAP_URL}
                    mapCtaLabel={dict.events.wedding.mapCtaLabel}
                    isVisible={eventsVisible}
                    index={0}
                  />
                </div>
              </div>
            </section>

            <div
              ref={blessingRef}
              style={blessingMotionStyle}
              className={`reveal ${blessingVisible ? `revealed ${styles.sectionVisible}` : ""} ${blessingActive ? styles.sectionActive : ""} ${styles.sectionShell} ${styles.toneIvory} ${styles.blessingSection}`}
            >
              <div className={styles.scrollFrame}>
                <BlessingSection isVisible={blessingVisible} />
              </div>
            </div>

            <div
              ref={closingRef}
              style={closingMotionStyle}
              className={`reveal ${closingVisible ? `revealed ${styles.sectionVisible}` : ""} ${closingActive ? styles.sectionActive : ""} ${styles.sectionShell} ${styles.toneGold} ${styles.closingSection}`}
            >
              <div className={styles.scrollFrame}>
                <ClosingMessage isVisible={closingVisible} />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
