import styles from "./InvitationBotanicals.module.css";

function BotanicalBranch({ side }: { side: "left" | "right" }) {
  return (
    <div className={`${styles.branch} ${side === "left" ? styles.left : styles.right}`}>
      <svg className={styles.art} viewBox="0 0 150 420" fill="none">
        <g className={styles.sway}>
          <path className={styles.stem} d="M24 414c61-74 17-131 69-198 27-35 32-86 24-199" />
          <path className={styles.stemFine} d="M68 330c-20-10-33-28-38-53" />
          <path className={styles.stemFine} d="M82 260c25-12 41-31 48-57" />
          <path className={styles.stemFine} d="M101 186c-25-11-42-29-50-55" />
          <path className={styles.stemFine} d="M116 109c19-11 29-27 31-47" />

          <path className={styles.leaf} d="M65 331c-25 1-41-12-47-37 25 0 42 13 47 37Z" />
          <path className={styles.leafSoft} d="M79 263c29-2 48-18 55-47-29 2-48 18-55 47Z" />
          <path className={styles.leaf} d="M101 187c-28 1-47-14-55-42 29-1 48 14 55 42Z" />
          <path className={styles.leafSoft} d="M115 111c23-2 38-15 44-38-23 1-38 14-44 38Z" />
          <path className={styles.leafSmall} d="M91 223c-17-4-27-16-29-33 17 3 27 15 29 33Z" />
          <path className={styles.leafSmall} d="M111 146c16-5 25-16 27-33-16 4-25 15-27 33Z" />

          <g className={styles.blossomLarge}>
            <path d="M48 119c12 1 20 8 23 19-10 5-20 3-28-5-2 12-9 20-21 23-5-10-3-20 5-28-12-2-20-9-23-21 10-5 20-3 28 5 2-12 9-20 21-23 5 10 3 20-5 30Z" />
            <circle cx="37" cy="122" r="5" />
          </g>
          <g className={styles.blossomSmall}>
            <path d="M125 48c7 1 12 5 14 12-6 3-12 2-17-3-1 7-5 12-12 14-3-6-2-12 3-17-7-1-12-5-14-12 6-3 12-2 17 3 1-7 5-12 12-14 3 6 2 12-3 17Z" />
            <circle cx="119" cy="49" r="3" />
          </g>
          <circle className={styles.berry} cx="29" cy="273" r="4" />
          <circle className={styles.berry} cx="137" cy="197" r="3" />
        </g>
      </svg>
    </div>
  );
}

export function InvitationBotanicals() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <BotanicalBranch side="left" />
      <BotanicalBranch side="right" />
    </div>
  );
}
