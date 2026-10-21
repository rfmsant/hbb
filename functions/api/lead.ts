// Cloudflare Pages Function: receives the booking questionnaire and forwards it to Zoho.
// Set these in Cloudflare Pages > Settings > Environment variables (never in the code):
//   ZOHO_FLOW_WEBHOOK  — the Zoho Flow webhook URL that creates/updates the lead in Zoho CRM
//   ALLOWED_ORIGIN     — e.g. https://www.yourdomain.com
interface Env { ZOHO_FLOW_WEBHOOK?: string; ALLOWED_ORIGIN?: string }

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin') || '';
  if (env.ALLOWED_ORIGIN && origin !== env.ALLOWED_ORIGIN) return new Response('Forbidden', { status: 403 });
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return new Response('Bad request', { status: 400 }); }
  const email = String(data.email || '');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !data.name) return new Response('Missing name or email', { status: 422 });
  // Keep only the fields we expect.
  const keep = ['answers', 'route', 'priority', 'lawyer', 'callType', 'callTitle', 'name', 'email', 'phone', 'country', 'marketing', 'page'];
  const lead = Object.fromEntries(keep.map((k) => [k, data[k]]));
  if (!env.ZOHO_FLOW_WEBHOOK) return Response.json({ ok: true, note: 'Webhook not configured yet' });
  const r = await fetch(env.ZOHO_FLOW_WEBHOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }) });
  return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
};
