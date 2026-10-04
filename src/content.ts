// Everything the landing page says, in English and Egyptian Arabic (the app's own voice).
// Prices must match the Lemon Squeezy variants (see ../ma7fazty/PRICING.md).

export type Lang = 'en' | 'ar';
export type Market = 'usd' | 'egp';

export const PRICES: Record<Market, { monthly: number; yearly: number; currency: string }> = {
  usd: { monthly: 4.99, yearly: 39.99, currency: 'USD' },
  egp: { monthly: 99, yearly: 799, currency: 'EGP' },
};

export const FREE_VOICE_PER_MONTH = 30;
/** The yearly plans start with a free trial. */
export const TRIAL_DAYS = 7;

export function formatPrice(amount: number, currency: string, lang: Lang) {
  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const yearlySaving = (m: Market) => Math.round((1 - PRICES[m].yearly / (PRICES[m].monthly * 12)) * 100);

/** Numbers in the page's own digits: 30 in English, ٣٠ in Arabic. */
export const formatNumber = (n: number, lang: Lang, options?: Intl.NumberFormatOptions) =>
  n.toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', options);

const ar = (n: number) => formatNumber(n, 'ar');

type Feature = { icon: string; title: string; body: string };
type Faq = { q: string; a: string };

export type Content = {
  meta: { title: string; description: string; keywords: string; ogLocale: string };
  brand: string;
  a11y: { skip: string; sections: string; legal: string };
  nav: { how: string; app: string; features: string; pricing: string; faq: string; switchTo: string; switchHref: string; get: string };
  hero: { eyebrow: string; title: string; titleAccent: string; body: string; note: string };
  store: { appStore: string; googlePlay: string; downloadOn: string; getItOn: string; soon: string };
  phone: {
    greeting: string;
    wallet: string;
    balanceLabel: string;
    heard: string;
    said: string;
    item: string;
    category: string;
    item2: string;
    category2: string;
    saved: string;
  };
  screens: {
    title: string;
    lead: string;
    captions: { title: string; body: string }[];
    wallets: { title: string; total: string; cash: string; bank: string; card: string; move: string; exchange: string; rate: string };
    reports: { title: string; month: string; in: string; out: string; kept: string; top: string; months: string[]; categories: string[] };
    history: {
      title: string;
      search: string;
      filters: string[];
      today: string;
      said: string;
      salary: string;
      salaryCategory: string;
      rent: string;
      rentCategory: string;
      yesterday: string;
      subscription: string;
      subscriptionCategory: string;
    };
  };
  how: { title: string; lead: string; steps: { title: string; body: string }[] };
  features: { title: string; lead: string; items: Feature[] };
  dialects: { title: string; items: string[] };
  pricing: {
    title: string;
    lead: string;
    currencyLabel: string;
    usd: string;
    egp: string;
    billingLabel: string;
    monthlyTab: string;
    yearlyTab: string;
    pro: { name: string; badge: string; perMonth: string };
    free: { name: string; price: string; tagline: string; items: string[]; cta: string };
    monthly: { name: string; per: string; tagline: string; cta: string };
    yearly: { name: string; per: string; tagline: string; save: string; cta: string; badge: string };
    proItems: string[];
    footnote: string;
  };
  faq: { title: string; items: Faq[] };
  cta: { title: string; body: string };
  footer: { tagline: string; rights: string };
};

export const CONTENT: Record<Lang, Content> = {
  en: {
    meta: {
      title: 'Qolha — Voice money tracker in Arabic & English | Say it. It’s saved.',
      description:
        'Qolha turns what you say into income and expense entries. Speak Egyptian, Gulf or Levantine Arabic, MSA or English — several transactions in one sentence, multi-currency wallets, monthly reports.',
      keywords:
        'voice expense tracker, Arabic expense tracker, Egyptian Arabic budget app, money tracker app, voice budgeting, multi currency wallet, قولها, مصاريف بالصوت',
      ogLocale: 'en_US',
    },
    brand: 'Qolha',
    a11y: { skip: 'Skip to content', sections: 'Sections', legal: 'Legal' },
    nav: { how: 'How it works', app: 'The app', features: 'Features', pricing: 'Pricing', faq: 'FAQ', switchTo: 'العربية', switchHref: '/ar/', get: 'Get the app' },
    hero: {
      eyebrow: 'Voice-first money tracker',
      title: 'Say it.',
      titleAccent: 'It’s saved.',
      body: 'Tell Qolha what you spent or earned — in any Arabic dialect or in English — and it becomes a transaction. No forms, no typing, no categories to pick.',
      note: `Free to start · ${FREE_VOICE_PER_MONTH} voice messages a month · iPhone & Android`,
    },
    store: { appStore: 'App Store', googlePlay: 'Google Play', downloadOn: 'Download on the', getItOn: 'Get it on', soon: 'Coming soon' },
    phone: {
      greeting: 'Good morning',
      wallet: 'Main wallet',
      balanceLabel: 'Current balance · EGP',
      heard: 'I heard',
      said: '“bought coffee for 65 and paid the internet 450”',
      item: 'Coffee',
      category: 'Eating out · Debit',
      item2: 'Internet',
      category2: 'Bills · Debit',
      saved: 'Saved 2 transactions',
    },
    screens: {
      title: 'Inside the app',
      lead: 'Everything you say lands in a wallet you can actually read.',
      captions: [
        { title: 'Every wallet, every currency', body: 'Cash, bank and cards side by side, added up at today’s rate. Move money or exchange currency in a tap.' },
        { title: 'See where it went', body: 'Six months at a glance, then each month in detail: what came in, what went out, and what you kept.' },
        { title: 'Find anything', body: 'Search by item, what you said or amount. Each voice message stays grouped under your own words.' },
      ],
      wallets: { title: 'Wallets', total: 'Total · EGP', cash: 'Cash', bank: 'Bank', card: 'Card', move: 'Move money', exchange: 'Currency exchange', rate: '1 USD = 52.23 EGP' },
      reports: {
        title: 'Reports',
        month: 'September',
        in: 'In',
        out: 'Out',
        kept: 'You kept',
        top: 'Top spending',
        months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        categories: ['Rent', 'Groceries', 'Eating out'],
      },
      history: {
        title: 'History',
        search: 'Search item, words or amount',
        filters: ['All', 'In', 'Out', 'This month'],
        today: 'Today',
        said: '“got my salary 15k and paid rent 4,000”',
        salary: 'Salary',
        salaryCategory: 'Income · Credit',
        rent: 'Rent',
        rentCategory: 'Home · Debit',
        yesterday: 'Yesterday',
        subscription: 'Netflix',
        subscriptionCategory: 'Subscriptions · Debit',
      },
    },
    how: {
      title: 'How it works',
      lead: 'Three seconds from spending money to having it recorded.',
      steps: [
        { title: 'Tap Speak', body: 'One big button, always within reach of your thumb.' },
        { title: 'Say what happened', body: '“Got my salary 15k and paid rent 4,000” — one sentence, as many entries as you mention.' },
        { title: 'Done', body: 'Amounts, money in or out, categories and wallets are filled in. Tap any entry to fix it.' },
      ],
    },
    features: {
      title: 'Everything a wallet needs. Nothing it doesn’t.',
      lead: 'Built for the way people in Egypt and the Arab world actually talk about money.',
      items: [
        { icon: 'mic', title: 'Speak your dialect', body: 'Egyptian, Gulf, Levantine or MSA, mixed with English words like “cash” or “Netflix”. Or just type the sentence.' },
        { icon: 'layers', title: 'Many entries, one sentence', body: 'Say several things at once. Each becomes its own entry, grouped under what you said.' },
        { icon: 'sparkle', title: 'Learns from your fixes', body: 'Correct an amount or a word once. Qolha remembers, so the same mistake isn’t repeated.' },
        { icon: 'wallet', title: 'Wallets in any currency', body: 'Cash EGP, bank USD, card CAD. Each keeps its own currency; the total uses today’s rate.' },
        { icon: 'swap', title: 'Move money and exchange', body: 'Record transfers and currency exchanges between wallets at the rate you actually got. They never count as spending.' },
        { icon: 'chart', title: 'Monthly reports', body: 'Money in and out, what you kept, top spending and income — month by month, year by year.' },
        { icon: 'search', title: 'Search and filters', body: 'Find any entry by item, what you said or amount, then filter by money in or out and by date.' },
        { icon: 'bell', title: 'Smart reminders', body: 'Rent, subscriptions and salary show up when they’re due; one tap adds them. Qolha spots repeats and offers them.' },
        { icon: 'shield', title: 'Yours, everywhere', body: 'Synced to your account with per-user security, exact to the piastre. Undo any delete, export or import any time.' },
      ],
    },
    dialects: { title: 'Understands', items: ['Egyptian Arabic', 'Gulf Arabic', 'Levantine Arabic', 'Modern Standard Arabic', 'English', 'Arabizi words'] },
    pricing: {
      title: 'Simple pricing',
      lead: 'Start free. Upgrade when your voice does all the work.',
      currencyLabel: 'Prices in',
      usd: 'USD',
      egp: 'EGP (Egypt)',
      billingLabel: 'Billing',
      monthlyTab: 'Monthly',
      yearlyTab: 'Yearly',
      pro: { name: 'Pro', badge: 'Most popular', perMonth: 'That’s {price} a month' },
      free: {
        name: 'Free',
        price: '0',
        tagline: 'For trying it out and light use.',
        items: [`${FREE_VOICE_PER_MONTH} voice messages a month`, 'Unlimited manual entries', 'Wallets, reports, reminders', 'Export & import'],
        cta: 'Download free',
      },
      monthly: { name: 'Pro monthly', per: '/ month', tagline: 'Talk as much as you want.', cta: 'Start Pro' },
      yearly: { name: 'Pro yearly', per: '/ year', tagline: `Best value for daily use. ${TRIAL_DAYS} days free, then billed yearly.`, save: 'Save {n}', cta: `Try ${TRIAL_DAYS} days free`, badge: 'Best value' },
      proItems: ['Unlimited voice & typed messages', 'Everything in Free', 'Keeps Qolha independent and ad-free', 'Cancel any time'],
      footnote: 'Subscribe from the app. Payments are handled securely by Lemon Squeezy; sales tax or VAT may be added depending on your country. Customers in Egypt pay in EGP, everyone else in USD.',
    },
    faq: {
      title: 'Questions',
      items: [
        { q: 'Which languages does Qolha understand?', a: 'Arabic — Egyptian, Gulf, Levantine and Modern Standard — and English. You can mix them: English words said in Arabic mode, like “cash” or “Netflix”, are understood.' },
        { q: 'Can I say more than one transaction at once?', a: 'Yes. “Got my salary 15,000 and paid rent 4,000” saves two entries: one money in, one money out, grouped under what you said.' },
        { q: 'What if it hears me wrong?', a: 'Every result is shown right away. Tap an entry to fix it, or fix the words and send again. Qolha remembers your corrections so the same mistake isn’t repeated.' },
        { q: 'Does it support different currencies?', a: 'Yes. Create a wallet per currency. Say “paid 40 Canadian dollars” and it goes to your CAD wallet; the combined total uses today’s exchange rate.' },
        { q: 'Is my data private?', a: 'Your transactions are stored in your own account with row-level security, so only you can read them. What you say is sent to the AI only to find the transactions.' },
        { q: 'What does the free plan include?', a: `Everything, with ${FREE_VOICE_PER_MONTH} voice messages a month. Manual entries are always unlimited. Pro removes the voice limit.` },
        { q: 'Does it work on iPhone and Android?', a: 'Yes, on both. The app comes in English and Arabic (with the layout mirrored right to left), in light and dark.' },
        { q: 'Can I take my data with me?', a: 'Yes. Export your transactions as a spreadsheet (CSV) or a full backup any time, and import them from a file. Deleting your account removes everything.' },
      ],
    },
    cta: { title: 'Your next expense is one sentence away.', body: 'Download Qolha and say what you spent today.' },
    footer: { tagline: 'Say it. It’s saved.', rights: 'All rights reserved.' },
  },
  ar: {
    meta: {
      title: 'قولها — سجّل مصاريفك ودخلك بصوتك بالعربي والإنجليزي',
      description:
        'قولها بيحوّل كلامك لعمليات دخل ومصروف. اتكلم مصري أو خليجي أو شامي أو فصحى أو إنجليزي — كذا عملية في جملة واحدة، محافظ بكل العملات، وتقارير شهرية.',
      keywords: 'تطبيق مصاريف, تسجيل المصاريف بالصوت, ميزانية, محفظة, حساب المصروفات, تطبيق فلوس, قولها, Qolha',
      ogLocale: 'ar_EG',
    },
    brand: 'قولها',
    a11y: { skip: 'انتقل للمحتوى', sections: 'الأقسام', legal: 'روابط قانونية' },
    nav: { how: 'بيشتغل إزاي', app: 'التطبيق', features: 'المميزات', pricing: 'الأسعار', faq: 'أسئلة', switchTo: 'English', switchHref: '/', get: 'نزّل التطبيق' },
    hero: {
      eyebrow: 'محفظتك بصوتك',
      title: 'قولها',
      titleAccent: 'وتتسجل.',
      body: 'قول صرفت إيه أو قبضت إيه — بأي لهجة عربية أو بالإنجليزي — و«قولها» يسجلها عملية. من غير فورم، ولا كتابة، ولا تختار تصنيفات.',
      note: `ابدأ مجانًا · ${ar(FREE_VOICE_PER_MONTH)} رسالة صوتية في الشهر · آيفون وأندرويد`,
    },
    store: { appStore: 'App Store', googlePlay: 'Google Play', downloadOn: 'نزّله من', getItOn: 'نزّله من', soon: 'قريبًا' },
    phone: {
      greeting: 'صباح الخير',
      wallet: 'المحفظة الأساسية',
      balanceLabel: 'الرصيد الحالي · جنيه',
      heard: 'سمعت',
      said: '«اشتريت قهوة ب ٦٥ ودفعت النت ٤٥٠»',
      item: 'قهوة',
      category: 'أكل برّه · مصروف',
      item2: 'النت',
      category2: 'فواتير · مصروف',
      saved: 'اتسجلت عمليتين',
    },
    screens: {
      title: 'جوّه التطبيق',
      lead: 'كل اللي بتقوله بيوصل لمحفظة تقدر تقراها بجد.',
      captions: [
        { title: 'كل المحافظ، بكل العملات', body: 'الكاش والبنك والكروت جنب بعض، ومتجمّعين بسعر النهارده. حوّل فلوس أو غيّر عملة بدوسة.' },
        { title: 'اعرف فلوسك راحت فين', body: 'آخر ست شهور في لمحة، وبعدين كل شهر بالتفصيل: دخل قد إيه، وطلع قد إيه، ووفّرت قد إيه.' },
        { title: 'لاقي أي حاجة', body: 'دوّر بالحاجة أو بالكلام اللي قلته أو بالمبلغ. وكل رسالة صوتية عملياتها متجمّعة تحت كلامك.' },
      ],
      wallets: { title: 'المحافظ', total: 'الإجمالي · جنيه', cash: 'كاش', bank: 'بنك', card: 'كارت', move: 'حوّل فلوس', exchange: 'تغيير عملة', rate: '١ دولار = ٥٢٫٢٣ جنيه' },
      reports: {
        title: 'التقارير',
        month: 'سبتمبر',
        in: 'دخل',
        out: 'مصروف',
        kept: 'وفّرت',
        top: 'أكتر حاجات صرفت عليها',
        months: ['أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر'],
        categories: ['الإيجار', 'البقالة', 'أكل برّه'],
      },
      history: {
        title: 'السجل',
        search: 'دوّر بالحاجة أو الكلام أو المبلغ',
        filters: ['الكل', 'دخل', 'مصروف', 'الشهر ده'],
        today: 'النهارده',
        said: '«قبضت المرتب ١٥ ألف ودفعت الإيجار ٤٠٠٠»',
        salary: 'المرتب',
        salaryCategory: 'دخل',
        rent: 'الإيجار',
        rentCategory: 'البيت · مصروف',
        yesterday: 'امبارح',
        subscription: 'نتفلكس',
        subscriptionCategory: 'اشتراكات · مصروف',
      },
    },
    how: {
      title: 'بيشتغل إزاي',
      lead: 'تلات ثواني من ما تصرف لحد ما تتسجل.',
      steps: [
        { title: 'دوس «اتكلم»', body: 'زرار واحد كبير، دايمًا تحت صباعك.' },
        { title: 'قول اللي حصل', body: '«قبضت المرتب ١٥ ألف ودفعت الإيجار ٤٠٠٠» — جملة واحدة، وكل اللي قلته يتسجل.' },
        { title: 'خلاص', body: 'المبلغ، دخل ولا مصروف، التصنيف والمحفظة بيتملوا لوحدهم. دوس على أي عملية تعدّلها.' },
      ],
    },
    features: {
      title: 'كل اللي المحفظة محتاجاه. ومفيش زيادة.',
      lead: 'معمول على طريقة كلامنا الحقيقية عن الفلوس.',
      items: [
        { icon: 'mic', title: 'اتكلم بلهجتك', body: 'مصري أو خليجي أو شامي أو فصحى، ومعاه كلام إنجليزي زي «كاش» و«نتفلكس». أو اكتب الجملة وخلاص.' },
        { icon: 'layers', title: 'كذا عملية في جملة', body: 'قول كذا حاجة مرة واحدة. كل واحدة بتتسجل لوحدها تحت كلامك.' },
        { icon: 'sparkle', title: 'بيتعلم من تصحيحاتك', body: 'صحّح مبلغ أو كلمة مرة واحدة. «قولها» بيفتكر، فالغلطة متتكررش.' },
        { icon: 'wallet', title: 'محافظ بأي عملة', body: 'كاش بالجنيه، بنك بالدولار، كارت بالكندي. كل محفظة بعملتها، والإجمالي بسعر النهارده.' },
        { icon: 'swap', title: 'تحويل وتغيير عملة', body: 'سجّل التحويل بين محافظك أو تغيير العملة بالسعر اللي خدته فعلًا. ومش بيتحسب مصروف.' },
        { icon: 'chart', title: 'تقارير شهرية', body: 'الدخل والمصروف، وفّرت قد إيه، وأكتر حاجات صرفت عليها — شهر بشهر، وسنة بسنة.' },
        { icon: 'search', title: 'بحث وفلاتر', body: 'لاقي أي عملية بالحاجة أو الكلام أو المبلغ، وفلتر بالدخل أو المصروف وبالتاريخ.' },
        { icon: 'bell', title: 'تذكيرات ذكية', body: 'الإيجار والاشتراكات والمرتب بيظهروا في ميعادهم، ودوسة واحدة تضيفهم. «قولها» بيلاحظ المتكرر ويقترحه.' },
        { icon: 'shield', title: 'بتاعتك، في كل حتة', body: 'متزامنة مع حسابك بحماية لكل مستخدم، مظبوطة بالقرش. تقدر ترجّع أي حاجة مسحتها، وتصدّر أو تستورد في أي وقت.' },
      ],
    },
    dialects: { title: 'بيفهم', items: ['مصري', 'خليجي', 'شامي', 'فصحى', 'إنجليزي', 'كلمات فرانكو'] },
    pricing: {
      title: 'أسعار بسيطة',
      lead: 'ابدأ مجانًا. واشترك لما صوتك يبقى هو اللي بيعمل كل الشغل.',
      currencyLabel: 'الأسعار بـ',
      usd: 'الدولار',
      egp: 'الجنيه (مصر)',
      billingLabel: 'الدفع',
      monthlyTab: 'شهري',
      yearlyTab: 'سنوي',
      pro: { name: 'برو', badge: 'الأكتر طلبًا', perMonth: 'يعني {price} في الشهر' },
      free: {
        name: 'مجاني',
        price: '0',
        tagline: 'علشان تجرّب، أو استخدام خفيف.',
        items: [`${ar(FREE_VOICE_PER_MONTH)} رسالة صوتية في الشهر`, 'عمليات يدوي من غير حدود', 'محافظ وتقارير وتذكيرات', 'تصدير واستيراد'],
        cta: 'نزّله مجانًا',
      },
      monthly: { name: 'برو شهري', per: '/ شهر', tagline: 'اتكلم براحتك.', cta: 'اشترك في برو' },
      yearly: { name: 'برو سنوي', per: '/ سنة', tagline: `أوفر حاجة للاستخدام اليومي. ${ar(TRIAL_DAYS)} أيام مجانًا، وبعدها الدفع سنوي.`, save: 'وفّر {n}', cta: `جرّبه ${ar(TRIAL_DAYS)} أيام مجانًا`, badge: 'الأوفر' },
      proItems: ['رسائل صوتية ومكتوبة من غير حدود', 'كل اللي في المجاني', 'بيخلّي «قولها» مستقل ومن غير إعلانات', 'تلغي في أي وقت'],
      footnote: 'الاشتراك من جوه التطبيق. الدفع بيتم بأمان عن طريق Lemon Squeezy، وممكن تتضاف ضريبة حسب بلدك. اللي في مصر بيدفع بالجنيه، والباقي بالدولار.',
    },
    faq: {
      title: 'أسئلة',
      items: [
        { q: '«قولها» بيفهم لغات إيه؟', a: 'العربي — مصري وخليجي وشامي وفصحى — والإنجليزي. وتقدر تخلط: كلمات إنجليزي زي «كاش» و«نتفلكس» بتتفهم وانت بتتكلم عربي.' },
        { q: 'أقدر أقول أكتر من عملية مرة واحدة؟', a: 'أيوه. «قبضت المرتب ١٥ ألف ودفعت الإيجار ٤٠٠٠» بتسجل عمليتين: دخل ومصروف، تحت كلامك.' },
        { q: 'لو سمعني غلط؟', a: 'النتيجة بتظهر على طول. دوس على العملية وعدّلها، أو صحّح الكلام وابعته تاني. و«قولها» بيفتكر تصحيحاتك علشان الغلطة متتكررش.' },
        { q: 'بيدعم عملات مختلفة؟', a: 'أيوه. اعمل محفظة لكل عملة. قول «دفعت ٤٠ دولار كندي» وتروح لمحفظة الكندي، والإجمالي بسعر الصرف النهارده.' },
        { q: 'بياناتي آمنة؟', a: 'عملياتك متسجلة في حسابك بحماية على مستوى كل مستخدم، فمحدش يقدر يقراها غيرك. كلامك بيتبعت للذكاء الاصطناعي بس علشان يطلّع العمليات.' },
        { q: 'الباقة المجانية فيها إيه؟', a: `كل حاجة، مع ${ar(FREE_VOICE_PER_MONTH)} رسالة صوتية في الشهر. العمليات اليدوي دايمًا من غير حدود. برو بيشيل حد الرسائل الصوتية.` },
        { q: 'شغال على آيفون وأندرويد؟', a: 'أيوه، على الاتنين. والتطبيق بالعربي والإنجليزي (والشاشة بتتقلب من اليمين للشمال)، فاتح أو غامق.' },
        { q: 'أقدر آخد بياناتي معايا؟', a: 'أيوه. صدّر عملياتك كجدول (CSV) أو نسخة احتياطية كاملة في أي وقت، واستوردها من ملف. ولو مسحت حسابك كل حاجة بتتمسح.' },
      ],
    },
    cta: { title: 'مصروفك الجاي على بعد جملة.', body: 'نزّل «قولها» وقول صرفت إيه النهارده.' },
    footer: { tagline: 'قولها وتتسجل.', rights: 'كل الحقوق محفوظة.' },
  },
};
