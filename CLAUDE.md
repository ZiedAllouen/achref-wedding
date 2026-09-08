# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Single-page, trilingual (Arabic default, French, English) wedding invitation for
Achraf & Molka: Friday 30 October 2026, 21:00, Tej Palace (Complexe Mariem,
Route de Mahdia km 10, Sfax). Next.js 16 App Router, React 19, TypeScript, CSS
Modules. No test suite. Not a git repository and not deployed yet.

It is a sibling of the `nuurandwajdi` invitation (`C:\Users\Zied\nuurandwajdi`):
same structure, different content and palette. Fixes that apply to the shared
structure are usually worth porting to the other project.

## Commands

Package manager is pnpm (`pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build; also runs the TypeScript check (no separate typecheck script)
pnpm lint         # eslint (flat config, eslint-config-next)
pnpm start -- -p 3117
```

Never run `pnpm build` while a `pnpm start` server is running: the new build
replaces the chunk files the live server still references, every script 404s,
and the page loses all interactivity (buttons and language switch go dead) until
the server is restarted.

If the `node_modules/.bin` shims fail on Windows, call the binaries directly:

```bash
node node_modules/next/dist/bin/next build
node node_modules/eslint/bin/eslint.js
```

Verification is visual: build, start the server, then screenshot with Playwright
(Python and Playwright are installed on this machine). Emulate
`reduced_motion="reduce"` to capture every section in its final state;
otherwise scroll-reveal keeps off-screen sections at opacity 0. The only
expected console error is a 404 for `/audio/wedding-music.mp3` (see below).

## Architecture

**One client page.** `app/page.tsx` owns `isOpened`: while false it renders the
full-screen `Envelope` cover; when the guest opens it, the invitation renders in
order: intro (`ArchFrame` with bismillah and verse, families line, couple names,
date sentence), `Countdown`, one `EventCard`, `BlessingSection`,
`ClosingMessage`. `InvitationBotanicals` and two `RoseCorner`s frame the content.

**i18n is state, not routing.** `lib/i18n/LanguageContext.tsx` keeps `lang` in
React state (default `ar`, nothing persisted). Every visible string comes from
`lib/i18n/dictionaries/{ar,fr,en}.json`, typed by `lib/i18n/types.ts`; adding a
string means adding the key to the type and all three JSON files.
`LanguageSwitcher` writes `lang`/`dir` onto `<html>` and updates
`document.title`. The server-rendered default is `<html lang="ar" dir="rtl">`, so
layout must work in both directions: use logical properties or
`html[dir="rtl"]` overrides (fonts, letter-spacing, line-height differ per script).

**Content that is not in the dictionaries** lives in code:
- `app/page.tsx`: `WEDDING_DATE` for the countdown (Tunisia is UTC+1 all year)
  and `WEDDING_MAP_URL` (currently a Google Maps search, not a place link).
- `app/layout.tsx`: `metadataBase` (placeholder domain), title and description
  taken from the Arabic dictionary, and all `next/font/google` loaders.
- `app/opengraph-image.tsx`: social preview text, rendered with `next/og`
  (inline styles only, every `div` needs `display: flex`).

**Fonts and palette.** Fonts are exposed as CSS variables from the layout:
`--font-heading-latin` (Playfair Display), `--font-body-latin` (Cormorant
Garamond), `--font-heading-arabic` (Amiri, the RTL body font), and
`--font-display-arabic` (Aref Ruqaa, only for the couple's names and the Arabic
bismillah). Colour tokens are in `app/globals.css`: cream, gold, ivory, sage.
The design follows the printed card; there is no pink or rose in the palette.

**Motion.** `lib/useScrollReveal.ts` gives each section `isVisible`, `isActive`
and a `--section-progress` CSS variable used for parallax. Entrances use the
global `.reveal`/`.revealed` classes plus per-module `visible` classes. Every
animation must honour `prefers-reduced-motion`: `globals.css` zeroes durations
globally, but it does not touch `animation-delay`, so any staggered animation
needs its own `animation: none` override in the module's reduced-motion block
with at least the same selector specificity as the animating rule.

**Decorative SVG components** (`RoseCorner`, `ArchFrame`, `FloralDecoration`,
`InvitationBotanicals`, `WeddingCrest`) are presentational and `aria-hidden`.
`RoseCorner` and `FloralDecoration` draw one corner and mirror to the others
through CSS custom properties; `ArchFrame` is a fixed-ratio SVG head plus CSS
side rails so it fits any content height.

**Envelope cover** is CSS only (parchment, gold frame, roses). On open it tries to
play `/public/audio/wedding-music.mp3`; the file is intentionally absent and the
resulting 404 is expected. Drop a real track there to enable music.

## Conventions

- One CSS Module per component. Shared text primitives (`.bismillah`, `.verse`,
  `.invitation`, `.reveal`) are global classes in `app/globals.css` and are
  referenced from modules through `:global()`.
- Section chrome (`sectionShell`, tone classes, `scrollFrame`) lives in
  `app/page.module.css`; components style only their own interior.
- Before going live: confirm the family-name transliterations in `fr.json` and
  `en.json`, set the real domain in `metadataBase`, and replace
  `WEDDING_MAP_URL` with the venue's exact place link if available.
