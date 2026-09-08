type MonogramCrestProps = {
  /** The couple's initials, e.g. "A & M". */
  initials: string;
  className?: string;
};

/**
 * A gold double-ring emblem with the couple's initials set inside,
 * echoing the abstract leaf mark from WeddingCrest but framed the way a
 * wax-seal crest is: two concentric circles around a small central motif.
 */
export function MonogramCrest({ initials, className }: MonogramCrestProps) {
  const isArabic = /[\u0600-\u06ff]/.test(initials);
  const [firstName = initials, secondName = ""] = initials.split(/\s+و\s+/);

  return (
    <svg
      className={className}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
      <circle cx="80" cy="80" r="66" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {isArabic ? (
        <>
          <text
            x="80"
            y="72"
            textAnchor="middle"
            direction="rtl"
            fill="currentColor"
            fontFamily="var(--font-display-arabic), serif"
            fontWeight="700"
            fontSize="43"
          >
            {firstName}
          </text>
          <text
            x="80"
            y="93"
            textAnchor="middle"
            direction="rtl"
            fill="currentColor"
            fontFamily="var(--font-display-arabic), serif"
            fontWeight="400"
            fontSize="18"
            opacity="0.72"
          >
            و
          </text>
          <text
            x="80"
            y="123"
            textAnchor="middle"
            direction="rtl"
            fill="currentColor"
            fontFamily="var(--font-display-arabic), serif"
            fontWeight="700"
            fontSize="39"
          >
            {secondName}
          </text>
          <circle cx="36" cy="82" r="1.8" fill="currentColor" opacity="0.46" />
          <circle cx="124" cy="82" r="1.8" fill="currentColor" opacity="0.46" />
        </>
      ) : (
        <>
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 -8)">
            <path
              d="M80 108C64 95 54 84 54 68c0-12 9-22 26-30 17 8 26 18 26 30 0 16-10 27-26 40Z"
              strokeWidth="1.8"
              opacity="0.85"
            />
            <path d="M54 69c14 2 21 12 26 26 5-14 12-24 26-26" strokeWidth="1.3" opacity="0.7" />
            <path d="M80 44v56" strokeWidth="0.8" opacity="0.4" />
          </g>
          <text
            x="80"
            y="128"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="var(--font-latin), Georgia, serif"
            fontStyle="italic"
            fontWeight="400"
            fontSize="22"
          >
            {initials}
          </text>
        </>
      )}
    </svg>
  );
}
