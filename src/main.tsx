import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App, { type Page } from './App';
import { CONTENT, type Lang } from './content';
import { LEGAL } from './legal';
import './index.css';

const root = document.getElementById('root')!;
// index.html keeps an <!--app--> placeholder comment in dev, so look for real elements.
const prerendered = root.firstElementChild !== null;

// Built pages carry their language and page on <html> (scripts/prerender.mjs). The dev server serves
// one index.html for every path, so there they come from the URL: /ar/, /privacy/, /ar/terms/…
const path = location.pathname.split('/').filter(Boolean);
const lang: Lang = prerendered ? (document.documentElement.lang === 'ar' ? 'ar' : 'en') : path[0] === 'ar' ? 'ar' : 'en';
const routed = path[lang === 'ar' ? 1 : 0];
const page: Page = prerendered
  ? ((document.documentElement.dataset.page ?? 'home') as Page)
  : routed === 'privacy' || routed === 'terms'
    ? routed
    : 'home';

if (!prerendered) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = page === 'home' ? CONTENT[lang].meta.title : `${LEGAL[lang][page].title} — ${CONTENT[lang].brand}`;
}

const app = (
  <StrictMode>
    <App lang={lang} page={page} />
  </StrictMode>
);

// Built pages arrive pre-rendered: take over that HTML instead of redrawing it.
if (prerendered) hydrateRoot(root, app);
else createRoot(root).render(app);
