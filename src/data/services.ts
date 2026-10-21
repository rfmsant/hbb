// Service pages. Text in [square brackets] is shown highlighted on the site until the lawyers confirm it.
export type Row = string[];
export type Service = {
  slug: string; area: string; title: string; short: string; intro: string; lawyer: string;
  glance: [string, string][];
  table?: { head: string[]; rows: Row[]; note?: string };
  fit?: string[]; other?: [string, string][];
  steps: [string, string][];
  fees: Row[];
  faq: [string, string][];
};

const commonFees = (main = 'from €[X]'): Row[] => [
  ['First call, 20 minutes', 'Free', 'No commitment'],
  ['Strategy session, 60 minutes', '€[X]', 'Credited in full if you engage us'],
  ['HBB fee', main, 'Fixed in your engagement letter'],
  ['Official fees', '€[—]', 'Paid to the authorities, listed with their source'],
];

export const areas = [
  { slug: 'residency', title: 'Residency & citizenship', short: 'Golden Visa, D7, D8, D2, family members, renewals and nationality.' },
  { slug: 'tax', title: 'Tax & wealth on arrival', short: 'Tax residence, special regimes for newcomers, exits and cross-border income.' },
  { slug: 'property', title: 'Property', short: 'Legal due diligence, purchase contracts and deeds for homes and investments.' },
  { slug: 'company', title: 'Company & investment', short: 'Incorporation, holding structures and moving a business to Portugal.' },
  { slug: 'succession', title: 'Succession & estate', short: 'Wills, Portuguese inheritance rules and planning across jurisdictions.' },
];

export const services: Service[] = [
  {
    slug: 'golden-visa', area: 'residency', lawyer: 'florbela-lopes',
    title: 'Golden Visa & investor residency',
    short: 'EU residence through a qualifying investment, with limited time required in Portugal.',
    intro: 'EU residence for you and your family through a qualifying investment, with limited time required in Portugal. We structure the investment, the application and your tax position as one plan, independently.',
    glance: [['Qualifying investment', 'from €[—], by route'], ['Time in Portugal', '[X days per period]'], ['Family included', '[spouse, children, parents]'], ['Indicative timeline', '[X–Y months]'], ['Our fee', 'from €[X], fixed']],
    table: {
      head: ['Route', 'Minimum', 'What to consider', 'Source'],
      rows: [
        ['Investment fund units', '€[—]', 'Fund fees, lock-up period, exit terms', '[Law, article]'],
        ['Company incorporation or capital, with job creation', '€[—] + [X] jobs', 'Hiring obligations during the residence period', '[Law, article]'],
        ['Scientific research', '€[—]', 'Eligible institutions only', '[Law, article]'],
        ['Arts and cultural heritage', '€[—]', 'A donation, not an investment you recover', '[Law, article]'],
        ['Buying residential property', '—', 'No longer a qualifying route since 2023', 'Law 56/2023'],
      ],
      note: 'We do not sell funds or properties and receive no commissions from them. We review fund documentation, fees and exit terms on your behalf.',
    },
    fit: ['You want EU residence without living in Portugal full time', 'You are ready to make a qualifying investment', 'You want to include your spouse, children or parents', 'You are thinking about citizenship in the long term'],
    other: [['You will live here most of the year on passive income', 'd7-visa'], ['You work remotely for clients or an employer abroad', 'd8-visa'], ['You are founding or moving a company', 'd2-visa']],
    steps: [['Free first call, then investment review', 'The route that fits your assets, family and tax position.'], ['Tax number, bank account and due diligence', 'NIF, Portuguese account and legal checks on the investment.'], ['Application', 'Documents, translations and submission to AIMA, with an update at each stage.'], ['Biometrics, card and renewals', 'We accompany your appointment and track every renewal date for you.']],
    fees: commonFees(),
    faq: [
      ['Can I still qualify by buying property?', 'No. Property purchase routes were removed in 2023. [Lawyers to confirm wording: how property can sit alongside another route.]'],
      ['How long until citizenship?', 'The nationality law changed in 2026: the residence period is now longer and counts from your first residence permit. [Lawyers to confirm the exact wording for this page.]'],
      ['Will I become tax resident in Portugal?', 'Not automatically. Residence and tax residence are different, and our tax lawyer reviews your position before you invest.'],
      ['Can you guarantee approval or timing?', 'No. Decisions and timelines belong to the authorities. We make sure your application is complete and correct.'],
      ['Do you receive commissions from funds?', 'No. Our only fee is the one you pay us.'],
    ],
  },
  {
    slug: 'd7-visa', area: 'residency', lawyer: 'florbela-lopes',
    title: 'D7 visa (passive income)',
    short: 'For people who will live in Portugal on pensions, investments or rental income.',
    intro: 'The D7 is for people who will live in Portugal most of the year on passive income: pensions, investments, dividends or rental income. We prepare the consular application, the AIMA appointment and your tax position on arrival.',
    glance: [['Income required', '[€X per month, main applicant]'], ['Time in Portugal', 'Most of the year'], ['Family included', '[spouse, children, parents]'], ['Indicative timeline', '[X–Y months]'], ['Our fee', 'from €[X], fixed']],
    fit: ['You will live in Portugal most of the year', 'Your income is passive: pension, investments, rent', 'You want your tax position settled before you arrive'],
    other: [['You want residence without living here full time', 'golden-visa'], ['You work remotely', 'd8-visa']],
    steps: [['Free first call', 'We confirm the D7 fits and list your documents.'], ['NIF, bank account and accommodation', 'The three things the consulate checks first.'], ['Consular application', 'We prepare and review every document before you submit.'], ['AIMA appointment and residence card', 'We prepare you for the appointment and track renewals.']],
    fees: commonFees(),
    faq: [['How much income do I need?', '[Lawyers to confirm the current threshold and how it is calculated per family member.]'], ['Can I work on a D7?', '[Lawyers to confirm.]'], ['Will I pay tax in Portugal?', 'Usually yes, once you become tax resident. Our tax lawyer reviews your position before you move.']],
  },
  {
    slug: 'd8-visa', area: 'residency', lawyer: 'florbela-lopes',
    title: 'D8 visa (remote work)',
    short: 'For remote workers earning from clients or an employer abroad.',
    intro: 'The D8 is for people who work remotely for clients or an employer outside Portugal. There is a temporary stay option and a residence option; we help you choose and prepare the right one.',
    glance: [['Income required', '[€X per month]'], ['Options', 'Temporary stay or residence'], ['Family included', '[spouse, children]'], ['Indicative timeline', '[X–Y months]'], ['Our fee', 'from €[X], fixed']],
    fit: ['You work for an employer or clients abroad', 'You can prove regular income', 'You plan to base yourself in Portugal'],
    other: [['You are setting up your own company here', 'd2-visa'], ['Your income is passive', 'd7-visa']],
    steps: [['Free first call', 'Temporary stay or residence: we choose with you.'], ['Documents', 'Contracts, income proof, NIF and accommodation.'], ['Consular application', 'Prepared and reviewed by your lawyer.'], ['AIMA and tax', 'Residence card, then your tax registration.']],
    fees: commonFees(),
    faq: [['Where will I pay income tax?', 'It depends on your tax residence and contracts. We review it before you move.'], ['Can my family come with me?', '[Lawyers to confirm wording.]']],
  },
  {
    slug: 'd2-visa', area: 'company', lawyer: 'diogo-pedro',
    title: 'D2 visa (entrepreneurs)',
    short: 'For founders starting or moving a company to Portugal.',
    intro: 'The D2 is for founders and independent professionals who start or move a business to Portugal. We set up the company, prepare the business case and plan your tax position together.',
    glance: [['Investment', '[no fixed minimum: lawyers to confirm wording]'], ['Business plan', 'Required'], ['Family included', '[spouse, children]'], ['Indicative timeline', '[X–Y months]'], ['Our fee', 'from €[X], fixed']],
    fit: ['You are founding or moving a company', 'You can show means to support yourself', 'You want company and tax set up together'],
    other: [['You work remotely for others', 'd8-visa'], ['You prefer an investment route', 'golden-visa']],
    steps: [['Free first call', 'Is the D2 the right vehicle for your business?'], ['Company set-up', 'Incorporation, bank account, accountant.'], ['Business case and application', 'Prepared with you and reviewed before submission.'], ['Residence card and tax', 'AIMA appointment and your tax registration.']],
    fees: commonFees(),
    faq: [['Do I need to hire employees?', '[Lawyers to confirm.]'], ['Can I apply for IFICI?', 'Possibly, depending on your activity. We check eligibility in the first call.']],
  },
  {
    slug: 'citizenship', area: 'residency', lawyer: 'leandro-nogueira',
    title: 'Citizenship & permanent residence',
    short: 'Nationality by residence, descent or marriage, and long-term residence.',
    intro: 'Since 19 May 2026 the residence period for citizenship is longer and counts from your first residence permit. We review where you stand and prepare your application when you qualify.',
    glance: [['Residence period', '[7 years EU/CPLP, 10 years others: lawyers to confirm]'], ['Language', 'Portuguese, A2 level'], ['Other requirements', 'Civic assessment, clean record'], ['Our fee', 'from €[X], fixed']],
    steps: [['Free first call', 'We check your dates and which rules apply to you.'], ['Documents', 'Records, certificates and translations.'], ['Application', 'Submitted and followed until the decision.']],
    fees: commonFees(),
    faq: [['I applied before May 2026. Which rules apply?', 'Applications filed before 19 May 2026 continue under the previous rules. [Lawyers to confirm wording.]'], ['Can I become a citizen by descent?', '[Lawyers to confirm.]']],
  },
  {
    slug: 'tax', area: 'tax', lawyer: 'diogo-pedro',
    title: 'Tax & wealth on arrival',
    short: 'Tax residence, IFICI, exits and cross-border income, planned before you move.',
    intro: 'The best time to plan your taxes is before you arrive. We look at your income, assets and the year you become tax resident, and set out what to do and when.',
    glance: [['When to start', 'Before you move'], ['Special regime', 'IFICI, if your activity qualifies'], ['Our fee', 'from €[X], fixed']],
    steps: [['Free first call', 'Your income, assets and timing.'], ['Tax plan', 'In writing, with the order of steps.'], ['Registration and filings', 'NIF, tax residence, IFICI and annual returns.']],
    fees: commonFees(),
    faq: [['Does the NHR still exist?', 'No. It closed to new residents and was replaced by IFICI, which is narrower.'], ['When do I become tax resident?', 'It depends on your days in Portugal and your habitual residence. We check it with you.']],
  },
  {
    slug: 'property', area: 'property', lawyer: 'leandro-nogueira',
    title: 'Property',
    short: 'Buying a home or investment property safely.',
    intro: 'From the first offer to the deed, we check the property, the contracts and the taxes, so you know exactly what you are buying.',
    glance: [['Includes', 'Due diligence, CPCV, deed'], ['Taxes on purchase', 'IMT and stamp duty'], ['Our fee', 'from €[X], fixed']],
    steps: [['Free first call', 'Your plans and budget.'], ['Due diligence', 'Registry, licences, debts and charges.'], ['Contracts and deed', 'Promissory contract, then the deed.']],
    fees: commonFees(),
    faq: [['Can I buy before I have residence?', 'Yes. You only need a NIF. [Lawyers to confirm wording.]'], ['Does buying give me a Golden Visa?', 'No. Property purchase stopped qualifying in 2023.']],
  },
  {
    slug: 'succession', area: 'succession', lawyer: 'margarida-tempera',
    title: 'Succession & estate',
    short: 'Wills and inheritance across borders.',
    intro: 'Portuguese inheritance rules can apply to you once you live here. We help you choose the law that governs your estate, write the right will and plan across countries.',
    glance: [['Includes', 'Wills, choice of law, gifts'], ['Our fee', 'from €[X], fixed']],
    steps: [['Free first call', 'Your family, assets and countries involved.'], ['Plan', 'Choice of law and the documents you need.'], ['Documents', 'Will and supporting acts, signed in Portugal.']],
    fees: commonFees(),
    faq: [['Can I keep my home country\'s inheritance law?', 'Often yes, under the EU Succession Regulation. [Lawyers to confirm wording.]']],
  },
];

export const bySlug = (s: string) => services.find((x) => x.slug === s)!;
