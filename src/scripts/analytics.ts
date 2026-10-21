// GA4 with Consent Mode v2. Analytics only loads after the visitor accepts.
import { site } from '../data/site';
declare global { interface Window { dataLayer: unknown[]; gtag: (...a: unknown[]) => void; } }
const KEY = 'hbb-consent';
const ready = /^G-[A-Z0-9]{6,}$/.test(site.ga4Id) && site.ga4Id !== 'G-XXXXXXXXXX';

export function getConsent(): 'all' | 'none' | null {
  try { return localStorage.getItem(KEY) as 'all' | 'none' | null; } catch { return null; }
}
function boot() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
}
let loaded = false;
function load() {
  if (!ready || loaded) return; loaded = true;
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}`; document.head.appendChild(s);
  window.gtag('js', new Date()); window.gtag('config', site.ga4Id);
  if (site.clarityId) {
    const c = document.createElement('script'); c.async = true; c.src = `https://www.clarity.ms/tag/${site.clarityId}`; document.head.appendChild(c);
  }
}
export function applyConsent(all: boolean) {
  try { localStorage.setItem(KEY, all ? 'all' : 'none'); } catch {}
  window.gtag('consent', 'update', { analytics_storage: all ? 'granted' : 'denied' });
  if (all) load();
}
/** Send a GA4 event. Safe to call before consent: events queue but are not stored without consent. */
export function track(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', name, params);
  if (!ready) console.debug('[analytics]', name, params);
}
boot();
// Visits arriving from AI assistants: recorded as an 'ai_referral' event with the source.
const AI_SOURCES: Record<string, string> = { 'chatgpt.com': 'ChatGPT', 'chat.openai.com': 'ChatGPT', 'perplexity.ai': 'Perplexity', 'www.perplexity.ai': 'Perplexity', 'claude.ai': 'Claude', 'gemini.google.com': 'Gemini', 'copilot.microsoft.com': 'Copilot', 'www.bing.com': 'Bing / Copilot', 'chat.mistral.ai': 'Mistral', 'chat.deepseek.com': 'DeepSeek', 'you.com': 'You.com', 'grok.com': 'Grok', 'meta.ai': 'Meta AI' };
try {
  const ref = document.referrer ? new URL(document.referrer).hostname : '';
  const utm = new URLSearchParams(location.search).get('utm_source') || '';
  const src = AI_SOURCES[ref] || (/chatgpt|openai|perplexity|claude|gemini|copilot/i.test(utm) ? utm : '');
  if (src && !sessionStorage.getItem('hbb-ai')) { sessionStorage.setItem('hbb-ai', '1'); window.gtag('event', 'ai_referral', { ai_source: src, landing_page: location.pathname }); }
} catch {}
if (getConsent() === 'all') { window.gtag('consent', 'update', { analytics_storage: 'granted' }); load(); }
