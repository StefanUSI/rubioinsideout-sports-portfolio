/**
 * Shared framer-motion animation presets used across sport subpages.
 *
 * Centralised here so every sport page animates consistently without
 * duplicating transition objects. Each preset is typed `as const` to
 * preserve literal types, allowing the spread `{...fadeInLeft}` to be
 * fully type-safe when passed to `<motion.div>`.
 *
 * All presets use `viewport: { once: true }` so animations only fire
 * on the first scroll into view, reducing GPU work on scroll-heavy pages.
 */

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true },
} as const;

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true },
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
  viewport: { once: true },
} as const;
