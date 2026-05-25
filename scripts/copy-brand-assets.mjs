/**
 * Prebuild step: copies brands/<slug>/assets/** → public/brands/<slug>/
 * Preserves subdirectory structure. Safe to run when BRAND is unset or assets/ is absent.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const slug = process.env.BRAND;

if (!slug || slug === "_default") {
  process.exit(0);
}

const srcDir  = path.join(root, "brands", slug, "assets");
const destDir = path.join(root, "public", "brands", slug);

if (!fs.existsSync(srcDir)) {
  process.exit(0);
}

let count = 0;

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
}

copyDir(srcDir, destDir);
console.log(`[copy-brand-assets] Copied ${count} file(s) from brands/${slug}/assets → public/brands/${slug}/`);
