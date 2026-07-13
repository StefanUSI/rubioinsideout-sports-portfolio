# Video Assets

- `hero/home/` — short loop clips for the home-page hero carousel
  (`HERO_VIDEOS` in `src/features/home/Home.tsx`). Playback order is
  shuffled per visit with no repeats until every clip has played once.
- `hero/<sport>/` — intro clip for each sport subpage, played once by
  `HeroVideoBackground` before cross-fading to the static hero image.
- `body/` — supplementary in-page clips.

Every `.mp4` should ship with a matching `.webm` (smaller, VP9). Generate
missing ones with `npm run convert-videos` (requires ffmpeg on PATH).
