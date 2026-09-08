# The Open Card — design spec

Achraf & Molka wedding invitation. This spec is the contract for the
implementation pass. Where it conflicts with the current code, the spec wins.
Copy is never invented: every visible string comes from
`lib/i18n/dictionaries/*.json`.

## 1. Concept

The website is the printed bifold card lying open. One sheet of parchment on
a plain ground carries two framed panels: the **cover leaf** (the card's
front: the giant word "دعوة" / "Invitation", a flourish, the guest's name
line) and the **pages panel** (everything else). On desktop the two panels
sit side by side as a spread; the leaf is sticky and never scrolls away. On
phones the leaf is the first screen and the pages follow below.

The leaf sits at the **reading-start** side: right in Arabic, left in French
and English, exactly as a bifold opens in each script. Use logical
properties (`inset-inline-start`, `margin-inline`, `padding-inline`,
`grid` with `direction` inherited from `<html dir>`) so the geometry mirrors
on its own.

Boldness is spent once: the monumental gold calligraphic word with the
guest's own name beneath it, on a panel that stays in view. Everything else
is quiet: text, hairlines, whitespace.

## 2. Tokens (already defined in `app/globals.css`)

Colour

| token | value | role |
| --- | --- | --- |
| `--paper` | `#f3ebdc` | the sheet, both panels |
| `--paper-light` | `#f9f4ea` | fill of the closed niche; faint radial lift at the top of each panel |
| `--ground` | `#e6dcc8` | page background around the sheet (desktop and tablet only) |
| `--crease` | `#e0d3bb` | 1px line between the two panels |
| `--foil` | `#b8935a` | every hairline and ornament: frames, curls, arch, flourish, dotted line, icons, button outlines. Never text. |
| `--foil-soft` | `rgba(184,147,90,.5)` | inner line of every double frame; second line of the arch |
| `--gold-ink` | `#7a5b31` | all gold text: cover word, names, bismillah, verse, prayer, closing line, numerals, guest name, venue name, active language |
| `--ink` | `#4a3b2c` | body text and headings |
| `--ink-soft` | `#6b5a47` | secondary text: countdown labels, map note, inactive languages |
| `--sage` / `--sage-deep` | `#8f9b7c` / `#6f7d5f` | rose leaves only |
| `--rose-ivory` | `#fbf7ee` | rose petals only |

Type families (CSS variables set by `next/font` in `app/layout.tsx`)

| variable | family | use |
| --- | --- | --- |
| `--font-display-arabic` | Katibeh 400 | ONLY: cover word, couple names, closing line. Never on text with tashkeel. |
| `--font-text-arabic` | Scheherazade New 400/700 | all other Arabic: bismillah, verse, prose, headings, labels, buttons |
| `--font-latin` | EB Garamond 400/500/600 + italic | everything Latin, plus digits, `Tej Palace`, and countdown numerals in every language |

Rule: any Latin string or digit rendered inside an Arabic page (venue name,
dates, times, countdown numerals) gets `font-family: var(--font-latin)`
explicitly so the Arabic faces' built-in Latin glyphs never leak.

Type scale (rem; AR = Arabic, LA = French/English). Sentence case everywhere;
no uppercase, no letter-spacing above `0.02em`, no eyebrows, no kickers.

| role | AR | LA |
| --- | --- | --- |
| display-word (cover) | Katibeh `clamp(5.5rem, 22vw, 13rem)` lh 1 | EB Garamond italic 400 `clamp(2.75rem, 9vw, 6rem)` lh 1.05 |
| display-names | Katibeh `clamp(3rem, 8vw, 5.6rem)` lh 1.3 | italic 400 `clamp(2.25rem, 6.5vw, 4.6rem)` lh 1.1 |
| display-closing | Katibeh `clamp(2rem, 4.5vw, 3rem)` lh 1.5 | italic 400 `clamp(1.5rem, 3vw, 2rem)` lh 1.4 |
| bismillah | Scheherazade 700 `clamp(1.5rem, 3.2vw, 1.9rem)` lh 1.9 | italic 400 1.25rem |
| verse | Scheherazade 400 1.3rem lh 2.1, gold-ink | italic 400 1.125rem lh 1.8, gold-ink |
| prayer | Scheherazade 400 `clamp(1.5rem, 3.4vw, 2rem)` lh 1.9, gold-ink | italic 400 same clamp, lh 1.5 |
| venue | EB Garamond 500 1.75rem lh 1.2, gold-ink (all languages) | same |
| numerals | EB Garamond 500 `clamp(2rem, 5vw, 3.4rem)` lh 1, `font-variant-numeric: tabular-nums lining-nums`, gold-ink | same |
| heading | Scheherazade 700 1.375rem lh 1.5, ink | EB Garamond 500 1.375rem lh 1.4, ink |
| body | Scheherazade 400 1.25rem lh 2, ink | EB Garamond 400 1.125rem lh 1.7, ink |
| small | 1rem lh 1.7, ink-soft | 0.9375rem lh 1.6, ink-soft |
| guest name | Katibeh 1.75rem, gold-ink | italic 400 1.75rem, gold-ink |
| ui (buttons, switcher) | Scheherazade 400 1.0625rem | EB Garamond 500 1.0625rem |

Spacing rhythm: 0.5rem base. 1rem between elements in a block, 1.5rem between
blocks, `var(--gap-section)` between sections (3.5rem desktop, 2.5rem mobile).
Text measure inside the pages panel: `max-width: 36rem`, centred, inline
padding `clamp(1.5rem, 5vw, 4rem)`.

Surfaces: radius 0 everywhere (the arch curve is the only curved line).
Borders only on: the double gold frame of each panel, the closed niche, the
dotted guest line, the two outlined buttons. Exactly one shadow on the whole
site: the sheet on the ground, desktop and tablet only
(`0 1px 0 rgba(120,95,50,.12), 0 30px 60px -30px rgba(90,65,30,.25)`).
Nothing inside the sheet has a shadow, glow, blur or gradient wash. Paper
texture: the 7px dot grain at ~3% (`radial-gradient` pattern) on the sheet,
plus a 15% radial lift of `--paper-light` at the top of each panel.

Alignment: everything centred on the panel axis, as printed. No start-aligned
blocks.

## 3. Ornament vocabulary (`components/Ornaments/Ornaments.tsx`, already written)

- `FlourishHeart` — two mirrored foil curls meeting at a small heart. Used
  exactly where the card uses it: under the cover word, under the couple
  names, before the closing line, and a shorter one inside the blessing.
  Nowhere else. Sections are otherwise separated by whitespace only.
- `CornerCurls` — the four filigree curls of a panel frame.
- `PanelFrame` — the double gold frame (outer 1px `--foil`, inner 1px
  `--foil-soft`, 0.3rem apart, inset `var(--frame-inset)`) plus `CornerCurls`.
  Absolutely positioned, `pointer-events: none`, `aria-hidden`.
- `RoseCorner` (existing) — ivory rose cluster; each panel gets exactly two:
  top inline-end and bottom inline-start, bleeding ~1.4rem past the frame but
  inside the panel box (`overflow: clip` on the panel).

## 4. Layout

Desktop (≥ 1100px): `.sheet` is `max-width: 76rem; margin-inline: auto;
padding: 3.5rem 2rem 2rem; display: grid; grid-template-columns:
minmax(20rem, 28rem) minmax(0, 1fr); column-gap: 2rem; align-items: start;
background: var(--paper)` with the single shadow. The leaf is the first grid
child so it lands at inline-start in both directions. `.leaf { position:
sticky; top: 2rem; height: calc(100svh - 4rem); }`. The crease is a 1px
`--crease` line centred in the column gap (a pseudo-element on the sheet).
`.pages` is a single tall framed panel.

Tablet (760–1099px): same spread, columns `minmax(18rem, 22rem) minmax(0,1fr)`,
gap 1.5rem, sheet padding 1.25rem.

Mobile (< 760px): stacked. No ground visible, no shadow, sheet is full width
with padding 0. `.leaf { position: static; min-height: 100svh; }` then the
pages panel. Frame inset 0.6rem, panel inner padding 1.25rem.

Short viewports (height ≤ 600px): cover word capped at 4.5rem; the
bottom-inline-start rose on the leaf hidden so the guest line and button stay
above the fold.

Critical: **no `overflow: hidden` on any ancestor of `.leaf`** (it kills
`position: sticky`). Clip roses with `overflow: clip` on the panels only.

ASCII, desktop, Arabic (leaf on the right):

```
 ground                                                  AR  FR  EN
┌──────────────────────────────────────────────────────────────────┐
│ ┌════════════════════════════════════╕  ¦  ┌═══════════════╕    │
│ ║❧                            🌹🌿  ║  ¦  ║❧        🌹🌿 ║    │
│ ║      ╭──── closed niche ────╮      ║  ¦  ║               ║    │
│ ║      │  بسم الله الرحمن     │      ║  ¦  ║               ║    │
│ ║      │  verse (gold naskh)  │      ║  ¦  ║     دعوة      ║    │
│ ║      ╵──────────────────────╵      ║  ¦  ║    ~~♥~~      ║    │
│ ║      families line (ink)           ║  ¦  ║               ║    │
│ ║            أشرف و ملكة              ║  ¦  ║  ..Name....   ║    │
│ ║              ~~♥~~                 ║  ¦  ║               ║    │
│ ║      date sentence (ink)           ║  ¦  ║🌹🌿        ❧ ║    │
│ ║                                    ║  ¦  ╘═══════════════╛    │
│ ║      countdown heading             ║  ¦     (sticky)          │
│ ║      52    09    30    12          ║  ¦                       │
│ ║      أيام  ساعات دقائق ثوانٍ         ║  ¦                       │
│ ║                                    ║  ¦                       │
│ ║      شاركونا الفرحة                 ║  ¦                       │
│ ║      حفل الزفاف                     ║  ¦                       │
│ ║      Tej Palace                    ║  ¦                       │
│ ║      مركب مريم - قاعة تاج           ║  ¦                       │
│ ║      📅 الجمعة 30 أكتوبر 2026        ║  ¦                       │
│ ║      🕘 على الساعة التاسعة ليلا      ║  ¦                       │
│ ║      📍 طريق المهدية كلم 10 - صفاقس  ║  ¦                       │
│ ║      map note   [ directions ]     ║  ¦                       │
│ ║                                    ║  ¦                       │
│ ║      blessing heading              ║  ¦                       │
│ ║      prayer (gold)  ~~♥~~  message ║  ¦                       │
│ ║                                    ║  ¦                       │
│ ║              ~~♥~~                 ║  ¦                       │
│ ║      و لكم العاقبة في الأفراح و المسرات ║  ¦                       │
│ ║🌹🌿                              ❧ ║  ¦                       │
│ ╘════════════════════════════════════╛  ¦                       │
└──────────────────────────────────────────────────────────────────┘
```

Mobile: the leaf (100svh, word + flourish + guest line + open button, roses
top inline-end and bottom inline-start), then the pages panel as one frame,
same order of content, countdown as one row of four numerals.

## 5. Components and ownership

### `components/CoverLeaf/CoverLeaf.tsx` + `.module.css`

```ts
type CoverLeafProps = {
  isOpen: boolean;
  onOpen: () => void;
  className?: string;
  ref?: React.Ref<HTMLElement>;   // React 19: ref is a normal prop
};
```

Renders `<section ref className>` containing: `PanelFrame`, two `RoseCorner`s
(top inline-end, bottom inline-start), then centred: the word
`dict.cover.word` in display-word style (`<h1>` when closed; keep it an
`<h1>`; the couple names in the pages panel are an `<h2>` styled as
display-names), `FlourishHeart` at 7rem, the **guest line**, and the open
button (`dict.cover.tapToOpen`) rendered only while `!isOpen`.

Guest line: a 16rem-wide (max 80% of panel) line drawn with
`border-bottom: 1px dotted var(--foil)` (dot pitch ~0.35rem via
`repeating-linear-gradient` if `dotted` looks too dense). The guest's name
comes from the `to` search param: implement a `GuestName` child that calls
`useSearchParams()` and is wrapped in `<Suspense fallback={null}>` (read
`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md`
first). Sanitise: `.trim()`, cap at 40 characters, render as a text node. With
no param the line is shown empty, exactly as printed.

Open button: 1px `--foil` outline, radius 0, padding 0.8rem 2rem, ui type,
`--gold-ink` text; hover/focus-visible fills `--gold-ink` with `--paper` text
in 200ms (colour only). The existing audio hook (an `<audio>` element and
`.play()` on click, ignoring errors) moves here unchanged
(`/audio/wedding-music.mp3`, `preload="none"`, loop).

Focus: 2px solid `--gold-ink` outline, 3px offset, on the button.

### `components/Countdown/Countdown.tsx` + `.module.css` (restyle)

Props unchanged (`targetDate`). Heading (`dict.countdown.heading`) in heading
style. Below it one row, always four columns: `grid-template-columns:
repeat(4, minmax(0, 1fr))`, gap 0.5rem at 320px up to 2.5rem desktop.
Numerals in numerals style, labels beneath in small style. Zero-padded to two
digits, three when days ≥ 100. No borders, no rules, no boxes, no odometer
animation: digits change in place. Keep `aria-live="off"` and the per-unit
`aria-label`.

### `components/EventDetails/EventDetails.tsx` + `.module.css` (new, replaces EventCard)

```ts
type EventDetailsProps = { mapUrl: string };
```

Reads `dict.events.wedding`. Renders, centred: `dict.events.heading`
(heading style), `wedding.title` (body, ink), `wedding.venueName` (venue
style, explicit `--font-latin`), `wedding.venueSubName` (body), then three
icon-led lines: calendar + `dateLabel`, clock + `timeLabel`, pin +
`addressLabel`. Icons are 1.05rem line SVGs, stroke 1.25, `--foil`,
0.6rem gap to the text, 0.6rem between lines, each line an inline-flex row
that wraps naturally at 320px. Then `mapNote` (small) and the directions link
(`mapCtaLabel`) styled exactly like the cover's outlined button, with the pin
icon inside it, `target="_blank" rel="noreferrer"`. No card, no box, no
shadow, no badge, no number.

### `components/BlessingSection/BlessingSection.tsx` + `.module.css` (restyle)

Props: none (drop `isVisible`). Heading (`dict.blessing.heading`) in heading
style, then the prayer in prayer style, then `FlourishHeart` at 5rem, then
`dict.blessing.message` in body style with `max-width: 30rem`. No crest, no
circle, no animation.

### `components/ClosingMessage/ClosingMessage.tsx` + `.module.css` (restyle)

Props: none. `FlourishHeart` at 7rem, then `dict.closing.message` in
display-closing style. No florals (the panel's bottom rose belongs to the
pages panel, not this component).

### `components/ArchFrame/ArchFrame.tsx` + `.module.css` (closed niche)

Same props (`children`, `className`). Becomes the closed mihrab niche as
printed: keep the SVG head (double line, finial). The body keeps two side
rails on each side (outer `--foil`, inner `--foil-soft`, 10px apart at the
same x as the head's lines) that no longer fade, and closes at the bottom with
the same double line. Fill the whole niche (head + body) with `--paper-light`
so the verse sits on a subtly lighter panel. `max-width: 30rem`, inner padding
1.5rem (1rem on mobile).

### `components/LanguageSwitcher/LanguageSwitcher.tsx` + `.module.css` (restyle)

Same behaviour (writes `lang`, `dir`, `document.title`). Three text buttons
`AR FR EN` in ui type, `--ink-soft`, 1rem gap, no pill, no background, no
border, no separators. Active: `--gold-ink` with a 1px dotted `--foil`
underline (`border-bottom`). Hover: colour to `--gold-ink` in 150ms. Focus:
2px `--gold-ink` outline, 3px offset. Tap target ≥ 2.75rem via padding.
Position: `position: fixed; top: 1.25rem; inset-inline-end: 2rem` on desktop
(it sits on the ground above the sheet); below 760px it moves inside the leaf
frame at `top: 1rem; inset-inline-start: 1rem` (the leaf's rose is at the top
inline-end, so the switcher takes the other corner; hide that corner curl
below 760px). Keep `z-index` above the sheet.

### `app/page.tsx` + `app/page.module.css` (composition, opening moment)

- State: `isOpened`. Remove `useScrollReveal`, the `--page-scroll` effect,
  drifting `::before/::after` rings, tinted section shells, botanicals, the
  verse word-by-word animation. Render the verse as one plain paragraph.
- Structure: `<main className={styles.main}>` (background `--ground`, no
  overflow rules) → `<LanguageSwitcher />` → `<div className={sheet + (isOpened ? open : closed)}>`
  → `<CoverLeaf ref={leafRef} isOpen={isOpened} onOpen={open} className={styles.leaf} />`
  → `<section className={styles.pages} aria-hidden={!isOpened}>` containing
  `PanelFrame`, two `RoseCorner`s (top inline-end, bottom inline-start), and
  the content stack: intro, Countdown, EventDetails, BlessingSection,
  ClosingMessage, separated by `var(--gap-section)`.
- Intro: `ArchFrame` (bismillah in bismillah style, verse in verse style as
  one `<p>`), 1.5rem, families line (body), 1.5rem, couple names `<h2>` in
  display-names, 1rem, `FlourishHeart` 7rem, 1rem, date sentence (body,
  `--gold-ink` is NOT used here; ink).
- Closed state (CSS only, so first paint is right without JS): the sheet grid
  collapses to one centred column holding the leaf (`grid-template-columns:
  minmax(20rem, 28rem); justify-content: center`) and `.pages` is
  `display: none`. On mobile closed = leaf at 100svh, pages hidden, body
  scroll not locked.
- Opening (the single orchestrated moment): on click, run a FLIP on the
  leaf: read `leafRef.getBoundingClientRect()` before `setIsOpened(true)`;
  in a `useLayoutEffect` keyed on `isOpened`, read the new rect, apply
  `transform: translate(dx, dy)` with no transition, force a reflow, then
  transition `transform` to `none` over 700ms `cubic-bezier(.2,.8,.2,1)`.
  Simultaneously `.pages` appears with a `clip-path` animation from
  `inset(0 0 0 100%)` (LTR) / `inset(0 100% 0 0)` (RTL) to `inset(0)` over
  700ms with the same easing (write both via `html[dir="rtl"]`), plus its
  roses fading in over the last 300ms. On mobile the FLIP delta is zero; after
  the pages panel mounts, `scrollIntoView({behavior: 'smooth', block: 'start'})`
  on it (auto under reduced motion). Under `prefers-reduced-motion: reduce`
  the state simply switches: no FLIP, no clip animation.
- The audio play call stays in `CoverLeaf`.
- `WEDDING_DATE` and `WEDDING_MAP_URL` constants stay in `page.tsx`.

## 6. Motion policy

One orchestrated moment: the opening described above. Motion that answers the
user: button and link hover/focus colour (200ms), switcher hover colour
(150ms), language change (a 250ms opacity settle on the sheet text is
allowed, nothing moves). Nothing else moves, ever: no scroll reveals, no
parallax, no drifting shapes, no swaying leaves, no odometer, no per-word
verse animation. Under reduced motion all transitions are instant.

## 7. Responsive floor checks (320px, measure ≈ 260px)

Cover word floors at 5.5rem Arabic (≈190px wide) and 2.75rem Latin
("Invitation" fits on one line). Names floor at 3rem / 2.25rem. Numerals
floor at 2rem so `052 09 30 12` fits four across with 0.5rem gaps. Event
lines wrap under a 1.05rem icon. Buttons may take the full measure width.
Nothing may cause horizontal scrolling of the document at any width from
320px to 1920px.

## 8. Accessibility floor

Visible focus (2px `--gold-ink` outline, 3px offset) on every focusable
element. Body text ≥ 4.5:1 (`--ink`, `--ink-soft` on `--paper` pass);
`--gold-ink` on `--paper` is 5.2:1 and is the only gold used for text. The
pages panel is `aria-hidden` while closed. Decorative SVGs are
`aria-hidden="true" focusable="false"`. `prefers-reduced-motion` honoured as
in §6.

## 9. Retired

Retired and no longer imported anywhere: `components/Envelope`,
`components/EventCard`, `components/FloralDecoration`,
`components/InvitationBotanicals`, `components/WeddingCrest`,
`lib/useScrollReveal.ts`. Do not import, restyle or extend them; they are
safe to delete.

## 10. Global classes to use (defined in `app/globals.css`)

- Type roles, Latin by default with Arabic overrides under `html[dir="rtl"]`:
  `.t-display-word`, `.t-display-names`, `.t-display-closing`,
  `.t-bismillah`, `.t-verse`, `.t-prayer`, `.t-venue`, `.t-numerals`,
  `.t-heading`, `.t-body`, `.t-small`, `.t-guest`, `.t-ui`, and `.latin`
  (forces the Latin face on a Latin string inside an Arabic page). Use these
  plain class names directly (they are global, not module classes); do not
  redefine font sizes or families in component modules.
- `.panel`: paper background, grain, radial lift, `position: relative`,
  `overflow: clip`. Every framed panel uses it.
- `.btn-outline`: the outlined gold button, for the cover button and the
  directions link (an `<a>` gets the same class).
- Tokens: `--frame-inset` and `--gap-section` already switch at 759px.
- Ornaments: `PanelFrame`, `CornerCurls`, `FlourishHeart` from
  `components/Ornaments/Ornaments.tsx`; `RoseCorner` from
  `components/RoseCorner/RoseCorner.tsx` (props: `corner`
  `"top-left" | "top-right" | "bottom-left" | "bottom-right"`, `className`;
  size via `--rose-size`, offset via `--rose-offset`). Because `RoseCorner`
  takes physical corners, pick the corner from `dir`: use
  `useLanguage().dir` and map inline-end to `right` in LTR and `left` in RTL.
