// After `astro build`, prefix root links ("/services/") with BASE_PATH ("/hbb/services/") for GitHub Pages.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (!base) process.exit(0);
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const esc = base.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const re = new RegExp(`(href|src|action)="/(?!/|${esc}/)`, 'g');
for (const f of walk('dist').filter((f) => f.endsWith('.html'))) {
  const s = readFileSync(f, 'utf8'); const t = s.replace(re, `$1="${base}/`);
  if (s !== t) writeFileSync(f, t);
}
console.log('rebased links to', base);
