// Languages. English has no prefix; Portuguese lives under /pt/ with Portuguese slugs.
export const locales = {
  en: { label: 'English', short: 'EN', html: 'en', prefix: '', date: 'en-GB' },
  pt: { label: 'Português', short: 'PT', html: 'pt-PT', prefix: 'pt', date: 'pt-PT' },
} as const;
export type Locale = keyof typeof locales;
export const live: Locale[] = ['en', 'pt'];
export const planned: Locale[] = live;

// English path → Portuguese path (without /pt). Anything not listed keeps its English slug.
const ptPaths: Record<string, string> = {
  '/for-companies/': '/empresas/',
  '/moving-to-portugal/': '/mudar-para-portugal/',
  '/team/': '/equipa/',
  '/book/': '/marcar/',
  '/insights/': '/artigos/',
  '/privacy/': '/privacidade/',
  '/terms/': '/aviso-legal/',
};
export const ptAreaSlugs: Record<string, string> = {
  immigration: 'imigracao-nacionalidade',
  contracts: 'contratos',
  employment: 'direito-laboral',
  corporate: 'direito-comercial',
  'real-estate': 'imobiliario',
  'data-protection': 'rgpd-compliance',
};

/** URL of a page in a language. `enPath` is always the English path, e.g. "/areas/contracts/". */
export function localePath(l: Locale, enPath: string) {
  if (l === 'en') return enPath;
  const area = enPath.match(/^\/areas\/([^/]+)\/$/);
  const p = area ? `/areas/${ptAreaSlugs[area[1]] ?? area[1]}/` : ptPaths[enPath] ?? enPath;
  return `/pt${p}`;
}
