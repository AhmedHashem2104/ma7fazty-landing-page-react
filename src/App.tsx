import { useState, useSyncExternalStore } from 'react';

import { CONTENT, formatNumber, formatPrice, type Lang, type Market, PRICES, yearlySaving } from './content';
import { Icon } from './icons';
import { CONTACT_EMAIL, LEGAL, type LegalPageId } from './legal';
import { APP_STORE_URL, PLAY_STORE_URL } from './site';

const YEAR = new Date().getFullYear();
const noSubscription = () => () => {};

type Billing = 'monthly' | 'yearly';

/** EGP for visitors in Egypt (time zone or browser region), USD for everyone else. */
function detectMarket(): Market | null {
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Africa/Cairo') return 'egp';
    if (navigator.languages?.some((l) => /[-_]EG$/i.test(l))) return 'egp';
    return 'usd';
  } catch {
    return null;
  }
}

function StoreButton({ store, lang }: { store: 'apple' | 'google'; lang: Lang }) {
  const c = CONTENT[lang].store;
  const url = store === 'apple' ? APP_STORE_URL : PLAY_STORE_URL;
  const name = store === 'apple' ? c.appStore : c.googlePlay;
  const small = url ? (store === 'apple' ? c.downloadOn : c.getItOn) : c.soon;
  const body = (
    <>
      <Icon name={store} className="store-logo" />
      <span className="store-text">
        <small>{small}</small>
        <strong>{name}</strong>
      </span>
    </>
  );
  return url ? (
    <a className="store-btn" href={url} target="_blank" rel="noopener" aria-label={`${small} ${name}`}>
      {body}
    </a>
  ) : (
    <span className="store-btn is-soon" aria-label={`${name} — ${c.soon}`}>
      {body}
    </span>
  );
}

function StoreButtons({ lang }: { lang: Lang }) {
  return (
    <div className="stores">
      <StoreButton store="apple" lang={lang} />
      <StoreButton store="google" lang={lang} />
    </div>
  );
}

/** The app itself, drawn in CSS: the wallet card and a voice message turned into entries. */
function Phone({ lang }: { lang: Lang }) {
  const p = CONTENT[lang].phone;
  const amount = (n: number) => formatNumber(n, lang);
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-notch" />
        <p className="phone-greeting">{p.greeting}</p>
        <div className="hero-card">
          <span className="hero-wallet">{p.wallet}</span>
          <span className="hero-label">{p.balanceLabel}</span>
          <strong className="hero-balance">{amount(7750)}</strong>
          <div className="hero-split">
            <span>
              <Icon name="down" /> <bdi dir="ltr">+{amount(12000)}</bdi>
            </span>
            <span>
              <Icon name="up" /> <bdi dir="ltr">−{amount(4250)}</bdi>
            </span>
          </div>
        </div>
        <div className="glass bubble">
          <span className="bubble-label">
            <Icon name="chat" /> {p.heard}
          </span>
          <p>{p.said}</p>
        </div>
        <div className="glass entry">
          <span className="entry-icon">
            <Icon name="coffee" />
          </span>
          <span className="entry-text">
            <strong>{p.item}</strong>
            <small>{p.category}</small>
          </span>
          <bdi className="entry-amount" dir="ltr">
            −{amount(65)}
          </bdi>
        </div>
        <div className="glass entry">
          <span className="entry-icon">
            <Icon name="wifi" />
          </span>
          <span className="entry-text">
            <strong>{p.item2}</strong>
            <small>{p.category2}</small>
          </span>
          <bdi className="entry-amount" dir="ltr">
            −{amount(450)}
          </bdi>
        </div>
        <p className="saved">
          <Icon name="check" /> {p.saved}
        </p>
        <div className="speak">
          <Icon name="mic" />
        </div>
      </div>
    </div>
  );
}

/** One row in a drawn screen: icon, name and detail, and an amount (money in, out, or a plain balance). */
function Row({ icon, title, detail, amount, kind }: { icon: string; title: string; detail: string; amount: string; kind: 'in' | 'out' | 'balance' }) {
  return (
    <div className="row">
      <span className={`entry-icon is-${kind}`}>
        <Icon name={icon} />
      </span>
      <span className="entry-text">
        <strong>{title}</strong>
        <small>{detail}</small>
      </span>
      <bdi className={`entry-amount is-${kind}`} dir="ltr">
        {kind === 'in' ? '+' : kind === 'out' ? '−' : ''}
        {amount}
      </bdi>
    </div>
  );
}

// Money in / out per month for the drawn report (thousands of EGP), April to September.
const REPORT = [
  [12, 9.1],
  [12, 10.4],
  [13.5, 8.7],
  [12, 11.2],
  [14, 9.8],
  [15, 9.32],
];
const REPORT_MAX = 15;

/** Three more screens of the app, drawn in CSS like the hero phone: wallets, reports, history. */
function Screens({ lang }: { lang: Lang }) {
  const s = CONTENT[lang].screens;
  const { wallets: w, reports: r, history: h } = s;
  const n = (x: number) => formatNumber(x, lang);
  const [monthIn, monthOut] = REPORT[REPORT.length - 1].map((k) => k * 1000);
  const screens = [
    <>
      <p className="screen-title">{w.title}</p>
      <div className="hero-card">
        <span className="hero-label">{w.total}</span>
        <strong className="hero-balance">{n(70724)}</strong>
      </div>
      <div className="glass rows">
        <Row icon="cash" title={w.cash} detail="EGP" amount={n(3250)} kind="balance" />
        <Row icon="bank" title={w.bank} detail="USD" amount={n(1120)} kind="balance" />
        <Row icon="card" title={w.card} detail="CAD" amount={n(240)} kind="balance" />
      </div>
      <div className="glass move">
        <span className="bubble-label">
          <Icon name="swap" /> {w.exchange}
        </span>
        <p className="move-line">
          <bdi dir="ltr">−{n(100)} USD</bdi>
          <Icon name="swap" />
          <bdi dir="ltr">+{n(5223)} EGP</bdi>
        </p>
        <small>{w.rate}</small>
      </div>
      <span className="screen-btn">
        <Icon name="swap" /> {w.move}
      </span>
    </>,
    <>
      <p className="screen-title">{r.title}</p>
      <div className="glass chart">
        <div className="legend">
          <span className="dot is-in" /> {r.in}
          <span className="dot is-out" /> {r.out}
        </div>
        <div className="bars">
          {REPORT.map(([i, o], k) => (
            <div key={r.months[k]} className="bar-group">
              <div className="bar-pair">
                <span className="bar is-in" style={{ height: `${(i / REPORT_MAX) * 100}%` }} />
                <span className="bar is-out" style={{ height: `${(o / REPORT_MAX) * 100}%` }} />
              </div>
              <small>{r.months[k]}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="glass month">
        <strong>{r.month}</strong>
        <div className="month-stats">
          <span>
            <small>{r.in}</small>
            <bdi className="is-in" dir="ltr">
              +{n(monthIn)}
            </bdi>
          </span>
          <span>
            <small>{r.out}</small>
            <bdi className="is-out" dir="ltr">
              −{n(monthOut)}
            </bdi>
          </span>
          <span>
            <small>{r.kept}</small>
            <bdi>{formatNumber((monthIn - monthOut) / monthIn, lang, { style: 'percent' })}</bdi>
          </span>
        </div>
      </div>
      <div className="glass top">
        <small>{r.top}</small>
        {[4000, 2180, 1240].map((amount, k) => (
          <div key={r.categories[k]} className="top-row">
            <span>{r.categories[k]}</span>
            <bdi dir="ltr">{n(amount)}</bdi>
            <span className="top-bar" style={{ width: `${(amount / 4000) * 100}%` }} />
          </div>
        ))}
      </div>
    </>,
    <>
      <p className="screen-title">{h.title}</p>
      <div className="glass searchbar">
        <Icon name="search" /> {h.search}
      </div>
      <div className="chips">
        {h.filters.map((f, i) => (
          <span key={f} className={i === 0 ? 'chip is-on' : 'chip'}>
            {f}
          </span>
        ))}
      </div>
      <small className="day">{h.today}</small>
      <div className="glass rows">
        <p className="group-said">
          <Icon name="chat" /> {h.said}
        </p>
        <Row icon="cash" title={h.salary} detail={h.salaryCategory} amount={n(15000)} kind="in" />
        <Row icon="home" title={h.rent} detail={h.rentCategory} amount={n(4000)} kind="out" />
      </div>
      <small className="day">{h.yesterday}</small>
      <div className="glass rows">
        <Row icon="tv" title={h.subscription} detail={h.subscriptionCategory} amount={n(250)} kind="out" />
      </div>
    </>,
  ];
  return (
    <div className="screens">
      {screens.map((screen, i) => (
        <figure key={s.captions[i].title} className="screen">
          <div className="phone phone-sm" aria-hidden="true">
            <div className="phone-screen">
              <div className="phone-notch" />
              {screen}
            </div>
          </div>
          <figcaption>
            <h3>{s.captions[i].title}</h3>
            <p>{s.captions[i].body}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export type Page = 'home' | LegalPageId;

/** Privacy policy or terms: plain, readable sections in the site's look. */
function LegalArticle({ lang, page }: { lang: Lang; page: LegalPageId }) {
  const doc = LEGAL[lang][page];
  return (
    <main id="main" className="section container narrow legal">
      <h1>{doc.title}</h1>
      <p className="legal-updated">
        {doc.updatedLabel}: {doc.updated}
      </p>
      <p className="lead">{doc.intro}</p>
      {doc.sections.map((s) => (
        <section key={s.heading} className="glass legal-section">
          <h2>{s.heading}</h2>
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}
      <p className="legal-contact">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </main>
  );
}

export default function App({ lang, page = 'home' }: { lang: Lang; page?: Page }) {
  const c = CONTENT[lang];
  const home = lang === 'ar' ? '/ar/' : '/';
  // On the legal pages, the header's section links go back to the home page.
  const to = (id: string) => (page === 'home' ? `#${id}` : `${home}#${id}`);
  const switchHref = page === 'home' ? c.nav.switchHref : `${c.nav.switchHref}${page}/`;
  // The server renders the page's own default; the visitor's market is read once it loads (null
  // while pre-rendering), and the visitor can still switch.
  const detected = useSyncExternalStore(noSubscription, detectMarket, () => null);
  const [chosen, setMarket] = useState<Market | null>(null);
  const market: Market = chosen ?? detected ?? (lang === 'ar' ? 'egp' : 'usd');
  const price = PRICES[market];
  const fmt = (n: number) => formatPrice(n, price.currency, lang);
  // The app pre-selects yearly too: it's the plan with the free trial.
  const [billing, setBilling] = useState<Billing>('yearly');
  const pro = c.pricing[billing];
  const saving = c.pricing.yearly.save.replace('{n}', formatNumber(yearlySaving(market) / 100, lang, { style: 'percent' }));
  // Whole pounds for EGP, cents for USD.
  const yearlyPerMonth = market === 'egp' ? Math.round(price.yearly / 12) : Math.round((price.yearly / 12) * 100) / 100;

  return (
    <>
      <a className="skip" href="#main">
        {c.a11y.skip}
      </a>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href={home} aria-label={c.brand}>
            <img src="/icon-192.png" alt="" width="36" height="36" />
            <span>{c.brand}</span>
          </a>
          <nav aria-label={c.a11y.sections}>
            <a href={to('how')}>{c.nav.how}</a>
            <a href={to('app')}>{c.nav.app}</a>
            <a href={to('features')}>{c.nav.features}</a>
            <a href={to('pricing')}>{c.nav.pricing}</a>
            <a href={to('faq')}>{c.nav.faq}</a>
          </nav>
          <div className="nav-actions">
            <a className="lang" href={switchHref} hrefLang={lang === 'ar' ? 'en' : 'ar'} lang={lang === 'ar' ? 'en' : 'ar'}>
              {c.nav.switchTo}
            </a>
            <a className="btn btn-primary btn-sm" href={to('download')}>
              {c.nav.get}
            </a>
          </div>
        </div>
      </header>

      {page !== 'home' ? (
        <LegalArticle lang={lang} page={page} />
      ) : (
        <main id="main">
          <section className="hero container">
            <div className="hero-copy">
              <span className="eyebrow">{c.hero.eyebrow}</span>
              <h1>
                {c.hero.title} <span className="accent">{c.hero.titleAccent}</span>
              </h1>
              <p className="lead">{c.hero.body}</p>
              <StoreButtons lang={lang} />
              <p className="note">{c.hero.note}</p>
            </div>
            <Phone lang={lang} />
          </section>

          <section className="dialects container" aria-label={c.dialects.title}>
            <span>{c.dialects.title}</span>
            <ul>
              {c.dialects.items.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>

          <section id="how" className="section container">
            <h2>{c.how.title}</h2>
            <p className="section-lead">{c.how.lead}</p>
            <ol className="steps">
              {c.how.steps.map((s, i) => (
                <li key={s.title} className="glass step">
                  <span className="step-n">{formatNumber(i + 1, lang)}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="app" className="section container">
            <h2>{c.screens.title}</h2>
            <p className="section-lead">{c.screens.lead}</p>
            <Screens lang={lang} />
          </section>

          <section id="features" className="section container">
            <h2>{c.features.title}</h2>
            <p className="section-lead">{c.features.lead}</p>
            <div className="grid">
              {c.features.items.map((f) => (
                <article key={f.title} className="glass feature">
                  <span className="feature-icon">
                    <Icon name={f.icon} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="pricing" className="section container">
            <h2>{c.pricing.title}</h2>
            <p className="section-lead">{c.pricing.lead}</p>
            <div className="pricing-controls">
              <div className="switch" role="group" aria-label={c.pricing.billingLabel}>
                {(['monthly', 'yearly'] as Billing[]).map((b) => (
                  <button key={b} type="button" aria-pressed={billing === b} onClick={() => setBilling(b)}>
                    {b === 'monthly' ? c.pricing.monthlyTab : c.pricing.yearlyTab}
                    {b === 'yearly' && <span className="switch-save">{saving}</span>}
                  </button>
                ))}
              </div>
              <div className="currency" role="group" aria-label={c.pricing.currencyLabel}>
                <span>{c.pricing.currencyLabel}</span>
                {(['usd', 'egp'] as Market[]).map((m) => (
                  <button key={m} type="button" aria-pressed={market === m} onClick={() => setMarket(m)}>
                    {m === 'usd' ? c.pricing.usd : c.pricing.egp}
                  </button>
                ))}
              </div>
            </div>
            <div className="plans">
              <article className="glass plan">
                <h3>{c.pricing.free.name}</h3>
                <p className="plan-tagline">{c.pricing.free.tagline}</p>
                <p className="plan-price">
                  <strong>{fmt(0)}</strong>
                </p>
                <ul>
                  {c.pricing.free.items.map((x) => (
                    <li key={x}>
                      <Icon name="check" /> {x}
                    </li>
                  ))}
                </ul>
                <a className="btn" href="#download">
                  {c.pricing.free.cta}
                </a>
              </article>
              <article className="glass plan plan-featured">
                <span className="plan-badge">{c.pricing.pro.badge}</span>
                <h3>{c.pricing.pro.name}</h3>
                <p className="plan-tagline">{pro.tagline}</p>
                <p className="plan-price">
                  <strong>{fmt(price[billing])}</strong> <span>{pro.per}</span>
                </p>
                {/* Kept (empty) on monthly so the card doesn't jump when switching. */}
                <p className="plan-note">
                  {billing === 'yearly' && (
                    <>
                      {c.pricing.pro.perMonth.replace('{price}', fmt(yearlyPerMonth))}
                      <span className="plan-save">{saving}</span>
                    </>
                  )}
                </p>
                <ul>
                  {c.pricing.proItems.map((x) => (
                    <li key={x}>
                      <Icon name="check" /> {x}
                    </li>
                  ))}
                </ul>
                <a className="btn btn-primary" href="#download">
                  {pro.cta}
                </a>
              </article>
            </div>
            <p className="footnote">{c.pricing.footnote}</p>
          </section>

          <section id="faq" className="section container narrow">
            <h2>{c.faq.title}</h2>
            <div className="faq">
              {c.faq.items.map((f) => (
                <details key={f.q} className="glass">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="download" className="section container">
            <div className="cta">
              <img src="/icon-192.png" alt="" width="72" height="72" />
              <h2>{c.cta.title}</h2>
              <p>{c.cta.body}</p>
              <StoreButtons lang={lang} />
            </div>
          </section>
        </main>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <span>
            <strong>{c.brand}</strong> · {c.footer.tagline}
          </span>
          <nav className="footer-links" aria-label={c.a11y.legal}>
            <a href={`${home}privacy/`}>{LEGAL[lang].privacy.title}</a>
            <a href={`${home}terms/`}>{LEGAL[lang].terms.title}</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </nav>
          <span>
            © {YEAR} Qolha. {c.footer.rights}
          </span>
        </div>
      </footer>
    </>
  );
}
