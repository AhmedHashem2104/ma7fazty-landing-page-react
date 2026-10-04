#!/usr/bin/env node
/**
 * After `vite build` (the browser bundle in dist/) and `vite build --ssr` (dist-ssr/), writes one real
 * HTML page per language and page with its SEO head, plus sitemap.xml and robots.txt:
 *
 *   dist/index.html                       English home   (https://site/)
 *   dist/ar/index.html                    Arabic home    (https://site/ar/)
 *   dist/{,ar/}{privacy,terms}/index.html privacy policy and terms, in both languages
 *
 * The public origin comes from VITE_SITE_URL (.env.production or the environment).
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { loadEnv } from 'vite';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const SSR = join(ROOT, 'dist-ssr');

const env = { ...loadEnv('production', ROOT, 'VITE_'), ...process.env };
let site = (env.VITE_SITE_URL ?? '').replace(/\/$/, '');
if (!site) {
  site = 'http://localhost:4173';
  console.warn(`! VITE_SITE_URL is not set: canonical links and the sitemap point at ${site}. Set it before deploying.`);
}

const { render, CONTENT, LEGAL, PRICES } = await import(pathToFileURL(join(SSR, 'entry-server.js')).href);
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const LANGS = ['en', 'ar'];
const PAGES = ['home', 'privacy', 'terms'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urlFor = (lang, pg = 'home') => `${site}${lang === 'ar' ? '/ar' : ''}/${pg === 'home' ? '' : `${pg}/`}`;
const json = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
const languageLinks = (pg) => [
  `<link rel="canonical" href="__CANONICAL__" />`,
  `<link rel="alternate" hreflang="en" href="${urlFor('en', pg)}" />`,
  `<link rel="alternate" hreflang="ar" href="${urlFor('ar', pg)}" />`,
  `<link rel="alternate" hreflang="x-default" href="${urlFor('en', pg)}" />`,
];

function homeHead(lang) {
  const c = CONTENT[lang];
  const url = urlFor(lang);
  const image = `${site}/og-image.png`;
  const name = lang === 'ar' ? 'قولها' : 'Qolha';
  const offers = [
    { '@type': 'Offer', name: c.pricing.free.name, price: '0', priceCurrency: 'USD' },
    ...['usd', 'egp'].flatMap((m) =>
      ['monthly', 'yearly'].map((plan) => ({
        '@type': 'Offer',
        name: c.pricing[plan].name,
        price: String(PRICES[m][plan]),
        priceCurrency: PRICES[m].currency,
        ...(m === 'egp' ? { eligibleRegion: { '@type': 'Country', name: 'EG' } } : {}),
      }))
    ),
  ];
  return [
    `<title>${esc(c.meta.title)}</title>`,
    `<meta name="description" content="${esc(c.meta.description)}" />`,
    `<meta name="keywords" content="${esc(c.meta.keywords)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta name="application-name" content="${esc(name)}" />`,
    `<meta name="apple-mobile-web-app-title" content="${esc(name)}" />`,
    ...languageLinks('home').map((l) => l.replace('__CANONICAL__', url)),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Qolha" />`,
    `<meta property="og:title" content="${esc(c.meta.title)}" />`,
    `<meta property="og:description" content="${esc(c.meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${name} — ${c.footer.tagline}`)}" />`,
    `<meta property="og:locale" content="${c.meta.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${lang === 'ar' ? 'en_US' : 'ar_EG'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(c.meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(c.meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    json({
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name,
      alternateName: lang === 'ar' ? 'Qolha' : 'قولها',
      description: c.meta.description,
      url,
      image: `${site}/icon-512.png`,
      screenshot: image,
      operatingSystem: 'Android, iOS',
      applicationCategory: 'FinanceApplication',
      inLanguage: ['ar', 'en'],
      offers,
    }),
    json({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: c.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }),
    json({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Qolha', alternateName: 'قولها', url: `${site}/`, inLanguage: lang }),
  ].join('\n    ');
}

/** The privacy policy or terms: their own title, description and language links. */
function legalHead(lang, pg) {
  const doc = LEGAL[lang][pg];
  const title = `${doc.title} — ${lang === 'ar' ? 'قولها' : 'Qolha'}`;
  const url = urlFor(lang, pg);
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(doc.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    ...languageLinks(pg).map((l) => l.replace('__CANONICAL__', url)),
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="Qolha" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(doc.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site}/og-image.png" />`,
    `<meta name="twitter:card" content="summary" />`,
  ].join('\n    ');
}

function page(lang, pg) {
  const htmlTag = `<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"${pg === 'home' ? '' : ` data-page="${pg}"`}>`;
  return template
    .replace('<html lang="en" dir="ltr">', htmlTag)
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, pg === 'home' ? homeHead(lang) : legalHead(lang, pg))
    .replace('<!--app-->', render(lang, pg));
}

for (const lang of LANGS) {
  for (const pg of PAGES) {
    const dir = join(DIST, ...(lang === 'ar' ? ['ar'] : []), ...(pg === 'home' ? [] : [pg]));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), page(lang, pg));
  }
}

const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.flatMap((pg) =>
  LANGS.map(
    (lang) => `  <url>
    <loc>${urlFor(lang, pg)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${pg === 'home' ? 'monthly' : 'yearly'}</changefreq>
    <priority>${pg === 'home' ? (lang === 'en' ? '1.0' : '0.9') : '0.3'}</priority>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, pg)}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en', pg)}" />
  </url>`
  )
);
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
rmSync(SSR, { recursive: true, force: true });
console.log(`Pre-rendered ${LANGS.length * PAGES.length} pages (home, privacy, terms in English and Arabic), wrote sitemap.xml and robots.txt`);
