import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

/** Route definitions with SEO priority & change frequency. */
const routes = [
  { path: "/",              priority: "1.0", changefreq: "weekly" },
  { path: "/services",      priority: "0.8", changefreq: "monthly" },
  { path: "/handstands",    priority: "0.9", changefreq: "weekly" },
  { path: "/freediving",    priority: "0.7", changefreq: "monthly" },
  { path: "/inlineskating", priority: "0.7", changefreq: "monthly" },
  { path: "/snowboarding",  priority: "0.7", changefreq: "monthly" },
  { path: "/surfskating",   priority: "0.7", changefreq: "monthly" },
  { path: "/skiing",        priority: "0.7", changefreq: "monthly" },
  { path: "/highlining",    priority: "0.7", changefreq: "monthly" },
  { path: "/iceskating",    priority: "0.7", changefreq: "monthly" },
  { path: "/calisthenics",  priority: "0.7", changefreq: "monthly" },
  { path: "/pumpfoiling",   priority: "0.7", changefreq: "monthly" },
  { path: "/weightlifting", priority: "0.7", changefreq: "monthly" },
  { path: "/flowarts",      priority: "0.7", changefreq: "monthly" },
  { path: "/mountaineering",priority: "0.7", changefreq: "monthly" },
  { path: "/viaferrata",    priority: "0.7", changefreq: "monthly" },
  { path: "/videos",        priority: "0.7", changefreq: "weekly" },
  // Keep in sync with LOCAL_VIDEOS in src/features/media/videoData.ts —
  // only list video pages that actually resolve, or crawlers index 404s.
  { path: "/videos/1snowboard", priority: "0.7", changefreq: "monthly" },
  { path: "/videos/home_snowboarding", priority: "0.6", changefreq: "monthly" },
  { path: "/legal",          priority: "0.3", changefreq: "yearly" },
  { path: "/privacy",        priority: "0.3", changefreq: "yearly" },
];

const defaultBase = "https://rubioinsideout.ch";
const normalizedBase = (process.env.SITEMAP_BASE_URL ?? "").trim() || defaultBase;

if (!process.env.SITEMAP_BASE_URL) {
  console.warn(
    "SITEMAP_BASE_URL not set; sitemap will use the default local URL."
  );
}

const timestamp = new Date().toISOString().split("T")[0];

// Supported languages for hreflang alternates
const LANGUAGES = ["en", "de"];

const urlSet = routes
  .map(({ path, priority, changefreq }) => {
    const url = new URL(path, normalizedBase).toString();
    const hreflangLinks = LANGUAGES.map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`
    ).join("\n");
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />`;
    return [
      `  <url>`,
      `    <loc>${url}</loc>`,
      `    <lastmod>${timestamp}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      hreflangLinks,
      xDefault,
      `  </url>`,
    ].join("\n");
  })
  .join("\n");

const sitemap = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
  `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
  urlSet,
  `</urlset>`,
].join("\n");

const sitemapUrl = new URL("sitemap.xml", normalizedBase).toString();
const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${sitemapUrl}`,
  "",
].join("\n");

const distDir = resolve("dist");
await mkdir(distDir, { recursive: true });
await writeFile(resolve(distDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(resolve(distDir, "robots.txt"), robotsTxt, "utf8");
console.log("Sitemap written to dist/sitemap.xml");
console.log("Robots.txt written to dist/robots.txt");
