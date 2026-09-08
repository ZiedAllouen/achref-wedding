# Achraf & Molka - Wedding Invitation

Trilingual (Arabic, French, English) wedding invitation website for the
wedding of Achraf & Molka on Friday, 30 October 2026 at Tej Palace
(Complexe Mariem, Route de Mahdia km 10, Sfax).

Built with Next.js 16 (App Router) and React 19. Derived from the
"Nuur & Wajdi" invitation, restyled after the printed card: cream
parchment, gold double frame, ivory roses with sage leaves, and the arch
ornament around the Qur'anic verse.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` and `npm run lint` must pass
before deploying.

## Where the content lives

| What | File |
| --- | --- |
| All visible text, per language | `lib/i18n/dictionaries/{ar,fr,en}.json` |
| Dictionary shape | `lib/i18n/types.ts` |
| Wedding date (countdown) and Google Maps link | `app/page.tsx` (`WEDDING_DATE`, `WEDDING_MAP_URL`) |
| Site title, description, canonical URL | `app/layout.tsx` (`metadataBase`) |
| Social preview image | `app/opengraph-image.tsx` |
| Cover screen (envelope) | `components/Envelope/` |
| Rose corner illustration | `components/RoseCorner/` |
| Gold arch ornament | `components/ArchFrame/` |

## Before going live

- Update `metadataBase` in `app/layout.tsx` to the final domain so the
  Open Graph image resolves correctly.
- Optionally drop a background track at `public/audio/wedding-music.mp3`
  (see `public/audio/README.md`); the cover plays it when the envelope
  is opened and silently skips it when the file is missing.
- The map button opens a Google Maps search for the venue. Replace
  `WEDDING_MAP_URL` with the exact place link if you have one.
