/* oxlint-disable react/only-export-components -- build-time entry, never hot-reloaded */
// Pre-rendering (scripts/prerender.mjs): each language's page is built as real HTML, so search engines
// and link previews see the content without running JavaScript.

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import App, { type Page } from './App';
import { CONTENT, type Lang, PRICES } from './content';
import { LEGAL } from './legal';

// The pre-render script reads the copy and prices from this bundle too.
export { CONTENT, LEGAL, PRICES };

export function render(lang: Lang, page: Page = 'home') {
  return renderToString(
    <StrictMode>
      <App lang={lang} page={page} />
    </StrictMode>
  );
}
