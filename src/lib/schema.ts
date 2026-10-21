import { site } from '../data/site';
import { team } from '../data/team';
import { areas } from '../data/services';
import { ok } from './text';
import { planned, locales } from '../i18n/config';

const abs = (base: URL, p: string) => new URL(p.replace(/^\//, ''), base).href;

export function orgSchema(base: URL) {
  const id = abs(base, '/#firm');
  return {
    '@type': ['LegalService', 'Organization'],
    '@id': id,
    name: 'HBB — Harbor Beyond Borders',
    alternateName: ['HBB', 'Harbor Beyond Borders'],
    legalName: ok(site.legalName),
    url: abs(base, '/'),
    logo: abs(base, '/logo.svg'),
    image: abs(base, '/icon-512.png'),
    description: 'Independent law firm in Lisbon advising investors, founders and families moving to Portugal on residency (Golden Visa, D7, D8, D2), citizenship, tax, property and succession. Fixed fees, no commissions from funds or developers, free 20-minute first call.',
    telephone: ok(site.phone),
    email: ok(site.email),
    taxID: ok(site.nipc),
    address: { '@type': 'PostalAddress', streetAddress: ok(site.address.replace(', Lisbon', '')), addressLocality: 'Lisbon', addressCountry: 'PT' },
    areaServed: [{ '@type': 'Country', name: 'Portugal' }, 'Worldwide'],
    availableLanguage: planned.map((l) => locales[l].label),
    knowsAbout: ['Portugal Golden Visa', 'Portugal D7 visa', 'Portugal D8 digital nomad visa', 'Portugal D2 visa', 'Portuguese citizenship', 'IFICI tax regime', 'Portuguese tax residency', 'Buying property in Portugal', 'Portuguese inheritance law', ...areas.map((a) => a.title)],
    priceRange: '€€€',
    employee: team.map((l) => personSchema(base, l.slug)),
  };
}

export function personSchema(base: URL, slug: string) {
  const l = team.find((x) => x.slug === slug)!;
  return {
    '@type': 'Person',
    '@id': abs(base, `/team/#${l.slug}`),
    name: l.name,
    jobTitle: l.role,
    worksFor: { '@id': abs(base, '/#firm') },
    url: abs(base, `/team/#${l.slug}`),
    knowsAbout: l.areas,
    description: ok(l.bio),
  };
}

export const breadcrumbs = (base: URL, items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(base, path) })),
});

export const faqSchema = (faq: [string, string][]) => {
  const items = faq.map(([q, a]) => [q, ok(a)] as const).filter(([, a]) => a);
  return items.length ? { '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) } : null;
};

export const graph = (...nodes: unknown[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });
