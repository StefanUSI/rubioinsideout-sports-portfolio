/**
 * Sport colour palettes — auto-derived from theme.config.ts.
 *
 * The palette object each sport page receives is built automatically from
 * the minimal { bg, accent, isDark } config in theme.config.ts. Consumers
 * only need `bg`, `text`, `accent`, `isDark`, and `taglineColor`. All
 * other visual properties (skill-bar colors, footer tones, video-card
 * borders) are derived at runtime via inline styles in each component —
 * no Tailwind class strings are generated, so changing an accent hex in
 * theme.config.ts propagates everywhere without rebuild concerns.
 *
 * `hexAlpha()` is a utility for appending a hex-encoded alpha channel;
 * it's used by consuming components to create semi-transparent variants
 * of palette colors (e.g. border highlights, skill-box backgrounds).
 */
import { sportColors, type SportColorConfig } from "@/config/theme.config";

export interface SportPalette {
  bg: string;
  text: string;
  accent: string;
  isDark: boolean;
  taglineColor: string;
}

/** Append hex-encoded alpha to a hex color, e.g. hexAlpha("#0077B6", 0.3) → "#0077B64d" */
export function hexAlpha(hex: string, alpha: number): string {
  return hex + Math.round(alpha * 255).toString(16).padStart(2, '0');
}

function buildPalette(input: SportColorConfig): SportPalette {
  const isDark = input.isDark ?? true;
  return {
    bg: input.bg,
    text: input.text ?? (isDark ? "#ffffff" : "#000000"),
    accent: input.accent,
    isDark,
    taglineColor: input.taglineColor ?? (isDark ? "text-white/70" : "text-black/70"),
  };
}

export const sportPalettes: Record<string, SportPalette> = Object.fromEntries(
  Object.entries(sportColors).map(([key, config]) => [key, buildPalette(config)]),
);
