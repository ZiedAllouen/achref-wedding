"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import styles from "./Countdown.module.css";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(targetDate: string): Remaining {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function formatUnit(value: number) {
  return value.toString().padStart(value >= 100 ? 3 : 2, "0");
}

function Unit({ value, label }: { value: number; label: string }) {
  const formatted = formatUnit(value);

  return (
    <div className={styles.unit} role="group" aria-label={`${value} ${label}`}>
      <span className={`t-numerals ${styles.value}`} aria-hidden="true">
        {/* Re-keying on the formatted value replays the tick animation
            each time it changes, and settles instantly under
            prefers-reduced-motion via the global animation-duration override. */}
        <span key={formatted} className={styles.tick}>
          {formatted}
        </span>
      </span>
      <span className="t-small">{label}</span>
    </div>
  );
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const { dict } = useLanguage();
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(targetDate));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { value: remaining?.days ?? 0, label: dict.countdown.days },
    { value: remaining?.hours ?? 0, label: dict.countdown.hours },
    { value: remaining?.minutes ?? 0, label: dict.countdown.minutes },
    { value: remaining?.seconds ?? 0, label: dict.countdown.seconds },
  ];

  return (
    <section className={styles.section} aria-label={dict.countdown.heading}>
      <h2 className="t-heading">{dict.countdown.heading}</h2>
      <div className={styles.grid} aria-live="off">
        {units.map((unit) => (
          <Unit key={unit.label} value={unit.value} label={unit.label} />
        ))}
      </div>
    </section>
  );
}
