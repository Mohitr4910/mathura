# Mathura Mithai Wala — cinematic scroll website (React + Vite + GSAP + Lenis)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build -> dist/
    npm run preview

## 1. Change frame count / scroll length
`src/config.js`
- `TOTAL_FRAMES` (this zip has 279 frames; frames must be /public/frames/frame_0001.webp ...)
- `SCROLL_LENGTH` ("+=900%") and `SCROLL_LENGTH_MOBILE` ("+=650%") = how long the pinned hero lasts.
- `LERP` (0.08) = inertia. Lower = floatier. `FIRST_BATCH` / `BATCH_SIZE` = preload strategy.
- Mobile loads every 2nd frame automatically (`getFrameStep`).

## 2. Adjust text timing
`src/components/HeroText.jsx` -> `STORY_TIMING` (progress 0..1 for each chapter), `FADE_IN`, `FADE_OUT`.
Rail chapter numbers switch in `Hero.jsx` (onUpdate thresholds).

## 3. Replace images / content
Everything is in `src/data/content.js`: BRAND (name, city, year, WhatsApp number, address, map), sweets + prices,
festivals, reviews, FAQs, timeline. Unsplash IDs live in `PHOTO_IDS`; replace with your own photos
(`/public/images/...`). If a remote image fails, the site falls back to /public/images/fb-N.webp.
Shop logo/name in the loader and nav comes from BRAND.short / BRAND.sub.

## 4. Deploy
Vercel: import repo -> Framework "Vite" -> build `npm run build`, output `dist`.
Netlify: build `npm run build`, publish `dist`. (Frames are static files; enable long cache headers for /frames/*.)

## 5. Performance checklist
- Frames as WebP ~1280px (done). Keep each < 40 KB if possible.
- Only transform/opacity are animated; canvas redraws only when the rounded frame changes.
- Cache headers: /frames/* and /assets/* `Cache-Control: public, max-age=31536000, immutable`.
- Host Unsplash images yourself (WebP, correct sizes) for best LCP.
- Test on a real phone; lower SCROLL_LENGTH_MOBILE or frame step if it stutters.
- Lighthouse: check CLS (images have width/height) and fonts (self-host Google Fonts if needed).
