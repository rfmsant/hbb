-- HBB Revisão: base de dados (Cloudflare D1)
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,            -- ID do backlog (ex.: 95, N1, S3)
  area TEXT NOT NULL,             -- IM, CT, LB, CM, IB, RG, FORA
  audience TEXT,                  -- Empresas / Pessoas que se mudam / Ambos
  title TEXT NOT NULL,            -- título de referência (PT quando existe)
  question TEXT,                  -- pergunta real, se houver
  answers TEXT,                   -- o que o artigo responde, se houver
  origin TEXT,                    -- 1.º lote, Empresas P1, sugestão...
  competitors TEXT,               -- quem já trata o tema
  note TEXT,                      -- nota de âmbito (REVER/FORA)
  priority INTEGER NOT NULL,      -- menor = primeiro
  released INTEGER NOT NULL DEFAULT 0,   -- 1 = visível no swipe
  decision TEXT,                  -- sim | nao | mas | NULL
  decision_note TEXT,
  decided_by TEXT,                -- a1 | a2
  decided_at TEXT,
  suggested_by TEXT,              -- a1 | a2 se foi sugestão
  why TEXT, link TEXT
);
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,            -- slug PT
  topic_id TEXT,
  area TEXT NOT NULL,
  audience TEXT,
  owner TEXT NOT NULL,            -- a1 | a2 (quem revê)
  title TEXT NOT NULL,
  description TEXT,
  body_html TEXT NOT NULL,        -- corpo com <span class="fx" data-f="i">
  facts TEXT NOT NULL,            -- JSON [{t,src,url,flag}]
  review_note TEXT,               -- nota de revisão (markdown)
  status TEXT NOT NULL DEFAULT 'review',  -- review | fixing | rewriting | final | published
  version INTEGER NOT NULL DEFAULT 1,
  corrections TEXT,               -- JSON {fixes:{i:texto}, edited_html, note}
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  approved_at TEXT
);
CREATE TABLE IF NOT EXISTS events (
  at TEXT NOT NULL, who TEXT, kind TEXT, ref TEXT, detail TEXT
);
