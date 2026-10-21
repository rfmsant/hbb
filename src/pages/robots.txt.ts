import type { APIRoute } from 'astro';
// Preview builds (PUBLIC_NOINDEX=1) block everything. Production welcomes search engines and AI assistants.
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot', 'Meta-ExternalAgent', 'DuckAssistBot', 'MistralAI-User'];
export const GET: APIRoute = ({ site }) => {
  const base = new URL(import.meta.env.BASE_URL.replace(/\/?$/, '/'), site);
  const body = import.meta.env.PUBLIC_NOINDEX === '1'
    ? 'User-agent: *\nDisallow: /\n'
    : [...AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /admin/\n`), 'User-agent: *\nAllow: /\nDisallow: /admin/\n', `Sitemap: ${new URL('sitemap-index.xml', base).href}`, `# For AI assistants: ${new URL('llms.txt', base).href}`].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
