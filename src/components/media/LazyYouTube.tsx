/**
 * Click-to-load YouTube embed (façade pattern).
 *
 * Shows the video's static thumbnail with a play overlay initially and only
 * mounts the `<iframe>` after the user clicks. This keeps every third-party
 * YouTube request (player JS, cookies, tracking) off the initial page load —
 * a major win for LCP/INP on video-heavy pages.
 *
 * Uses the youtube-nocookie.com domain so no tracking cookies are set until
 * the visitor actively plays a video, in line with the site's privacy policy.
 *
 * Shared by VideoSection (home page) and SportVideos (sport subpages).
 */
import { useState } from "react";

export default function LazyYouTube({ id, title }: { id: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="absolute inset-0 w-full h-full cursor-pointer group/play"
      aria-label={`Play ${title}`}
    >
      <img
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/10 transition-colors" />
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white opacity-90 group-hover/play:opacity-100 group-hover/play:scale-110 transition-all" viewBox="0 0 68 48">
        <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
        <path d="M45 24L27 14v20" fill="white"/>
      </svg>
    </button>
  );
}
