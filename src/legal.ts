// Privacy policy and terms of use, in English and Arabic. They describe what the app really does
// (see ../ma7fazty: Clerk sign-in, Supabase storage, z.ai speech and understanding, Lemon Squeezy
// payments). Have them reviewed by a lawyer before launch; update UPDATED with every change.

import type { Lang } from './content';

export type LegalPageId = 'privacy' | 'terms';

export const CONTACT_EMAIL = 'support@qolha.io';
const UPDATED = { en: 'October 5, 2026', ar: '٥ أكتوبر ٢٠٢٦' };

type Section = { heading: string; body: string[] };
export type LegalDoc = { title: string; description: string; updatedLabel: string; updated: string; intro: string; sections: Section[] };

export const LEGAL: Record<Lang, Record<LegalPageId, LegalDoc>> = {
  en: {
    privacy: {
      title: 'Privacy policy',
      description: 'What Qolha collects, why, who processes it, and how to delete it.',
      updatedLabel: 'Last updated',
      updated: UPDATED.en,
      intro:
        'Qolha ("we") is a voice money tracker. This policy explains what we collect when you use the Qolha app and website, why, and the choices you have. We do not sell your data, show ads, or use tracking or analytics tools.',
      sections: [
        {
          heading: 'What we collect',
          body: [
            'Your account: your email address and, if you sign in with Google or Apple, the name they share. Sign-in is handled by Clerk.',
            'What you record: transactions (amount, direction, description, category, date), wallets and their currencies, reminders, and the sentence you said or typed for each voice entry. When you fix a voice entry, the fix is kept so the same mistake isn’t repeated.',
            'Usage counts: how many voice messages you sent this month, to apply the free plan’s limit.',
            'Payments: if you subscribe, Lemon Squeezy (the merchant of record) processes your payment. We receive your subscription status, plan and email, never your card details.',
          ],
        },
        {
          heading: 'How voice works',
          body: [
            'Your phone’s speech recognizer (from Google on Android, Apple on iOS) turns what you say into text, under their own privacy terms.',
            'To find the transactions, that text is sent to z.ai. For a second, more accurate hearing, the short recording (up to 30 seconds) may also be sent to z.ai. Recordings are deleted from your phone right after.',
            'Typed sentences in the voice screen are sent to z.ai the same way. Entries you add by hand are not.',
          ],
        },
        {
          heading: 'Who processes your data',
          body: [
            'Clerk (sign-in), Supabase (database and server functions), z.ai (speech recognition and understanding what you said), Lemon Squeezy (payments and tax). Exchange rates are fetched from Coinbase and open.er-api.com without any personal data.',
            'These providers process data only to run the service. Some are outside Egypt, so your data may be transferred internationally.',
          ],
        },
        {
          heading: 'How we protect it',
          body: [
            'Data travels encrypted. In the database, access rules make sure each account can read only its own records. Keys for the AI and payment services stay on our servers, not in the app.',
          ],
        },
        {
          heading: 'Keeping and deleting your data',
          body: [
            'We keep your data while you have an account. You can export everything (Settings → Export) and delete all transactions at any time.',
            'Settings → Delete account permanently removes your account and all its data, and stops a paid plan from renewing. Payment records Lemon Squeezy must keep by law stay with them.',
          ],
        },
        {
          heading: 'Children',
          body: ['Qolha is not meant for children under 13, and we don’t knowingly collect their data.'],
        },
        {
          heading: 'Changes and contact',
          body: [
            'If this policy changes, we’ll update the date above and, for important changes, tell you in the app.',
            `Questions or requests: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of use',
      description: 'The rules for using Qolha, its free plan and Qolha Pro.',
      updatedLabel: 'Last updated',
      updated: UPDATED.en,
      intro: 'By using the Qolha app or website you agree to these terms. If you don’t agree, please don’t use Qolha.',
      sections: [
        {
          heading: 'The service',
          body: [
            'Qolha records income and expenses from what you say or type, keeps them in wallets, and shows reports and reminders. You need an account to use it.',
            'Qolha is a record-keeping tool. It is not a bank, does not move money, and does not give financial, tax or investment advice.',
          ],
        },
        {
          heading: 'AI can make mistakes',
          body: [
            'Voice entries are understood by an AI. It can mishear amounts or descriptions. Review your entries; you can fix or delete any of them.',
          ],
        },
        {
          heading: 'Plans and payments',
          body: [
            'The free plan includes 30 voice messages a month and everything else. Qolha Pro removes the voice limit.',
            'Pro is sold monthly or yearly by Lemon Squeezy, our merchant of record, in Egyptian pounds in Egypt and US dollars elsewhere. Taxes may apply.',
            'The yearly plan starts with a 7-day free trial. Cancel before it ends and you won’t be charged.',
            'Subscriptions renew automatically until cancelled. Cancel any time from Settings → Plan → Manage subscription; Pro stays active until the end of the period you paid for.',
            'Refunds follow Lemon Squeezy’s refund policy and the law where you live. We may change prices for future periods with notice.',
          ],
        },
        {
          heading: 'Your account and content',
          body: [
            'Keep your sign-in secure; you’re responsible for activity on your account. Your entries are yours. You let us store and process them only to run Qolha for you.',
            'Don’t misuse the service: no attacks, scraping, reverse engineering of our servers, or using the AI for anything other than recording your own money.',
          ],
        },
        {
          heading: 'Ending the service',
          body: [
            'You can delete your account at any time in Settings. We may suspend accounts that break these terms. If we ever shut Qolha down, we’ll give you time to export your data.',
          ],
        },
        {
          heading: 'Liability',
          body: [
            'Qolha is provided "as is". To the extent the law allows, we aren’t liable for indirect losses or for decisions made based on the app’s records, and our total liability is limited to what you paid us in the last 12 months.',
          ],
        },
        {
          heading: 'Law and contact',
          body: [
            'These terms are governed by the laws of the Arab Republic of Egypt, without limiting consumer rights you have where you live.',
            `Questions: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
  },
  ar: {
    privacy: {
      title: 'سياسة الخصوصية',
      description: 'إيه البيانات اللي «قولها» بيجمعها، وليه، ومين بيعالجها، وإزاي تمسحها.',
      updatedLabel: 'آخر تحديث',
      updated: UPDATED.ar,
      intro:
        '«قولها» تطبيق لتسجيل الفلوس بالصوت. السياسة دي بتوضح إيه اللي بنجمعه لما تستخدم التطبيق أو الموقع، وليه، والاختيارات اللي عندك. إحنا مش بنبيع بياناتك، ومفيش إعلانات، ومش بنستخدم أدوات تتبع أو تحليلات.',
      sections: [
        {
          heading: 'إيه اللي بنجمعه',
          body: [
            'حسابك: إيميلك، والاسم اللي جوجل أو أبل بيشاركوه لو سجلت دخول بيهم. تسجيل الدخول بيتم عن طريق Clerk.',
            'اللي بتسجله: العمليات (المبلغ، دخل ولا مصروف، الوصف، التصنيف، التاريخ)، المحافظ وعملاتها، التذكيرات، والجملة اللي قلتها أو كتبتها لكل عملية صوتية. ولما تصحح عملية صوتية، التصحيح بيتحفظ علشان الغلطة متتكررش.',
            'عدد الاستخدام: عدد الرسائل الصوتية اللي بعتها الشهر ده، علشان نطبق حد الباقة المجانية.',
            'الدفع: لو اشتركت، Lemon Squeezy (البائع الرسمي) هو اللي بيعالج الدفع. إحنا بنعرف حالة اشتراكك والباقة والإيميل بس، ومش بنشوف بيانات كارتك أبدًا.',
          ],
        },
        {
          heading: 'الصوت بيشتغل إزاي',
          body: [
            'خدمة التعرف على الكلام في موبايلك (من جوجل على أندرويد وأبل على آيفون) بتحوّل كلامك لنص، حسب شروط الخصوصية بتاعتهم.',
            'علشان نطلّع العمليات، النص ده بيتبعت لـ z.ai. ولسماع تاني أدق، ممكن التسجيل القصير (لحد ٣٠ ثانية) يتبعت لـ z.ai كمان. التسجيلات بتتمسح من موبايلك على طول بعدها.',
            'الجمل اللي بتكتبها في شاشة الصوت بتتبعت لـ z.ai بنفس الطريقة. العمليات اللي بتضيفها بإيدك لأ.',
          ],
        },
        {
          heading: 'مين بيعالج بياناتك',
          body: [
            'Clerk (تسجيل الدخول)، Supabase (قاعدة البيانات ووظايف السيرفر)، z.ai (التعرف على الكلام وفهمه)، Lemon Squeezy (الدفع والضرايب). أسعار العملات بتيجي من Coinbase و open.er-api.com من غير أي بيانات شخصية.',
            'الجهات دي بتعالج البيانات علشان الخدمة تشتغل بس. بعضها برّه مصر، فممكن بياناتك تتنقل لدول تانية.',
          ],
        },
        {
          heading: 'إزاي بنحميها',
          body: [
            'البيانات بتتنقل مشفرة. وفي قاعدة البيانات، قواعد الوصول بتضمن إن كل حساب يقرا سجلاته هو بس. ومفاتيح خدمات الذكاء الاصطناعي والدفع موجودة على سيرفراتنا، مش جوه التطبيق.',
          ],
        },
        {
          heading: 'الاحتفاظ بالبيانات ومسحها',
          body: [
            'بنحتفظ ببياناتك طول ما حسابك موجود. تقدر تصدّر كل حاجة (الإعدادات ← تصدير) وتمسح كل العمليات في أي وقت.',
            'الإعدادات ← امسح الحساب بيمسح حسابك وكل بياناته نهائي، وبيوقف تجديد الباقة المدفوعة. سجلات الدفع اللي Lemon Squeezy لازم يحتفظ بيها قانونًا بتفضل عندهم.',
          ],
        },
        {
          heading: 'الأطفال',
          body: ['«قولها» مش موجّه للأطفال أقل من ١٣ سنة، ومش بنجمع بياناتهم عن قصد.'],
        },
        {
          heading: 'التغييرات والتواصل',
          body: [
            'لو السياسة دي اتغيرت، هنحدّث التاريخ اللي فوق، وفي التغييرات المهمة هنبلغك جوه التطبيق.',
            `أسئلة أو طلبات: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
    terms: {
      title: 'شروط الاستخدام',
      description: 'قواعد استخدام «قولها» والباقة المجانية و«قولها برو».',
      updatedLabel: 'آخر تحديث',
      updated: UPDATED.ar,
      intro: 'باستخدامك لتطبيق «قولها» أو موقعه بتوافق على الشروط دي. لو مش موافق، متستخدمش «قولها».',
      sections: [
        {
          heading: 'الخدمة',
          body: [
            '«قولها» بيسجل الدخل والمصروف من كلامك أو كتابتك، ويحفظهم في محافظ، ويوريك تقارير وتذكيرات. لازم يكون عندك حساب علشان تستخدمه.',
            '«قولها» أداة لتسجيل الحسابات. مش بنك، ومش بيحوّل فلوس، ومش بيقدم نصايح مالية أو ضريبية أو استثمارية.',
          ],
        },
        {
          heading: 'الذكاء الاصطناعي ممكن يغلط',
          body: ['العمليات الصوتية بيفهمها ذكاء اصطناعي، وممكن يسمع المبلغ أو الوصف غلط. راجع عملياتك؛ تقدر تعدّل أو تمسح أي واحدة.'],
        },
        {
          heading: 'الباقات والدفع',
          body: [
            'الباقة المجانية فيها ٣٠ رسالة صوتية في الشهر وكل حاجة تانية. «قولها برو» بيشيل حد الرسائل الصوتية.',
            'برو بيتباع شهري أو سنوي عن طريق Lemon Squeezy، البائع الرسمي، بالجنيه المصري في مصر وبالدولار في باقي الدول. ممكن تتضاف ضرايب.',
            'الباقة السنوية بتبدأ بتجربة مجانية ٧ أيام. لو لغيت قبل ما تخلص مش هتدفع حاجة.',
            'الاشتراك بيتجدد تلقائي لحد ما تلغيه. تقدر تلغي في أي وقت من الإعدادات ← الباقة ← إدارة الاشتراك، وبرو بيفضل شغال لحد آخر المدة اللي دفعتها.',
            'الاسترداد حسب سياسة Lemon Squeezy والقانون في بلدك. ممكن نغيّر الأسعار للفترات الجاية مع إبلاغك قبلها.',
          ],
        },
        {
          heading: 'حسابك ومحتواك',
          body: [
            'حافظ على أمان تسجيل دخولك؛ إنت مسؤول عن اللي بيحصل في حسابك. عملياتك ملكك، وإنت بتسمحلنا نحفظها ونعالجها علشان نشغّل «قولها» ليك بس.',
            'متسيئش استخدام الخدمة: ممنوع الهجمات، أو سحب البيانات، أو الهندسة العكسية لسيرفراتنا، أو استخدام الذكاء الاصطناعي في أي حاجة غير تسجيل فلوسك.',
          ],
        },
        {
          heading: 'إنهاء الخدمة',
          body: [
            'تقدر تمسح حسابك في أي وقت من الإعدادات. ممكن نوقف الحسابات اللي بتخالف الشروط دي. ولو قفلنا «قولها» في يوم، هنديك وقت تصدّر بياناتك.',
          ],
        },
        {
          heading: 'المسؤولية',
          body: [
            '«قولها» بيتقدم «كما هو». في حدود ما يسمح بيه القانون، مش مسؤولين عن الخسائر غير المباشرة أو القرارات المبنية على سجلات التطبيق، وأقصى مسؤوليتنا هي اللي دفعته لنا في آخر ١٢ شهر.',
          ],
        },
        {
          heading: 'القانون والتواصل',
          body: [
            'الشروط دي بيحكمها قانون جمهورية مصر العربية، من غير ما ينتقص من حقوقك كمستهلك في بلدك.',
            `أسئلة: ${CONTACT_EMAIL}`,
          ],
        },
      ],
    },
  },
};
