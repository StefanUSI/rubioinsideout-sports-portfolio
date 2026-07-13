/**
 * Theme Configuration — the single source of truth for visual properties.
 *
 * Edit THIS FILE to customise colors, layout, and spacing across the
 * entire site. Changes here propagate to all pages automatically.
 *
 * ─── How it works ────────────────────────────────────────────────────
 * • Layout tokens are imported by every page and shared component.
 * • Sport color configs are consumed by `palettes.ts`, which auto-derives
 *   the full palette (footer colors, skill-bar colors, video borders, …)
 *   from just `bg`, `accent`, and `isDark`.
 * • Page colors control non-sport-page themes (Handstands, Home dark sections).
 *
 * ─── Rules ───────────────────────────────────────────────────────────
 * • Layout values are Tailwind utility class strings. Only use classes
 *   that Tailwind ships by default (e.g. max-w-7xl, px-6, py-24).
 * • Color values are hex strings (e.g. "#FB8500").
 * • `isDark` defaults to true if omitted.
 * • `text` defaults to #ffffff (dark) / #000000 (light) if omitted.
 * • `taglineColor` is a Tailwind text class; defaults to text-white/70
 *   (dark) or text-black/70 (light) if omitted.
 */

// ── Layout Tokens ─────────────────────────────────────────────────────

const _maxWidth = "max-w-7xl";
const _paddingX = "px-4 sm:px-6 lg:px-8";
const _sectionPaddingY = "py-24 md:py-40";

export const layout = {
  /** Maximum content width (Tailwind class, e.g. "max-w-7xl" = 80rem = 1280px) */
  maxWidth: _maxWidth,
  /** Responsive horizontal padding (mobile → tablet → desktop) */
  paddingX: _paddingX,
  /** Default vertical section padding */
  sectionPaddingY: _sectionPaddingY,
  /** Composed: centered content container */
  container: `${_maxWidth} mx-auto`,
  /** Composed: full section padding (vertical + horizontal) */
  sectionPadding: `${_sectionPaddingY} ${_paddingX}`,
} as const;

// ── Sport Color Configuration ─────────────────────────────────────────

export interface SportColorConfig {
  /** Background color (hex) */
  bg: string;
  /** Accent / highlight color (hex) */
  accent: string;
  /** Dark theme? Drives text, footer, and skill-bar color derivation. Default: true */
  isDark?: boolean;
  /** Override main text color (hex). Default: #ffffff (dark) / #000000 (light) */
  text?: string;
  /** Override tagline Tailwind class. Default: text-white/70 (dark) / text-black/70 (light) */
  taglineColor?: string;
}

export const sportColors: Record<string, SportColorConfig> = {
  calisthenics:   { bg: "#0a0a0a", accent: "#FB8500", taglineColor: "text-white/50" },
  flowarts:       { bg: "#050505", accent: "#9B5DE5" },
  freediving:     { bg: "#001830", accent: "#0077B6" },
  highlining:     { bg: "#B8C5D6", accent: "#4A6274", isDark: false },
  iceskating:     { bg: "#778CA1", accent: "#90DBF4", text: "#f0f9ff" },
  inlineskating:  { bg: "#1c1917", accent: "#FFBE0B", text: "#e7e5e4" },
  mountaineering: { bg: "#0f172a", accent: "#8D6E63" },
  pumpfoiling:    { bg: "#313A43", accent: "#2EC4B6" },
  skiing:         { bg: "#FFFFFF", accent: "#000000", isDark: false, taglineColor: "text-black/60" },
  snowboarding:   { bg: "#000000", accent: "#8A8A8A", taglineColor: "text-white" },
  surfskating:    { bg: "#BEC5CA", accent: "#3E5463", isDark: false, text: "#1f2933" },
  viaferrata:     { bg: "#756832", accent: "#F2D98E", taglineColor: "text-white/50" },
  weightlifting:  { bg: "#111111", accent: "#e63946" },
};

// ── Page Colors (non-sport pages) ─────────────────────────────────────

export const pageColors = {
  handstands: { bg: "#0f172a", accent: "#70E000" },
} as const;
