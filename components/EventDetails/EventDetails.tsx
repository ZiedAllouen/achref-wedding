import { useLanguage } from "@/lib/i18n/LanguageContext";
import styles from "./EventDetails.module.css";

type EventDetailsProps = {
  mapUrl: string;
};

export function EventDetails({ mapUrl }: EventDetailsProps) {
  const { dict } = useLanguage();
  const { wedding } = dict.events;

  return (
    <section className={styles.section} aria-label={dict.events.heading}>
      <h2 className="t-heading">{dict.events.heading}</h2>
      <p className="t-body">{wedding.title}</p>

      <div className={styles.venueBlock}>
        <p className={`t-venue latin`}>{wedding.venueName}</p>
        {wedding.venueSubName ? <p className="t-body">{wedding.venueSubName}</p> : null}
      </div>

      <div className={styles.metaList}>
        <p className={`t-body ${styles.metaRow}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
          </svg>
          <span>{wedding.dateLabel}</span>
        </p>
        <p className={`t-body ${styles.metaRow}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l3 2" />
          </svg>
          <span>{wedding.timeLabel}</span>
        </p>
        <p className={`t-body ${styles.metaRow}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
          <span>{wedding.addressLabel}</span>
        </p>
      </div>

      <p className={`t-small ${styles.mapNote}`}>{wedding.mapNote}</p>
      <a className="btn-outline t-ui" href={mapUrl} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2" />
        </svg>
        {wedding.mapCtaLabel}
      </a>
    </section>
  );
}
