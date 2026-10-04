// Site-wide settings, from build-time environment variables (see .env.example).

/** The public origin, e.g. https://qolha.app. Canonical links, hreflang, sitemap and social cards use it. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

/** Store listings. Empty until the app is published there: the button then reads "Coming soon". */
export const APP_STORE_URL: string = import.meta.env.VITE_APP_STORE_URL ?? '';
export const PLAY_STORE_URL: string = import.meta.env.VITE_PLAY_STORE_URL ?? '';
