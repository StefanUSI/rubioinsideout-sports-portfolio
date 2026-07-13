import { readdir, writeFile } from "node:fs/promises";
import { join, relative, sep, extname, basename } from "node:path";

const ROOT = "public/images/body/handstands";
const OUT = "src/features/handstands/galleryData.ts";
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const EXCLUDED_FILES = new Set(["handstand.jpg"]);
const COUNTRY_REGION_MAP = [
  { pattern: /portugal/i, country: "Portugal", region: "Europe" },
  { pattern: /prag|prague|czech/i, country: "Czech Republic", region: "Europe" },
  { pattern: /rome|italy/i, country: "Italy", region: "Europe" },
  { pattern: /spain/i, country: "Spain", region: "Europe" },
  { pattern: /switzerland/i, country: "Switzerland", region: "Europe" },
  { pattern: /mexico/i, country: "Mexico", region: "North America" },
  { pattern: /guatemala/i, country: "Guatemala", region: "Central America" },
  { pattern: /costa\s*rica/i, country: "Costa Rica", region: "Central America" },
  { pattern: /panama/i, country: "Panama", region: "Central America" },
  { pattern: /colombia/i, country: "Colombia", region: "South America" },
  { pattern: /ecuador|galapagos/i, country: "Ecuador", region: "South America" },
  { pattern: /peru/i, country: "Peru", region: "South America" },
  { pattern: /bolivia/i, country: "Bolivia", region: "South America" },
  { pattern: /thailand/i, country: "Thailand", region: "Southeast Asia" },
  { pattern: /cambodia/i, country: "Cambodia", region: "Southeast Asia" },
  { pattern: /vietnam/i, country: "Vietnam", region: "Southeast Asia" },
  { pattern: /qatar|doha|uae|dubai|oman|saudi|kuwait|bahrain|jordan|israel|lebanon/i, country: "Middle East", region: "Middle East" },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function toWebPath(filePath) {
  const rel = relative("public", filePath).split(sep).join("/");
  return `/${rel}`;
}

function normalizeCountry(raw) {
  let s = raw;
  s = s.replace(/^\d+_/, "");
  s = s.replace(/_Edited.*$/i, "");
  s = s.replace(/\b\d{4}\b/g, "");
  s = s.replace(/_+/g, " ");
  s = s.replace(/\bup to\b/gi, "");
  s = s.replace(/\s+/g, " ").trim();
  return s || "Unknown";
}

function deriveCountry(filePath) {
  const rel = relative(ROOT, filePath).split(sep);
  const dirs = rel.slice(0, -1);
  if (dirs.length === 0) return "Unknown";

  const candidate = dirs[0].startsWith("Traveling ") && dirs[1] ? dirs[1] : dirs[0];
  return normalizeCountry(candidate);
}

function deriveCountryAndRegion(filePath) {
  const relPath = relative(ROOT, filePath).split(sep).join("/");
  for (const entry of COUNTRY_REGION_MAP) {
    if (entry.pattern.test(relPath)) {
      return { country: entry.country, region: entry.region };
    }
  }

  const fallbackCountry = deriveCountry(filePath);
  return { country: fallbackCountry, region: "Other" };
}

function deriveYear(filePath) {
  const rel = relative(ROOT, filePath).split(sep);
  const dirs = rel.slice(0, -1);
  for (const dir of dirs) {
    const m = dir.match(/\b(20\d{2})\b/);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

function deriveCity(filePath) {
  const rel = relative(ROOT, filePath).split(sep);
  const dirs = rel.slice(0, -1);
  const generic = new Set(["done", "1st", "2nd"]);

  for (let i = dirs.length - 1; i >= 0; i--) {
    const part = dirs[i];
    if (!part || generic.has(part.toLowerCase()) || part.startsWith("Traveling ")) {
      continue;
    }
    if (/^\d+_/.test(part) || /_Edited/i.test(part)) {
      continue;
    }
    return part.replace(/_+/g, " ").trim();
  }

  const file = basename(filePath, extname(filePath));
  return file.slice(0, 24);
}

async function main() {
  const items = [];

  for await (const file of walk(ROOT)) {
    const ext = extname(file).toLowerCase();
    const name = basename(file).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext) || EXCLUDED_FILES.has(name)) continue;

    items.push({
      src: toWebPath(file),
      ...deriveCountryAndRegion(file),
      city: deriveCity(file),
      year: deriveYear(file),
    });
  }

  items.sort((a, b) => {
    if (b.year !== a.year) return (b.year ?? 0) - (a.year ?? 0);
    return a.src.localeCompare(b.src);
  });

  const content = `export type HandstandImage = {\n  src: string;\n  city: string;\n  country: string;\n  region: string;\n  year: number | null;\n};\n\nexport const HANDSTANDS_GALLERY: HandstandImage[] = ${JSON.stringify(items, null, 2)};\n`;

  await writeFile(OUT, content, "utf8");
  console.log(`Generated ${items.length} handstands entries -> ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
