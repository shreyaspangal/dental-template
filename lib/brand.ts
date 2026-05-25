import * as defaults from "./data";
import type { BrandContent, BrandTheme, DeepPartial, LoadedBrand } from "./brand-types";
import path from "path";
import fs from "fs";

// ── Helpers ───────────────────────────────────────────────────────────────────

function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  if (Array.isArray(override)) return override as unknown as T;
  if (
    typeof base === "object" &&
    base !== null &&
    typeof override === "object" &&
    override !== null
  ) {
    const result = { ...base } as Record<string, unknown>;
    for (const key of Object.keys(override)) {
      const k = key as keyof typeof base;
      const ov = (override as Record<string, unknown>)[key];
      if (ov === undefined) continue;
      result[key] = deepMerge(base[k], ov as DeepPartial<typeof base[typeof k]>);
    }
    return result as T;
  }
  return (override ?? base) as T;
}

const ASSET_EXT = /\.(jpe?g|png|gif|webp|svg|avif|mp4|m4v|webm|ogg|mov)$/i;

// Resolve an asset value: absolute URLs and /paths pass through unchanged.
// Bare filenames with a recognised asset extension are resolved to /brands/<slug>/<file>.
// All other strings (copy, headlines, etc.) are left untouched.
function resolveAsset(value: string, slug: string): string {
  if (!value) return value;
  if (/^https?:\/\//.test(value) || value.startsWith("/")) return value;
  if (ASSET_EXT.test(value)) return `/brands/${slug}/${value}`;
  return value;
}

// Walk all string values in an object and resolve relative asset paths.
function resolveAssets<T>(obj: T, slug: string): T {
  if (typeof obj === "string") return resolveAsset(obj, slug) as unknown as T;
  if (Array.isArray(obj)) return obj.map((item) => resolveAssets(item, slug)) as unknown as T;
  if (typeof obj === "object" && obj !== null) {
    const result = {} as Record<string, unknown>;
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      result[k] = resolveAssets(v, slug);
    }
    return result as T;
  }
  return obj;
}

function buildThemeVars(theme: BrandTheme): Record<string, string> {
  const vars: Record<string, string> = {};

  if (theme.colors) {
    const { primary, cream, dark, accent } = theme.colors;
    if (primary) {
      for (const [shade, val] of Object.entries(primary)) {
        if (val) vars[`--color-blush-${shade}`] = val;
      }
    }
    if (cream) vars["--color-cream"] = cream;
    if (dark) {
      for (const [shade, val] of Object.entries(dark)) {
        if (val) vars[`--color-charcoal-${shade}`] = val;
      }
    }
    if (accent) {
      for (const [shade, val] of Object.entries(accent)) {
        if (val) vars[`--color-mint-${shade}`] = val;
      }
    }
  }

  if (theme.fonts) {
    if (theme.fonts.display) vars["--font-display"] = theme.fonts.display;
    if (theme.fonts.body)    vars["--font-body"]    = theme.fonts.body;
  }

  if (theme.radius) {
    const map: Record<string, string> = {
      sm: "--radius-sm", md: "--radius-md", lg: "--radius-lg",
      xl: "--radius-xl", pill: "--radius-pill",
    };
    for (const [key, val] of Object.entries(theme.radius)) {
      if (val && map[key]) vars[map[key]] = val;
    }
  }

  if (theme.heroOverlay) vars["--hero-overlay"] = theme.heroOverlay;

  return vars;
}

function tryReadJson<T>(filePath: string): T | undefined {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return undefined;
  }
}

// ── Baseline from lib/data.ts ─────────────────────────────────────────────────

function buildBaseline(): BrandContent {
  return {
    LOGO:                 defaults.LOGO,
    FAVICON:              defaults.FAVICON,
    TERMS_URL:            defaults.TERMS_URL,
    MARQUEE_ITEMS:        defaults.MARQUEE_ITEMS,
    NAV_LINKS:            defaults.NAV_LINKS,
    BOOKING_URL:          defaults.BOOKING_URL,
    HERO:                 defaults.HERO,
    ABOUT:                defaults.ABOUT,
    METRICS:              defaults.METRICS,
    SERVICES_SECTION:     defaults.SERVICES_SECTION,
    SERVICES:             defaults.SERVICES,
    PROCESS_SECTION:      defaults.PROCESS_SECTION,
    PROCESS_STEPS:        defaults.PROCESS_STEPS,
    TESTIMONIALS_SECTION: defaults.TESTIMONIALS_SECTION,
    TESTIMONIALS:         defaults.TESTIMONIALS,
    TEAM_SECTION:         defaults.TEAM_SECTION,
    TEAM_MEMBERS:         defaults.TEAM_MEMBERS,
    FAQ_SECTION:          defaults.FAQ_SECTION,
    FAQ_ITEMS:            defaults.FAQ_ITEMS,
    BLOG_SECTION:         defaults.BLOG_SECTION,
    BLOG_POSTS:           defaults.BLOG_POSTS,
    INSTAGRAM_SECTION:    defaults.INSTAGRAM_SECTION,
    INSTAGRAM_POSTS:      defaults.INSTAGRAM_POSTS,
    CTA_SECTION:          defaults.CTA_SECTION,
    CONTACT_INFO:         defaults.CONTACT_INFO,
    BUSINESS_HOURS:       defaults.BUSINESS_HOURS,
    FOOTER_MENU:          defaults.FOOTER_MENU,
    SOCIAL_LINKS:         defaults.SOCIAL_LINKS,
    METADATA: {
      title:         "DentaCare — Bright Smiles, Expert Care",
      description:   "Pain-free, advanced dental treatments in a welcoming environment. Book your appointment with DentaCare today.",
      copyrightName: "DentaCare",
    },
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export function loadBrand(slug = process.env.BRAND): LoadedBrand {
  const baseline = buildBaseline();

  if (!slug || slug === "_default") {
    return { slug: "_default", content: baseline, themeVars: {}, googleFontsUrl: undefined };
  }

  const brandsDir  = path.join(process.cwd(), "brands", slug);
  const contentPath = path.join(brandsDir, "content.json");
  const themePath   = path.join(brandsDir, "theme.json");

  const override = tryReadJson<DeepPartial<BrandContent>>(contentPath);
  const theme    = tryReadJson<BrandTheme>(themePath);

  // Merge override onto defaults first, then resolve relative asset paths.
  const merged  = override ? deepMerge(baseline, override) : baseline;
  const content = override ? resolveAssets(merged, slug) : merged;

  return {
    slug,
    content,
    themeVars: theme ? buildThemeVars(theme) : {},
    googleFontsUrl: theme?.googleFontsUrl,
  };
}
