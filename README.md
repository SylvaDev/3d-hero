# Aventador Scroll Experience

A production-ready Next.js website built around a 240-frame image sequence for a premium scroll-driven automotive hero.

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- GSAP ScrollTrigger

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel
1. Upload the folder to GitHub or import directly into Vercel.
2. Framework preset: Next.js
3. Build command: `next build`
4. Output: default Next.js output

## Notes
- Frames are stored in `/public/frames`
- The hero uses a canvas with scroll-scrubbed playback
- The UI is intentionally premium and minimal so it can be extended into a full campaign or showcase site
