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

function formatUnit(value: number, minimumDigits = 2) {
  return value.toString().padStart(minimumDigits, "0");
}

function RollingUnit({
  value,
  label,
  minimumDigits = 2,
}: {
  value: number;
  label: string;
  minimumDigits?: number;
}) {
  const formatted = formatUnit(value, minimumDigits);

  return (
    <div className={styles.unit} role="group" aria-label={`${value} ${label}`}>
      <div className={styles.valueFrame} aria-hidden="true">
        <span key={formatted} className={styles.valueRolling}>
          {formatted}
        </span>
      </div>
      <span className={styles.label}>{label}</span>
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
    { value: remaining?.days ?? 0, label: dict.countdown.days, minimumDigits: 2 },
    { value: remaining?.hours ?? 0, label: dict.countdown.hours, minimumDigits: 2 },
    { value: remaining?.minutes ?? 0, label: dict.countdown.minutes, minimumDigits: 2 },
    { value: remaining?.seconds ?? 0, label: dict.countdown.seconds, minimumDigits: 2 },
  ];

  return (
    <section className={styles.section} aria-label={dict.countdown.heading}>
      <h2 className={styles.heading}>{dict.countdown.heading}</h2>
      <div className={styles.grid} aria-live="off">
        {units.map((unit) => (
          <RollingUnit
            key={unit.label}
            value={unit.value}
            label={unit.label}
            minimumDigits={unit.minimumDigits}
          />
        ))}
      </div>
    </section>
  );
}
