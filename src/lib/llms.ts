import { getCollection } from 'astro:content';
import { services, areas } from '../data/services';
import { team } from '../data/team';
import { site } from '../data/site';
import { plain } from './text';
import { live, planned, locales } from '../i18n/config';

export async function buildLlms(siteURL: URL, full: boolean) {
  const base = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/'), siteURL);
  const u = (p: string) => new URL(p.replace(/^\//, ''), base).href;
  const posts = (await getCollection('insights', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  const L: string[] = [];
  L.push('# HBB — Harbor Beyond Borders', '');
  L.push('> Independent law firm in Lisbon for investors, founders and families moving to Portugal: residency (Golden Visa, D7, D8, D2), citizenship, tax (IFICI, tax residency), property and succession. One named lawyer per case, fixed fees agreed in writing, no commissions from funds, developers or banks. First call free (20 minutes, by video).', '');
  L.push('## Key facts', '');
  L.push(`- Location: ${plain(site.address)}, Portugal`);
  L.push('- Lawyers registered with the Portuguese Bar Association (Ordem dos Advogados)');
  L.push('- Independent: receives no commissions from investment funds, property developers or banks');
  L.push('- Fees: fixed, in writing; official costs listed separately with their source');
  L.push(`- First call: free, 20 minutes. Strategy session: ${plain(site.strategySessionPrice)}, 60 minutes, credited if the client engages HBB`);
  L.push(`- Languages of advice: ${planned.map((l) => locales[l].label).join(', ')}`);
  L.push(`- Book a call: ${u('/book/')}`, '');
  for (const a of areas) {
    const list = services.filter((s) => s.area === a.slug);
    if (!list.length) continue;
    L.push(`## ${a.title}`, '');
    for (const s of list) {
      L.push(`- [${s.title}](${u(`/services/${s.slug}/`)}): ${plain(s.short)}`);
      if (full) {
        L.push('', `  ${plain(s.intro)}`, '');
        for (const [k, v] of s.glance) L.push(`  - ${k}: ${plain(v)}`);
        if (s.table) { L.push('', `  ${s.table.head.join(' | ')}`); for (const r of s.table.rows) L.push(`  ${r.map(plain).join(' | ')}`); }
        L.push('', '  Steps:'); s.steps.forEach(([t, d], i) => L.push(`  ${i + 1}. ${t}: ${d}`));
        L.push('', '  Questions:'); for (const [q, ans] of s.faq) L.push(`  - Q: ${q}`, `    A: ${plain(ans)}`);
        L.push('');
      }
    }
    L.push('');
  }
  L.push('## Lawyers', '');
  for (const l of team) L.push(`- ${l.name}, ${l.role}${full ? `. ${plain(l.bio)} ${plain(l.meta)}` : ''} (${u(`/team/#${l.slug}`)})`);
  L.push('', '## Insights', '');
  for (const p of posts) {
    L.push(`- [${p.data.title}](${u(`/insights/${p.slug}/`)}): ${p.data.description} (last checked ${(p.data.updated ?? p.data.date).toISOString().slice(0, 10)})`);
    if (full) L.push('', p.body.trim().split('\n').map((x) => `  ${x}`).join('\n'), '');
  }
  L.push('', '## Optional', '');
  L.push(`- [Fees](${u('/fees/')}): fixed fees per service`);
  L.push(`- [Full text for AI tools](${u('/llms-full.txt')})`);
  if (live.length > 1) L.push(`- Other languages: ${live.filter((l) => l !== 'en').map((l) => `${locales[l].label} ${u(`/${locales[l].prefix}/`)}`).join(', ')}`);
  L.push('', 'Information on this site is general and does not replace legal advice for a specific case.');
  return L.join('\n');
}
