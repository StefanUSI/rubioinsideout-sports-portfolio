/**
 * optimize-images.js
 *
 * For every JPEG / PNG under public/images/:
 *   1. Creates a full-size WebP   (basename.webp)
 *   2. Creates resized WebP variants at WIDTHS below (basename-480w.webp, etc.)
 *
 * The ResponsiveImage component builds srcset from these variants so the
 * browser downloads only the size it needs.
 *
 * Usage:  node scripts/optimize-images.js
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const SOURCE_DIRS = ["public/images"];
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const WEBP_QUALITY = 92;

// Responsive breakpoint widths (px). These match the srcset in ResponsiveImage.
const WIDTHS = [480, 1200, 2000];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** Returns true if dest exists and is newer than src. */
async function isUpToDate(src, dest) {
  try {
    const [s, d] = await Promise.all([stat(src), stat(dest)]);
    return d.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function processImage(src) {
  const ext = extname(src).toLowerCase();
  if (!EXTENSIONS.has(ext)) return 0;

  const base = src.replace(/\.[^.]+$/, "");
  let created = 0;

  // 1) Full-size WebP
  const fullWebp = `${base}.webp`;
  if (!(await isUpToDate(src, fullWebp))) {
    await sharp(src).webp({ quality: WEBP_QUALITY }).toFile(fullWebp);
    created++;
  }

  // 2) Resized WebP variants — only create when original is wider than the target
  // Create every responsive variant to match ResponsiveImage's srcset.
  // This includes upscaling smaller originals so the webp variants exist.
  for (const w of WIDTHS) {
    const dest = `${base}-${w}w.webp`;
    if (await isUpToDate(src, dest)) continue;
    await sharp(src).resize({ width: w }).webp({ quality: WEBP_QUALITY }).toFile(dest);
    created++;
  }

  return created;
}

async function main() {
  let converted = 0;
  let total = 0;

  for (const dir of SOURCE_DIRS) {
    try {
      for await (const file of walk(dir)) {
        if (!EXTENSIONS.has(extname(file).toLowerCase())) continue;
        total++;
        const n = await processImage(file);
        if (n > 0) {
          converted += n;
          console.log(`  ✓ ${basename(file)} → ${n} variant(s)`);
        }
      }
    } catch (err) {
      if (err.code === "ENOENT") continue;
      throw err;
    }
  }

  console.log(`\nDone — ${total} sources, ${converted} new variant(s) created.`);
}

main();
