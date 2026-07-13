/**
 * Central sport registry — the single source of truth for all sport pages.
 *
 * Each entry defines a sport’s URL slug, display label, sort order, palette
 * key, optional URL aliases, and a lazy-loaded page component. The registry
 * drives:
 *  - Route generation in App.tsx (via flatMap over slugs + aliases)
 *  - Navbar sport dropdown (sorted by sortOrder)
 *  - Home page sport grid ordering
 *  - Palette & skill lookups by slug
 *
 * Lazy-loading each page component via React.lazy ensures the main bundle
 * stays small; each sport page (and its dependencies) ships as a separate
 * chunk that loads only when the user navigates to that route.
 */
import { lazy, type LazyExoticComponent, type ComponentType } from "react";
import type { SportPalette } from "./palettes";
import { sportPalettes } from "./palettes";

export interface SportEntry {
  /** URL slug — used as route path and palette key */
  slug: string;
  /** Display label (English) — used in navbar, cards, etc. */
  label: string;
  /** Display order on the home page (lower = first) */
  sortOrder: number;
  /** Palette key in sportPalettes (defaults to slug if omitted) */
  paletteKey?: string;
  /** Additional route aliases, e.g. "freeskating" → inlineskating */
  aliases?: string[];
  /** Lazy-loaded page component */
  Component: LazyExoticComponent<ComponentType>;
}

export const SPORT_REGISTRY: SportEntry[] = [
  {
    slug: "skiing",
    label: "Skiing",
    sortOrder: 1,
    Component: lazy(() => import("../pages/Skiing")),
  },
  {
    slug: "snowboarding",
    label: "Snowboarding",
    sortOrder: 2,
    Component: lazy(() => import("../pages/Snowboarding")),
  },
  {
    slug: "highlining",
    label: "Highlining",
    sortOrder: 3,
    Component: lazy(() => import("../pages/Highlining")),
  },
  {
    slug: "pumpfoiling",
    label: "Pumpfoiling",
    sortOrder: 4,
    Component: lazy(() => import("../pages/Pumpfoiling")),
  },
  {
    slug: "freediving",
    label: "Freediving",
    sortOrder: 5,
    Component: lazy(() => import("../pages/Freediving")),
  },
  {
    slug: "inlineskating",
    label: "Inline Skating",
    sortOrder: 6,
    aliases: ["freeskating"],
    Component: lazy(() => import("../pages/InlineSkating")),
  },
  {
    slug: "iceskating",
    label: "Ice Skating",
    sortOrder: 7,
    Component: lazy(() => import("../pages/IceSkating")),
  },
  {
    slug: "surfskating",
    label: "Surfskating",
    sortOrder: 8,
    Component: lazy(() => import("../pages/Surfskating")),
  },
  {
    slug: "mountaineering",
    label: "Mountaineering",
    sortOrder: 9,
    Component: lazy(() => import("../pages/Mountaineering")),
  },
  {
    slug: "calisthenics",
    label: "Calisthenics",
    sortOrder: 10,
    Component: lazy(() => import("../pages/Calisthenics")),
  },
  {
    slug: "weightlifting",
    label: "Weightlifting",
    sortOrder: 11,
    Component: lazy(() => import("../pages/Weightlifting")),
  },
  {
    slug: "flowarts",
    label: "Flowarts",
    sortOrder: 12,
    Component: lazy(() => import("../pages/Flowarts")),
  },
  {
    slug: "viaferrata",
    label: "Via Ferrata",
    sortOrder: 13,
    paletteKey: "viaferrata",
    Component: lazy(() => import("../pages/ViaFerrata")),
  },
];

/** All sport slugs (including aliases like "freeskating") */
export const ALL_SPORT_SLUGS: string[] = SPORT_REGISTRY.flatMap((s) => [
  s.slug,
  ...(s.aliases ?? []),
]);

/** Get palette for a sport entry */
export function getPalette(entry: SportEntry): SportPalette {
  return sportPalettes[entry.paletteKey ?? entry.slug];
}

/** Lookup a registry entry by slug or alias */
export function findSportBySlug(slug: string): SportEntry | undefined {
  return SPORT_REGISTRY.find(
    (s) => s.slug === slug || s.aliases?.includes(slug)
  );
}

/** Registry entries in display order (non-mutating copy) */
export const SPORT_REGISTRY_SORTED: SportEntry[] = [...SPORT_REGISTRY].sort(
  (a, b) => a.sortOrder - b.sortOrder
);

/** Sorted labels for home page display */
export const SPORT_LABELS_SORTED = SPORT_REGISTRY_SORTED.map((s) => s.label);
