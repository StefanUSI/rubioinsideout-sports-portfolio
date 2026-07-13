/**
 * Reactive media-query hooks.
 *
 * Why custom hooks instead of a CSS-only approach?
 *  - Several components need to conditionally render different DOM trees
 *    (e.g. Home’s hero video carousel is desktop-only; sport pages reduce
 *    particle counts on mobile). CSS `display:none` would still mount the
 *    heavy elements; these hooks prevent them from mounting at all.
 */
import { useState, useEffect } from "react";

/**
 * Returns true when the viewport matches the given media query string.
 * SSR-safe: defaults to false on the server / first render.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/** True when width >= 768px (Tailwind `md` breakpoint). */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
