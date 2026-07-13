<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c1f0cca7-a28f-4b12-982d-b5f11ff56a4a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Sitemap

`npm run build` now creates `dist/sitemap.xml` that lists every public route. The build step automatically runs `scripts/generate-sitemap.js`, which defaults to `https://rubioinsideout.ch` so the sitemap already advertises your live site. If you deploy to another domain or want to preview elsewhere, set `SITEMAP_BASE_URL` (for example `SITEMAP_BASE_URL=https://rubioinsideout.com npm run build`) and the script will honor that instead.

`robots.txt` is generated alongside the sitemap and allows every user agent while pointing them to the sitemap URL. You do not need to edit `robots.txt` after a build unless you want to block specific crawlers or disallow sections.

## SEO metadata

`AppLayout` now updates `<title>` and `<meta name="description">` on every route using the map defined in `src/seo.ts`. Each path has a bespoke title/description, and missing routes fall back to the default metadata there. Update `routeMeta` if you want to refresh wording for a specific page—no further changes are required in the React components themselves.

## Home hero carousel videos

All MP4 files in `public/videos/home_carousel/` are used exclusively as short-loop background clips for the home page hero carousel in `src/pages/subpages/Home.tsx`.

- `home_snowboarding.mp4`
- `home_iceskating.mp4`
- `home_skiing.mp4`
- `home_freediving.mp4`
- `home_pumpfoiling.mp4`
- `home_weightlifting.mp4`
- `home_highlining.mp4`
- `home_mountaineering.mp4`
- `home_hs1.mp4`
- `home_aggr.mp4`

Playback is randomized with no repeats until all videos have played once (via `videoOrder` and `orderIdx`).
