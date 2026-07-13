#!/usr/bin/env node
/**
 * convert-videos-to-webm.js
 *
 * Finds .mp4 files in public/videos and related folders and creates
 * same-name .webm files by invoking ffmpeg.
 *
 * Usage (from repository root):
 *   npm run convert-videos-to-webm
 *
 * Requires ffmpeg on PATH.
 */
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { spawn } from "node:child_process";

const SOURCE_DIRS = ["public/videos", "public/videos/hero", "public/videos/body"];
const EXTENSIONS = new Set([".mp4"]);

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

async function isUpToDate(srcPath, destPath) {
  try {
    const [src, dest] = await Promise.all([stat(srcPath), stat(destPath)]);
    return dest.mtimeMs >= src.mtimeMs;
  } catch {
    return false;
  }
}

function runFfmpeg(src, dest) {
  return new Promise((resolve, reject) => {
    const args = [
      "-y",
      "-i",
      src,
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "0",
      "-crf",
      "30",
      "-c:a",
      "libopus",
      "-b:a",
      "128k",
      dest,
    ];

    const proc = spawn("ffmpeg", args, { stdio: "inherit" });
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function main() {
  let total = 0;
  let converted = 0;

  for (const dir of SOURCE_DIRS) {
    try {
      for await (const filePath of walk(dir)) {
        const ext = extname(filePath).toLowerCase();
        if (!EXTENSIONS.has(ext)) continue;

        total++;
        const dest = filePath.replace(/\.[^.]+$/, ".webm");
        if (await isUpToDate(filePath, dest)) {
          console.log(`Skipping ${basename(filePath)} (up-to-date)`);
          continue;
        }

        console.log(`Starting conversion: ${basename(filePath)} → ${basename(dest)}`);
        await runFfmpeg(filePath, dest);
        converted++;
        console.log(`Finished conversion: ${basename(filePath)} → ${basename(dest)}`);
      }
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  }

  console.log(`Done. Scanned ${total} source video(s), created ${converted} webm file(s).`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
