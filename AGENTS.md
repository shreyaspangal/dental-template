<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->

## Project architecture — multi-brand template

This repo is a **static landing page template** that can be deployed once per client, brand-selected at build time via `BRAND=<slug> pnpm build`.

### Key files

| File | Role |
|------|------|
| `lib/data.ts` | Default content (dental baseline) — **never edit for a client** |
| `lib/types.ts` | TypeScript interfaces for every section's data shape |
| `lib/brand-types.ts` | `BrandContent`, `BrandTheme`, `DeepPartial<T>` |
| `lib/brand.ts` | `loadBrand()` — reads `BRAND` env var, deep-merges override, resolves assets |
| `app/page.tsx` | Calls `loadBrand()`, passes content to section components |
| `app/layout.tsx` | Calls `loadBrand()`, injects theme CSS vars, drives metadata |
| `brands/<slug>/content.json` | Per-client partial override of `BrandContent` |
| `brands/<slug>/theme.json` | Per-client CSS variable overrides |
| `brands/<slug>/assets/` | Local images; prebuild copies to `public/brands/<slug>/` |
| `scripts/copy-brand-assets.mjs` | Prebuild step that copies brand assets |

### Rules for agents

- **Never modify `lib/data.ts` for a client** — add `brands/<slug>/content.json` instead.
- **Section components are never touched** — they're already fully props-driven. All content customization goes through `lib/brand.ts` + `brands/`.
- Arrays in `content.json` **replace** the default array wholesale. Objects **deep-merge**.
- Relative asset values in `content.json` (no `https://` prefix) are resolved to `/brands/<slug>/<value>` by the loader. Absolute URLs pass through unchanged.
- To add a new client: `mkdir brands/<slug>`, create `content.json` + optional `theme.json` + optional `assets/`, run `BRAND=<slug> pnpm dev`.
- See `brands/example/` for a worked reference and `README.md` for full schema docs.
