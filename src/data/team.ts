// Bios, years, languages and Bar numbers to be supplied by each lawyer. Values after | are preview samples.
// photo: Unsplash id used only in preview builds (PUBLIC_SAMPLE=1). bookingUrl: the lawyer's Microsoft Bookings page.
export type Lawyer = { slug: string; name: string; role: string; areas: string[]; bookingUrl: string; photo: string; meta: string; bio: string };

export const team: Lawyer[] = [
  { slug: 'florbela-lopes', name: 'Florbela Lopes', role: 'Founding Partner · Immigration & Residence', areas: ['Golden Visa', 'D7', 'D8', 'Family reunification'], bookingUrl: '', photo: '1573496359142-b8d87734a5a2',
    meta: '[X|15] years in practice · [Languages|English, Portuguese, French] · Ordem dos Advogados nº [—|00000L]',
    bio: '[Short bio|Florbela has advised international families on Portuguese residency for fifteen years, from first visa to citizenship. She leads every Golden Visa case at HBB.]' },
  { slug: 'leandro-nogueira', name: 'Leandro Nogueira', role: 'Immigration, Nationality & Real Estate', areas: ['Citizenship', 'Property'], bookingUrl: '', photo: '1560250097-0b93528c311a',
    meta: '[X|11] years in practice · [Languages|English, Portuguese, Spanish] · Ordem dos Advogados nº [—|00000L]',
    bio: '[Short bio|Leandro handles nationality applications and property purchases, including due diligence on homes bought by clients relocating to Portugal.]' },
  { slug: 'diogo-pedro', name: 'Diogo Pedro', role: 'Tax & Corporate', areas: ['Tax', 'D2', 'Companies'], bookingUrl: '', photo: '1519085360753-af0119f7cbe7',
    meta: '[X|12] years in practice · [Languages|English, Portuguese] · Ordem dos Advogados nº [—|00000L]',
    bio: '[Short bio|Diogo plans the tax side of every move: tax residence, IFICI, company structures and income from abroad.]' },
  { slug: 'margarida-tempera', name: 'Margarida Tempera', role: 'Litigation, Business & Corporate', areas: ['Business', 'Succession', 'Disputes'], bookingUrl: '', photo: '1618491609764-0dc04604a02a',
    meta: '[X|10] years in practice · [Languages|English, Portuguese, Italian] · Ordem dos Advogados nº [—|00000L]',
    bio: '[Short bio|Margarida advises on company matters, cross-border succession and disputes, with a focus on families with assets in several countries.]' },
];

export const bySlug = (s: string) => team.find((l) => l.slug === s)!;
