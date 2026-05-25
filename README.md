# Dental Landing Template

A fully-componentised Next.js landing page template. The default content is a dental clinic (DentaCare) but **every section's copy, assets, and theme colors can be overridden per client** without touching any component code.

## Quick start

```bash
pnpm install
pnpm dev                          # runs with dental defaults
BRAND=example pnpm dev            # runs with the example brand override
```

---

## Multi-brand architecture

### How it works

1. All default content lives in `lib/data.ts` — unchanged, the authoritative baseline.
2. Each client gets a folder under `brands/<slug>/`.
3. At build time `lib/brand.ts` reads `process.env.BRAND`, deep-merges the brand's `content.json` over the defaults, and resolves any relative asset paths.
4. `app/page.tsx` and `app/layout.tsx` consume `loadBrand()` — no section components were modified.

```
brands/
  example/
    content.json   ← DeepPartial override of lib/data.ts exports
    theme.json     ← optional CSS variable overrides
    assets/        ← optional local images (copied to public/ at build)
    README.md
lib/
  data.ts          ← default content (dental) — never edit per client
  brand.ts         ← loadBrand() — loader + deepMerge + asset resolver
  brand-types.ts   ← BrandContent, BrandTheme, DeepPartial<T>
```

### content.json schema

Supply **only the fields you want to override**. Everything else silently falls back to the dental defaults.

```jsonc
{
  "METADATA": { "title": "...", "description": "...", "copyrightName": "..." },
  "BOOKING_URL": "https://...",
  "HERO": { "headline": "...", "body": "...", "image": "hero.png" },
  "SERVICES": [ /* replaces all 4 dental services */ ],
  "CONTACT_INFO": { "email": "...", "phone": "...", "address": "..." }
  // ... any subset of BrandContent keys
}
```

Arrays **replace** the defaults wholesale (so 3 supplied services → 3 services rendered, not 3 + 4 defaults). Objects **deep-merge** (so `HERO.image` can be overridden without touching `HERO.headline`).

### theme.json schema

```jsonc
{
  "colors": {
    "primary": { "500": "#0ea5e9" },   // maps to --color-blush-500
    "cream": "#f8fafc",                // maps to --color-cream
    "dark": { "800": "#1e293b" },      // maps to --color-charcoal-800
    "accent": { "400": "#34d399" }     // maps to --color-mint-400
  },
  "fonts": {
    "display": "'Inter', sans-serif",
    "body":    "'DM Sans', sans-serif"
  },
  "radius": { "md": "0.5rem" }
}
```

Values are injected as a `<style>` tag in `<head>` — they override the `@theme` defaults in `globals.css` at runtime.

### Local asset files

Drop images into `brands/<slug>/assets/`. Reference them in `content.json` by filename only:

```json
{ "HERO": { "image": "hero.png" } }
```

The prebuild step (`scripts/copy-brand-assets.mjs`) copies them to `public/brands/<slug>/` and the loader resolves `"hero.png"` → `"/brands/example/hero.png"` automatically. Absolute URLs (starting with `https://` or `/`) are passed through unchanged.

---

## Adding a new client

```bash
mkdir brands/my-client
# create brands/my-client/content.json  (partial override)
# create brands/my-client/theme.json    (optional)
# add   brands/my-client/assets/*.png   (optional)
BRAND=my-client pnpm dev               # preview locally
```

Deploy on Vercel: create a project → set `BRAND=my-client` in Environment Variables → deploy.

---

## Development

```bash
pnpm dev          # dev server
pnpm build        # production build (runs prebuild asset copy first)
pnpm start        # serve production build
pnpm tsc --noEmit # type-check
```
