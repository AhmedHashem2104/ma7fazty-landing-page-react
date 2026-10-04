# Qolha landing page

The marketing site for the app: Vite + React + TypeScript, English at `/` and Arabic (RTL) at `/ar/`,
in the app's own look (glass over a soft colourful backdrop, Cairo font, light and dark).

```bash
pnpm install
pnpm dev        # http://localhost:5173 (English), /ar/ (Arabic), /privacy/, /terms/, /ar/privacy/, /ar/terms/
pnpm build      # dist/: pre-rendered pages, sitemap.xml, robots.txt
pnpm preview    # serves dist/ at http://localhost:4173
```

## SEO

- **Pre-rendered HTML** (`scripts/prerender.mjs`): each language is built as real HTML, so crawlers and
  link previews see the full content without JavaScript; React then hydrates it.
- Per page: title, description, keywords, canonical, `hreflang` (en, ar, x-default), Open Graph and
  Twitter cards with a 1200×630 image (`public/og-image.png`), and JSON-LD: `MobileApplication`
  (with the plans as offers in USD and EGP), `FAQPage`, `WebSite`.
- `sitemap.xml` with language alternates, `robots.txt`, web manifest, favicons and Apple touch icon.
- Semantic structure (one `h1`, sections with `h2`), skip link, `lang`/`dir` per page, works without
  JavaScript (FAQ uses `<details>`).

## Settings

Copy `.env.example` to `.env.production` and fill in:

| Variable | Used for |
| --- | --- |
| `VITE_SITE_URL` | The public origin (canonical links, hreflang, sitemap, social cards). **Required before deploying.** |
| `VITE_APP_STORE_URL` | App Store button. Empty: the button says "Coming soon". `.env` and `.env.production` hold **mock** listing URLs for now: replace them once the app is published. |
| `VITE_PLAY_STORE_URL` | Google Play button (`https://play.google.com/store/apps/details?id=com.ahmedhashem.ma7fazty` once published). |

Prices live in `src/content.ts` (`PRICES`) and must match the Lemon Squeezy products (see `../ma7fazty/PRICING.md`).

## Deploying

`dist/` is a static site: Cloudflare Pages, Netlify, Vercel or any static host. Build command
`pnpm build`, output directory `dist`. Submit `https://<your-domain>/sitemap.xml` in Google Search
Console and Bing Webmaster Tools.
