// HBB Revisão — API (Cloudflare Pages Function + D1)
// Quem é quem vem do Cloudflare Access (cabeçalho com o email). Os emails ficam em variáveis de ambiente, nunca no código:
//   ROLE_A1  — emails da advogada 1 (Imigração e Nacionalidade, Comercial), separados por vírgulas
//   ROLE_A2  — emails da advogada 2 (Contratos, Laboral, Real Estate, RGPD e Compliance, Comercial)
//   ROLE_RUI — emails do Rui
//   TASK_KEY — chave secreta da tarefa que escreve os artigos (cabeçalho X-Task-Key)
//   WA_RUI   — número de WhatsApp do Rui (formato 351XXXXXXXXX)
//   GOAL     — objetivo mensal de artigos aprovados (por defeito 40)
//   DEV      — "1" só em desenvolvimento local: permite ?as=a1|a2|rui sem Access
interface Env { DB: D1Database; ROLE_A1?: string; ROLE_A2?: string; ROLE_RUI?: string; TASK_KEY?: string; WA_RUI?: string; GOAL?: string; DEV?: string }
type Role = 'a1' | 'a2' | 'rui';
const AREAS: Record<string, string[]> = { a1: ['IM', 'CM', 'FORA'], a2: ['CT', 'LB', 'CM', 'IB', 'RG', 'FORA'] };
const now = () => new Date().toISOString();
const month = () => now().slice(0, 7);
const json = (d: unknown, s = 200) => Response.json(d, { status: s, headers: { 'cache-control': 'no-store' } });
const bad = (m: string, s = 400) => json({ error: m }, s);
const inList = (list: string | undefined, email: string) => (list || '').split(',').map((x) => x.trim().toLowerCase()).filter(Boolean).includes(email);

function roleOf(req: Request, env: Env, url: URL): Role | null {
  if (env.DEV === '1') { const as = url.searchParams.get('as'); if (as === 'a1' || as === 'a2' || as === 'rui') return as; }
  const email = (req.headers.get('cf-access-authenticated-user-email') || '').toLowerCase();
  if (!email) return null;
  if (inList(env.ROLE_RUI, email)) return 'rui';
  if (inList(env.ROLE_A1, email)) return 'a1';
  if (inList(env.ROLE_A2, email)) return 'a2';
  return null;
}
const ph = (n: number) => Array(n).fill('?').join(',');
async function log(env: Env, who: string, kind: string, ref: string, detail = '') {
  await env.DB.prepare('INSERT INTO events (at,who,kind,ref,detail) VALUES (?,?,?,?,?)').bind(now(), who, kind, ref, detail).run();
}
async function body(req: Request) { try { return await req.json() as any; } catch { return {}; } }

export const onRequest: PagesFunction<Env> = async ({ request, env, params }) => {
  const url = new URL(request.url);
  const path = ((params.path as string[]) || []).join('/');
  const m = request.method;
  const DB = env.DB;

  // ---------- tarefa que escreve os artigos ----------
  if (path.startsWith('task/')) {
    if (!env.TASK_KEY || request.headers.get('x-task-key') !== env.TASK_KEY) return bad('forbidden', 403);
    if (path === 'task/queue' && m === 'GET') {
      const write = await DB.prepare(`SELECT t.* FROM topics t LEFT JOIN articles a ON a.topic_id=t.id WHERE t.decision IN ('sim','mas') AND a.id IS NULL ORDER BY t.decided_at`).all();
      const fix = await DB.prepare(`SELECT * FROM articles WHERE status IN ('fixing','rewriting') ORDER BY updated_at`).all();
      return json({ write: write.results, fix: fix.results });
    }
    if (path === 'task/article' && m === 'POST') {
      const b = await body(request);
      if (!b.id || !b.title || !b.body_html || !Array.isArray(b.facts)) return bad('id, title, body_html e facts são obrigatórios');
      const ex = await DB.prepare('SELECT * FROM articles WHERE id=?').bind(b.id).first<any>();
      if (ex) {
        await DB.prepare(`UPDATE articles SET title=?,description=?,body_html=?,facts=?,review_note=?,status='review',version=version+1,corrections=NULL,updated_at=? WHERE id=?`)
          .bind(b.title, b.description || '', b.body_html, JSON.stringify(b.facts), b.review_note || '', now(), b.id).run();
        await log(env, 'task', 'article_v', b.id); return json({ ok: true, version: ex.version + 1 });
      }
      const t = await DB.prepare('SELECT * FROM topics WHERE id=?').bind(b.topic_id || '').first<any>();
      if (!t) return bad('topic_id desconhecido');
      await DB.prepare(`INSERT INTO articles (id,topic_id,area,audience,owner,title,description,body_html,facts,review_note,status,version,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,'review',1,?,?)`)
        .bind(b.id, t.id, t.area, t.audience, t.decided_by || t.suggested_by || 'a1', b.title, b.description || '', b.body_html, JSON.stringify(b.facts), b.review_note || '', now(), now()).run();
      await log(env, 'task', 'article', b.id); return json({ ok: true, version: 1 });
    }
    return bad('not found', 404);
  }

  const role = roleOf(request, env, url);
  if (!role) return bad('sem acesso', 403);
  const goal = Number(env.GOAL || 40);
  const areas = role === 'rui' ? ['IM', 'CT', 'LB', 'CM', 'IB', 'RG', 'FORA'] : AREAS[role];

  if (path === 'me') return json({ role, areas, goal, wa: env.WA_RUI || '' });

  if (path === 'summary') {
    const fin = await DB.prepare(`SELECT owner, COUNT(*) n FROM articles WHERE approved_at LIKE ? GROUP BY owner`).bind(month() + '%').all<any>();
    const by: Record<string, number> = { a1: 0, a2: 0 }; fin.results.forEach((r) => (by[r.owner] = r.n));
    const st = await DB.prepare(`SELECT status, COUNT(*) n FROM articles ${role === 'rui' ? '' : 'WHERE owner=?'} GROUP BY status`).bind(...(role === 'rui' ? [] : [role])).all<any>();
    const pend = await DB.prepare(`SELECT COUNT(*) n FROM topics WHERE released=1 AND decision IS NULL AND area IN (${ph(areas.length)})`).bind(...areas).first<any>();
    const writing = await DB.prepare(`SELECT COUNT(*) n FROM topics t LEFT JOIN articles a ON a.topic_id=t.id WHERE t.decision IN ('sim','mas') AND a.id IS NULL ${role === 'rui' ? '' : 'AND t.decided_by=?'}`).bind(...(role === 'rui' ? [] : [role])).first<any>();
    const status: Record<string, number> = {}; st.results.forEach((r) => (status[r.status] = r.n));
    return json({ goal, month: month(), by, status, pendingTopics: pend?.n || 0, writing: writing?.n || 0 });
  }

  if (path === 'topics' && m === 'GET') {
    const r = await DB.prepare(`SELECT * FROM topics WHERE released=1 AND decision IS NULL AND area IN (${ph(areas.length)}) ORDER BY priority`).bind(...areas).all();
    return json(r.results);
  }
  if (path === 'topics/decided' && m === 'GET') {
    const r = await DB.prepare(`SELECT t.*, (SELECT COUNT(*) FROM articles a WHERE a.topic_id=t.id) has_article FROM topics t WHERE decided_by=? ORDER BY decided_at DESC LIMIT 50`).bind(role).all();
    return json(r.results);
  }
  if (path === 'topics/more' && m === 'POST') {
    if (role === 'rui') return bad('só advogadas');
    const r = await DB.prepare(`UPDATE topics SET released=1 WHERE id IN (SELECT id FROM topics WHERE released=0 AND decision IS NULL AND area IN (${ph(areas.length)}) ORDER BY priority LIMIT 10)`).bind(...areas).run();
    await log(env, role, 'more', '', String(r.meta.changes));
    return json({ added: r.meta.changes });
  }
  let mm = path.match(/^topics\/([^/]+)\/decide$/);
  if (mm && m === 'POST') {
    if (role === 'rui') return bad('só advogadas');
    const b = await body(request); const id = decodeURIComponent(mm[1]);
    const t = await DB.prepare('SELECT * FROM topics WHERE id=?').bind(id).first<any>();
    if (!t || !areas.includes(t.area)) return bad('tema não encontrado', 404);
    if (b.decision === null) { // desfazer
      if (t.decided_by !== role) return bad('não foi decidido por si', 409);
      const a = await DB.prepare('SELECT id FROM articles WHERE topic_id=?').bind(id).first();
      if (a) return bad('o artigo já foi escrito', 409);
      await DB.prepare('UPDATE topics SET decision=NULL,decision_note=NULL,decided_by=NULL,decided_at=NULL WHERE id=?').bind(id).run();
      await log(env, role, 'undo', id); return json({ ok: true });
    }
    if (!['sim', 'nao', 'mas'].includes(b.decision)) return bad('decisão inválida');
    if (t.decision) return bad('já decidido', 409);
    await DB.prepare('UPDATE topics SET decision=?,decision_note=?,decided_by=?,decided_at=? WHERE id=?').bind(b.decision, b.note || null, role, now(), id).run();
    await log(env, role, 'decide', id, b.decision); return json({ ok: true });
  }
  if (path === 'suggest' && m === 'POST') {
    if (role === 'rui') return bad('só advogadas');
    const b = await body(request); const q = String(b.question || '').trim();
    if (q.length < 10 || !areas.includes(b.area)) return bad('pergunta ou área em falta');
    const n = await DB.prepare(`SELECT COUNT(*) n FROM topics WHERE suggested_by IS NOT NULL`).first<any>();
    const id = 'S' + ((n?.n || 0) + 1);
    await DB.prepare(`INSERT INTO topics (id,area,audience,title,question,origin,priority,released,decision,decided_by,decided_at,suggested_by,why,link) VALUES (?,?,?,?,?,'Sugestão',0,1,'sim',?,?,?,?,?)`)
      .bind(id, b.area, b.audience || null, q, q, role, now(), role, b.why || null, b.link || null).run();
    await log(env, role, 'suggest', id); return json({ ok: true, id });
  }
  if (path === 'learned') {
    const who = role === 'rui' ? url.searchParams.get('who') || 'a1' : role;
    const t = await DB.prepare(`SELECT id,area,title,decision,decision_note,suggested_by,why FROM topics WHERE decided_by=? ORDER BY decided_at DESC`).bind(who).all<any>();
    const a = await DB.prepare(`SELECT ref,detail,at FROM events WHERE who=? AND kind='fixes' ORDER BY at DESC LIMIT 30`).bind(who).all<any>();
    return json({ topics: t.results, fixes: a.results });
  }
  if (path === 'articles' && m === 'GET') {
    const q = `SELECT id,topic_id,area,audience,owner,title,status,version,updated_at,approved_at FROM articles ${role === 'rui' ? '' : 'WHERE owner=?'} ORDER BY updated_at DESC`;
    const r = await DB.prepare(q).bind(...(role === 'rui' ? [] : [role])).all();
    return json(r.results);
  }
  mm = path.match(/^articles\/([^/]+)$/);
  if (mm && m === 'GET') {
    const a = await DB.prepare('SELECT * FROM articles WHERE id=?').bind(decodeURIComponent(mm[1])).first<any>();
    if (!a || (role !== 'rui' && a.owner !== role)) return bad('não encontrado', 404);
    return json({ ...a, facts: JSON.parse(a.facts || '[]'), corrections: a.corrections ? JSON.parse(a.corrections) : null });
  }
  mm = path.match(/^articles\/([^/]+)\/decide$/);
  if (mm && m === 'POST') {
    const id = decodeURIComponent(mm[1]);
    const a = await DB.prepare('SELECT * FROM articles WHERE id=?').bind(id).first<any>();
    if (!a || a.owner !== role) return bad('não encontrado', 404);
    const b = await body(request);
    if (b.action === 'undo') {
      if (!['final', 'fixing', 'rewriting'].includes(a.status)) return bad('nada para desfazer', 409);
      await DB.prepare(`UPDATE articles SET status='review',approved_at=NULL,corrections=NULL,updated_at=? WHERE id=?`).bind(now(), id).run();
      await log(env, role, 'undo_article', id); return json({ ok: true });
    }
    if (a.status !== 'review') return bad('o artigo não está em revisão', 409);
    if (b.action === 'approve') {
      await DB.prepare(`UPDATE articles SET status='final',approved_at=?,updated_at=? WHERE id=?`).bind(now(), now(), id).run();
    } else if (b.action === 'fix' || b.action === 'reject') {
      const corr = JSON.stringify({ fixes: b.fixes || {}, edited_html: b.edited_html || null, note: b.note || '' });
      await DB.prepare(`UPDATE articles SET status=?,corrections=?,updated_at=? WHERE id=?`).bind(b.action === 'fix' ? 'fixing' : 'rewriting', corr, now(), id).run();
      for (const [i, t] of Object.entries(b.fixes || {})) await log(env, role, 'fixes', id, `Facto ${Number(i) + 1}: ${t}`);
    } else return bad('ação inválida');
    await log(env, role, b.action, id); return json({ ok: true });
  }
  // ---------- Rui ----------
  if (path === 'admin/export' && role === 'rui') {
    const st = url.searchParams.get('status') || 'final';
    const r = await DB.prepare('SELECT * FROM articles WHERE status=? ORDER BY approved_at').bind(st).all<any>();
    return json(r.results.map((a) => ({ ...a, facts: JSON.parse(a.facts || '[]') })));
  }
  mm = path.match(/^admin\/published\/([^/]+)$/);
  if (mm && m === 'POST' && role === 'rui') {
    await DB.prepare(`UPDATE articles SET status='published',updated_at=? WHERE id=? AND status='final'`).bind(now(), decodeURIComponent(mm[1])).run();
    await log(env, role, 'published', mm[1]); return json({ ok: true });
  }
  return bad('not found', 404);
};
