import type { CSSProperties } from "react";
import { FloralDecoration } from "@/components/FloralDecoration/FloralDecoration";
import { WeddingCrest } from "@/components/WeddingCrest/WeddingCrest";
import styles from "./EventCard.module.css";

type EventCardProps = {
  title: string;
  dateLabel: string;
  timeLabel: string;
  venueName: string;
  venueSubName: string;
  addressLabel: string;
  mapNote: string;
  mapUrl: string;
  mapCtaLabel: string;
  isVisible: boolean;
  index: number;
};

export function EventCard({
  title,
  dateLabel,
  timeLabel,
  venueName,
  venueSubName,
  addressLabel,
  mapNote,
  mapUrl,
  mapCtaLabel,
  isVisible,
  index,
}: EventCardProps) {
  const style = {
    "--card-delay": `${index * 140}ms`,
  } as CSSProperties;

  return (
    <article
      className={`${styles.card} ${isVisible ? styles.visible : ""}`}
      style={style}
    >
      <FloralDecoration corner="top-left" parallaxFactor={0.014} swayDelay={index * 0.35} />
      <FloralDecoration corner="bottom-right" parallaxFactor={-0.012} swayDelay={0.5 + index * 0.35} />
      <div className={styles.content}>
        <span className={styles.eventBadge} aria-hidden="true">
          <WeddingCrest />
        </span>
        <p className={styles.kicker}>{title}</p>
        <h3 className={styles.title}>{venueName}</h3>
        {venueSubName ? <p className={styles.venueSub}>{venueSubName}</p> : null}
        <div className={styles.metaList}>
          <p className={styles.metaRow}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            </svg>
            <span>{dateLabel}</span>
          </p>
          <p className={styles.metaRow}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l3 2" />
            </svg>
            <span>{timeLabel}</span>
          </p>
          {addressLabel ? (
            <p className={styles.metaRow}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
                <circle cx="12" cy="10" r="2" />
              </svg>
              <span>{addressLabel}</span>
            </p>
          ) : null}
        </div>
        <div className={styles.mapPanel}>
          <p className={styles.mapNote}>{mapNote}</p>
          <a
            className={styles.mapLink}
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
              <circle cx="12" cy="10" r="2" />
            </svg>
            {mapCtaLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
