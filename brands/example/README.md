# brands/example

This is a reference brand showing the minimum viable override. All unset fields
fall back to the dental defaults in `lib/data.ts`.

## Preview

```bash
BRAND=example pnpm dev
```

## Files

| File | Purpose |
|------|---------|
| `content.json` | Partial `BrandContent` override — only the keys you want to change |
| `theme.json`   | CSS variable overrides — colors, fonts, border-radius |
| `assets/`      | Local images (optional) — referenced in `content.json` by filename only (no path prefix) |

## Asset reference example

Place `hero.png` in `assets/` then reference it in `content.json`:

```json
{
  "HERO": {
    "image": "hero.png"
  }
}
```

The prebuild step copies `assets/*` to `public/brands/example/` and the loader
resolves `"hero.png"` → `"/brands/example/hero.png"` automatically.

## Deploy on Vercel

1. Create a new Vercel project pointing at this repo.
2. Add environment variable: `BRAND=example`
3. Deploy — no code changes needed.
