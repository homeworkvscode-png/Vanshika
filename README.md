# A Little Something For You 💖

A six-page pink, blush & white scrapbook birthday site, built with React + Vite.
Soft romantic gingham/paper texture, polaroid-style photos, a fullscreen
cursor-spotlight landing moment, and a cinematic fullscreen video reveal.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a static production bundle you can host anywhere:

```bash
npm run build   # outputs to dist/
npm run preview # preview that production build locally
```

## Pages

1. **Landing** — fullscreen cursor spotlight (`mask-image: radial-gradient`)
   over a darker pink overlay, center text "Happy Birthday ❤️".
2. **Letter** — a short handwritten-style note.
3. **Collage** — a small curated set of rotated polaroid photos with washi
   tape / sticker decorations. Click a photo to open the lightbox.
4. **Gallery** — a responsive grid built to hold *many* photos. Reachable
   any time via the **🖼️ Gallery** button pinned top-right on every page.
   Click any photo to open the fullscreen lightbox.
5. **Cinematic video** — the moment you land here, the whole UI fades to a
   dark pink/near-black backdrop, side vignettes frame the screen, and the
   video autoplays (muted, with controls) centered on screen.
6. **Feedback** (final page) — a thank-you moment with a name + message
   form ("no backend needed" — pure UI, shows a "Thank you ❤️" confirmation
   on submit). Also reachable any time via the floating **💌 Feedback**
   button pinned bottom-right.

## Where things live

```
public/
  images/
    collage/          ← Page 3 (Collage): img1.jpg – img6.jpg
    gallery/           ← Page 4 (Gallery): img1.jpg – img12.jpg (add as many as you like)
  videos/
    video1.mp4         ← Page 5 (cinematic video)
src/
  content.js           ← ALL editable text + media arrays — start here
  index.css            ← design tokens, gingham pattern, every component's styles
  App.jsx              ← page navigation + the two fixed nav shortcuts
  components/           reusable pieces: WashiTape, Sticker, PolaroidFrame,
                         SpotlightLanding, FloatingHearts, Button, PageDots,
                         GalleryButton, FeedbackButton, Lightbox
  pages/                 the six pages themselves
```

## Personalizing it

1. Open `src/content.js` — change the recipient name, letter body, and
   every caption in one place.
2. Drop your collage photos at `public/images/collage/img1.jpg` through
   `img6.jpg` (or edit `COLLAGE_ITEMS` to add/remove/rename them).
3. Drop your gallery photos at `public/images/gallery/img1.jpg`,
   `img2.jpg`, etc. `GALLERY_ITEMS` in `content.js` generates 12 slots by
   default — change the `length: 12` to add more, or hand-write the array
   for custom captions.
4. Drop your video at `public/videos/video1.mp4`.

All of this is optional to get started — if an image or video file is
missing, that spot falls back to a soft built-in placeholder instead of
showing a broken image/player, so the site never looks broken while
you're still gathering media.

## Notes on the trickier bits

- The landing spotlight and the cinematic video stage are both rendered
  through a React portal straight into `<body>` (`createPortal`), so they
  always cover the true fullscreen viewport instead of getting boxed in
  by the page-entrance animation's transform on `.page-frame`.
- The spotlight mask position is driven by a `requestAnimationFrame` loop
  with linear-interpolation smoothing (`src/components/useSpotlightTracking.js`)
  writing straight to CSS custom properties (`--mx`/`--my`) — no React
  re-renders per frame, so it stays smooth even on lower-end phones. On
  touch-only devices it drifts gently on its own instead of requiring a
  cursor.
- The Gallery button (top-right) and Feedback button (bottom-right) are
  fixed-position and present on every page except the Landing spotlight
  and the fullscreen video, so they're reachable in one tap from anywhere.
- `prefers-reduced-motion` is respected throughout (hearts, heartbeat,
  page-entrance animation, lightbox zoom, cinema fade-in).
