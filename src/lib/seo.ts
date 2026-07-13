/**
 * SPA-compatible SEO module.
 *
 * Because this is a client-rendered SPA (no SSR), we rely on imperative DOM
 * manipulation to set <title>, <meta>, <link rel="canonical">, hreflang
 * alternates, and JSON-LD structured data for each route.
 *
 * `applySEOMeta(pathname)` is called from AppLayout on every navigation.
 * It looks up a static `routeMeta` record keyed by pathname and falls back
 * to sensible defaults for unregistered routes.
 *
 * JSON-LD includes:
 *  - WebSite (site-wide, with SearchAction potential)
 *  - Person  (author identity for Google Knowledge Panel)
 *  - SportsEvent per sport subpage
 *  - BreadcrumbList per sub-route
 *
 * Hreflang tags point EN, DE, and x-default to the same URL because the
 * locale switching is entirely client-side (no separate /de/ path prefix).
 */
import { SITE_CONFIG } from "@/config/site.config";
import { getLocalVideoById } from "@/features/media/videoData";

export const SITE_URL = SITE_CONFIG.url;
export const SITE_NAME = SITE_CONFIG.brandName;
export const AUTHOR = SITE_CONFIG.authorName;

export type SEOMeta = {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "profile" | "article" | "video.other";
  /** JSON-LD structured data objects for the route */
  jsonLd?: Record<string, unknown>[];
};

const defaultDescription =
  "Stefan Rubio's action-sports portfolio spanning skateboarding, skiing, highlining, freediving, and urban flow art.";
const defaultOgImage = "/images/hero/highlining/hero_highlining.jpg";

export const defaultMeta: SEOMeta = {
  title: "rubioinsideout | Adventure sports portfolio",
  description: defaultDescription,
  ogImage: defaultOgImage,
  ogType: "website",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: defaultDescription,
      author: {
        "@type": "Person",
        name: AUTHOR,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: AUTHOR,
      url: SITE_URL,
      sameAs: [
        SITE_CONFIG.social.youtube,
        SITE_CONFIG.social.instagram,
      ],
      jobTitle: SITE_CONFIG.jobTitle,
      knowsAbout: [
        "Skiing",
        "Snowboarding",
        "Freediving",
        "Highlining",
        "Inline Skating",
        "Surfskating",
        "Calisthenics",
        "Handstands",
        "Ice Skating",
        "Pumpfoiling",
        "Weightlifting",
        "Flow Arts",
        "Mountaineering",
        "Via Ferrata",
      ],
    },
  ],
};

function sportJsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
  };
}

function breadcrumbJsonLd(label: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

export const routeMeta: Record<string, SEOMeta> = {
  "/": defaultMeta,
  "/services": {
    title: "Services | rubioinsideout coaching & media",
    description:
      "Personalized coaching, creative direction, and media production for adventure athletes and movement creators.",
    ogType: "website",
    jsonLd: [
      sportJsonLd(
        "Services",
        "Personalized coaching, creative direction, and media production for adventure athletes and movement creators.",
        `${SITE_URL}/services`
      ),
      breadcrumbJsonLd("Services", "/services"),
    ],
  },
  "/handstands": {
    title: "Handstands | rubioinsideout",
    description:
      "Handstand training, photo stories, and coaching notes that blend balance, expression, and movement artistry.",
    ogImage: "/images/body/handstands/handstand.jpg",
    jsonLd: [
      sportJsonLd(
        "Handstands",
        "Handstand training, photo stories, and coaching notes that blend balance, expression, and movement artistry.",
        `${SITE_URL}/handstands`
      ),
      breadcrumbJsonLd("Handstands", "/handstands"),
    ],
  },
  "/freediving": {
    title: "Freediving | rubioinsideout",
    description:
      "Blue-water freediving trips, breathwork insights, and cinematic captures from coastlines around the world.",
    ogImage: "/images/hero/freediving/hero_freediving.jpg",
    jsonLd: [
      sportJsonLd(
        "Freediving",
        "Blue-water freediving trips, breathwork insights, and cinematic captures from coastlines around the world.",
        `${SITE_URL}/freediving`
      ),
      breadcrumbJsonLd("Freediving", "/freediving"),
    ],
  },
  "/inlineskating": {
    title: "Inline Skating | rubioinsideout",
    description:
      "Fluid inline skating sessions mixing aggressive, Wirzard, and speed for skaters around the world.",
    ogImage: "/images/hero/inlineskating/hero_freeskating.jpg",
    jsonLd: [
      sportJsonLd(
        "Inline Skating",
        "Fluid inline skating sessions mixing aggressive, Wirzard, and speed for skaters around the world.",
        `${SITE_URL}/inlineskating`
      ),
      breadcrumbJsonLd("Inline Skating", "/inlineskating"),
    ],
  },
  "/snowboarding": {
    title: "Snowboarding | rubioinsideout",
    description:
      "Powder runs, freeride descents, and technical snowboarding stories from the Alps and beyond.",
    ogImage: "/images/hero/snowboarding/hero_snowboard.jpg",
    jsonLd: [
      sportJsonLd(
        "Snowboarding",
        "Powder runs, freeride descents, and technical snowboarding stories from the Alps and beyond.",
        `${SITE_URL}/snowboarding`
      ),
      breadcrumbJsonLd("Snowboarding", "/snowboarding"),
    ],
  },
  "/surfskating": {
    title: "Surfskating | rubioinsideout",
    description:
      "Surfskating lines that mirror ocean flow along with board setup tips for urban sessions.",
    ogImage: "/images/hero/surfskating/hero_surfskating.jpg",
    jsonLd: [
      sportJsonLd(
        "Surfskating",
        "Surfskating lines that mirror ocean flow along with board setup tips for urban sessions.",
        `${SITE_URL}/surfskating`
      ),
      breadcrumbJsonLd("Surfskating", "/surfskating"),
    ],
  },
  "/skiing": {
    title: "Skiing | rubioinsideout",
    description:
      "Alpine skiing diaries covering steep lines, backcountry travel, and cinematic mountain storytelling.",
    ogImage: "/images/hero/skiing/hero_skiing.jpg",
    jsonLd: [
      sportJsonLd(
        "Skiing",
        "Alpine skiing diaries covering steep lines, backcountry travel, and cinematic mountain storytelling.",
        `${SITE_URL}/skiing`
      ),
      breadcrumbJsonLd("Skiing", "/skiing"),
    ],
  },
  "/highlining": {
    title: "Highlining | rubioinsideout",
    description:
      "Highlining chronicles through Swiss gorges with rigging notes, safety reminders, and mindfulness cues.",
    ogImage: "/images/hero/highlining/hero_highlining.jpg",
    jsonLd: [
      sportJsonLd(
        "Highlining",
        "Highlining chronicles through Swiss gorges with rigging notes, safety reminders, and mindfulness cues.",
        `${SITE_URL}/highlining`
      ),
      breadcrumbJsonLd("Highlining", "/highlining"),
    ],
  },
  "/iceskating": {
    title: "Ice Skating | rubioinsideout",
    description:
      "Ice skating performances that merge choreography, precision, and cold-weather artistry in elegant sessions.",
    ogImage: "/images/hero/iceskating/hero_iceskating.jpg",
    jsonLd: [
      sportJsonLd(
        "Ice Skating",
        "Ice skating performances that merge choreography, precision, and cold-weather artistry in elegant sessions.",
        `${SITE_URL}/iceskating`
      ),
      breadcrumbJsonLd("Ice Skating", "/iceskating"),
    ],
  },
  "/calisthenics": {
    title: "Calisthenics | rubioinsideout",
    description:
      "Calisthenics programming, mobility work, and flow sequences that keep adventure athletes strong and agile.",
    ogImage: "/images/hero/calisthenics/hero_calisthenics.jpg",
    jsonLd: [
      sportJsonLd(
        "Calisthenics",
        "Calisthenics programming, mobility work, and flow sequences that keep adventure athletes strong and agile.",
        `${SITE_URL}/calisthenics`
      ),
      breadcrumbJsonLd("Calisthenics", "/calisthenics"),
    ],
  },
  "/pumpfoiling": {
    title: "Pumpfoiling | rubioinsideout",
    description:
      "Pumpfoiling adventures across lakes and oceans, showcasing wing setups and the rhythmic timing of each ride.",
    ogImage: "/images/hero/pumpfoiling/hero_pumpfoiling.jpg",
    jsonLd: [
      sportJsonLd(
        "Pumpfoiling",
        "Pumpfoiling adventures across lakes and oceans, showcasing wing setups and the rhythmic timing of each ride.",
        `${SITE_URL}/pumpfoiling`
      ),
      breadcrumbJsonLd("Pumpfoiling", "/pumpfoiling"),
    ],
  },
  "/weightlifting": {
    title: "Weightlifting | rubioinsideout",
    description:
      "Weightlifting sessions focused on Olympic lifts, strength-building, and stability for high-performance athletes.",
    ogImage: "/images/hero/weightlifting/hero_weightlifting.jpg",
    jsonLd: [
      sportJsonLd(
        "Weightlifting",
        "Weightlifting sessions focused on Olympic lifts, strength-building, and stability for high-performance athletes.",
        `${SITE_URL}/weightlifting`
      ),
      breadcrumbJsonLd("Weightlifting", "/weightlifting"),
    ],
  },
  "/flowarts": {
    title: "Flowarts | rubioinsideout",
    description:
      "Flow arts demos featuring poi, hoops, and kinetic movement for calming yet energetic performance releases.",
    ogImage: "/images/hero/flowarts/hero_flowarts.jpg",
    jsonLd: [
      sportJsonLd(
        "Flowarts",
        "Flow arts demos featuring poi, hoops, and kinetic movement for calming yet energetic performance releases.",
        `${SITE_URL}/flowarts`
      ),
      breadcrumbJsonLd("Flowarts", "/flowarts"),
    ],
  },
  "/mountaineering": {
    title: "Mountaineering | rubioinsideout",
    description:
      "Mountaineering logs covering alpine objectives, route beta, and safe summit pushes across rugged terrain.",
    ogImage: "/images/hero/mountaineering/hero_mountaineering.png",
    jsonLd: [
      sportJsonLd(
        "Mountaineering",
        "Mountaineering logs covering alpine objectives, route beta, and safe summit pushes across rugged terrain.",
        `${SITE_URL}/mountaineering`
      ),
      breadcrumbJsonLd("Mountaineering", "/mountaineering"),
    ],
  },
  "/viaferrata": {
    title: "Via Ferrata | rubioinsideout",
    description:
      "Via ferrata guides, photos, and prep tips for navigating exposed steel rungs and alpine ridgelines.",
    ogImage: "/images/hero/viaferrata/hero_viaferrata.jpg",
    jsonLd: [
      sportJsonLd(
        "Via Ferrata",
        "Via ferrata guides, photos, and prep tips for navigating exposed steel rungs and alpine ridgelines.",
        `${SITE_URL}/viaferrata`
      ),
      breadcrumbJsonLd("Via Ferrata", "/viaferrata"),
    ],
  },
  "/videos": {
    title: "Videos | rubioinsideout",
    description:
      "Self-hosted sports video playback pages and indexable video metadata for Google Video Search.",
    ogImage: "/images/hero/snowboarding/hero_snowboard.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Videos",
        description:
          "Self-hosted sports video playback pages and indexable video metadata for Google Video Search.",
        url: `${SITE_URL}/videos`,
      },
      breadcrumbJsonLd("Videos", "/videos"),
    ],
  },
  "/legal": {
    title: "Legal Notice | rubioinsideout",
    description:
      "Impressum and legal information for rubioinsideout.ch — Stefan Carlen, Niederrohrdorf, Switzerland.",
    ogType: "website",
    jsonLd: [breadcrumbJsonLd("Legal Notice", "/legal")],
  },
  "/privacy": {
    title: "Privacy Policy | rubioinsideout",
    description:
      "Privacy policy for rubioinsideout.ch — cookieless analytics, no tracking, nDSG and GDPR compliant.",
    ogType: "website",
    jsonLd: [breadcrumbJsonLd("Privacy Policy", "/privacy")],
  },
};

/**
 * Update all SEO-relevant <meta> and <link> tags in <head> for the current
 * route.  Called from the AppLayout effect on every pathname change.
 */
export function applySEOMeta(pathname: string) {
  let meta = routeMeta[pathname] ?? defaultMeta;

  if (pathname.startsWith("/videos/") && pathname !== "/videos") {
    const segment = pathname.replace("/videos/", "").split("/")[0];
    const videoId = segment.replace(/\.mp4$/i, "");
    const video = getLocalVideoById(videoId);

    if (video) {
      meta = {
        title: `${video.title} | rubioinsideout`,
        description: video.description,
        ogImage: video.poster,
        ogType: "video.other",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: video.title,
            description: video.description,
            thumbnailUrl: `${SITE_URL}${video.poster}`,
            uploadDate: video.uploadDate,
            duration: video.duration,
            contentUrl: `${SITE_URL}${video.source}`,
            embedUrl: `${SITE_URL}${pathname}`,
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
            },
            author: {
              "@type": "Person",
              name: AUTHOR,
              url: SITE_URL,
            },
          },
          breadcrumbJsonLd("Videos", "/videos"),
        ],
      };
    } else {
      // Fallback to generic videos section metadata if the ID isn't recognized.
      meta = routeMeta["/videos"] ?? defaultMeta;
    }
  }


  const canonicalUrl = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const ogImageUrl = `${SITE_URL}${meta.ogImage ?? defaultOgImage}`;
  const ogType = meta.ogType ?? "website";

  // --- title ---
  document.title = meta.title;

  // --- helpers ---
  function setMeta(attr: string, key: string, content: string) {
    let el = document.head.querySelector(
      `meta[${attr}="${key}"]`
    ) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function setLink(rel: string, href: string, extraAttrs?: Record<string, string>) {
    const selector = extraAttrs
      ? `link[rel="${rel}"][hreflang="${extraAttrs.hreflang}"]`
      : `link[rel="${rel}"]`;
    let el = document.head.querySelector(selector) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      if (extraAttrs) {
        for (const [k, v] of Object.entries(extraAttrs)) el.setAttribute(k, v);
      }
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  }

  // --- standard meta ---
  setMeta("name", "description", meta.description);
  setMeta("name", "author", AUTHOR);
  setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

  // --- Open Graph ---
  setMeta("property", "og:title", meta.title);
  setMeta("property", "og:description", meta.description);
  setMeta("property", "og:image", ogImageUrl);
  setMeta("property", "og:url", canonicalUrl);
  setMeta("property", "og:type", ogType);
  setMeta("property", "og:site_name", SITE_NAME);
  setMeta("property", "og:locale", "en_US");
  setMeta("property", "og:locale:alternate", "de_CH");

  // --- Twitter Card ---
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", meta.title);
  setMeta("name", "twitter:description", meta.description);
  setMeta("name", "twitter:image", ogImageUrl);

  // --- Canonical ---
  setLink("canonical", canonicalUrl);

  // --- Hreflang alternates ---
  setLink("alternate", canonicalUrl, { hreflang: "en" });
  setLink("alternate", canonicalUrl, { hreflang: "de" });
  setLink("alternate", canonicalUrl, { hreflang: "x-default" });

  // --- JSON-LD structured data ---
  // Remove previous injected LD blocks
  document.querySelectorAll('script[data-seo-ld]').forEach((el) => el.remove());
  const ldItems = meta.jsonLd ?? defaultMeta.jsonLd ?? [];
  for (const ld of ldItems) {
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-seo-ld", "true");
    script.textContent = JSON.stringify(ld);
    document.head.appendChild(script);
  }
}
