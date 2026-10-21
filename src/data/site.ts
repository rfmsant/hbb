// Everything the team still has to confirm lives here or in services.ts / team.ts.
export const site = {
  name: 'HBB — Harbor Beyond Borders',
  legalName: '[Legal name of the firm|Harbor Beyond Borders — Sociedade de Advogados, SP, RL]',
  oaNumber: '[—|00/26]',
  nipc: '[—|500 000 000]',
  address: '[Address|Avenida da Liberdade 110], Lisbon',
  phone: '+351 [—|210 000 000]',
  email: 'contact@[domain|harborbeyondborders.com]',
  strategySessionPrice: '€[X|450]',
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
