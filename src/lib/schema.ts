import { site } from '../data/site';
import { areas } from '../data/areas';
import { ok } from './text';
import { live, locales } from '../i18n/config';

const abs = (base: URL, p: string) => new URL(p.replace(/^\//, ''), base).href;

// Objective facts only (Bar advertising rules): no fees, figures or claims.
export function orgSchema(base: URL) {
  return {
    '@type': ['LegalService', 'Organization'],
    '@id': abs(base, '/#firm'),
    name: 'HBB — Harbor Beyond Borders',
    alternateName: ['HBB', 'Harbor Beyond Borders'],
    legalName: ok(site.legalName),
    url: abs(base, '/'),
    description: 'Law firm in Lisbon advising companies and people moving to Portugal on immigration and nationality, contracts, employment law, corporate and commercial law, real estate, and GDPR and compliance. Advice in Portuguese and English.',
    telephone: ok(site.phone),
    email: ok(site.email),
    taxID: ok(site.nipc),
    address: { '@type': 'PostalAddress', streetAddress: ok(site.address.replace(', Lisboa', '')), addressLocality: 'Lisboa', addressCountry: 'PT' },
    areaServed: { '@type': 'Country', name: 'Portugal' },
    availableLanguage: live.map((l) => locales[l].label),
    knowsAbout: areas.map((a) => a.title.en),
  };
}

export const breadcrumbs = (base: URL, items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(base, path) })),
});

export const graph = (...nodes: unknown[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });
