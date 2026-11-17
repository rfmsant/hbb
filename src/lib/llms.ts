import { getCollection } from 'astro:content';
import { areas, paths } from '../data/areas';
import { site } from '../data/site';
import { plain } from './text';
import { localePath } from '../i18n/config';

// llms.txt: a plain summary for AI assistants. Objective facts only, in line with the Bar's advertising rules.
export async function buildLlms(siteURL: URL, full: boolean) {
  const base = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/'), siteURL);
  const u = (p: string) => new URL(p.replace(/^\//, ''), base).href;
  const posts = (await getCollection('insights', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  const L: string[] = [];
  L.push('# HBB — Harbor Beyond Borders', '');
  L.push('> Law firm in Lisbon (sociedade de advogados) for companies and for people moving to Portugal. Practice areas: Immigration & Nationality, Contracts, Employment Law, Corporate & Commercial Law, Real Estate, GDPR & Compliance. Advice in Portuguese and English, by video, phone or in person in Lisbon.', '');
  L.push('## Key facts', '');
  L.push(`- Legal name: ${plain(site.legalName)}`);
  L.push(`- Location: ${plain(site.address)}, Portugal`);
  L.push('- Lawyers registered with the Portuguese Bar Association (Ordem dos Advogados)');
  L.push('- Languages: Portuguese, English');
  L.push(`- Book an initial meeting: ${u('/book/')} (Portuguese: ${u(localePath('pt', '/book/'))})`, '');
  L.push('## Who we advise', '');
  for (const p of Object.values(paths)) L.push(`- [${p.eyebrow.en}](${u(p.enPath)}): ${p.lead.en}`);
  L.push('', '## Practice areas', '');
  for (const a of areas) {
    L.push(`- [${a.title.en}](${u(`/areas/${a.slug}/`)}): ${a.short.en} (Portuguese: ${u(localePath('pt', `/areas/${a.slug}/`))})`);
    if (full) {
      L.push('', `  ${a.lead.en}`, '', '  Matters:');
      for (const m of a.matters.en) L.push(`  - ${m}`);
      L.push('', '  For the first meeting:');
      for (const m of a.prepare.en) L.push(`  - ${m}`);
      L.push('');
    }
  }
  if (posts.length) {
    L.push('', '## Insights', '');
    for (const p of posts) {
      L.push(`- [${p.data.title}](${u(`/insights/${p.slug}/`)}): ${p.data.description} (last checked ${(p.data.updated ?? p.data.date).toISOString().slice(0, 10)})`);
      if (full) L.push('', p.body.trim().split('\n').map((x) => `  ${x}`).join('\n'), '');
    }
  }
  L.push('', '## Optional', '');
  L.push(`- [Full text for AI tools](${u('/llms-full.txt')})`);
  L.push('', 'Information on this site is general and does not replace legal advice for a specific case.');
  return L.join('\n');
}
