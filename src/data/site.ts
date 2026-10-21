// Everything the team still has to confirm lives here or in services.ts / team.ts.
export const site = {
  name: 'HBB — Harbor Beyond Borders',
  legalName: '[Legal name of the firm]',
  oaNumber: '[—]',
  nipc: '[—]',
  address: '[Address], Lisbon',
  phone: '+351 [—]',
  email: 'contact@[domain]',
  strategySessionPrice: '€[X]',
  // Google Analytics 4. Leave as is until the property exists; nothing loads while it is a placeholder.
  ga4Id: 'G-XXXXXXXXXX',
  // Microsoft Clarity project id (optional). Loads only after analytics consent.
  clarityId: '',
};

export const nav = [
  { href: '/#who-we-advise', label: 'Who we advise' },
  { href: '/services/', label: 'Services' },
  { href: '/team/', label: 'Our lawyers' },
  { href: '/fees/', label: 'Fees' },
  { href: '/insights/', label: 'Insights' },
];
