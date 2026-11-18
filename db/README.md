# HBB Revisão — instalar no Cloudflare

A plataforma das advogadas vive em `/equipa/` e usa a API em `/api/revisao/` (Cloudflare Pages Functions + base de dados D1). No GitHub Pages a página abre, mas mostra "Sem acesso": só funciona no Cloudflare.

## 1. Projeto e base de dados (uma vez)
1. Criar a conta Cloudflare com o email da firma.
2. Workers & Pages → Create → Pages → ligar ao repositório `rfmsant/hbb`. Build command `npm run build`, output `dist`.
3. Storage & Databases → D1 → Create → nome `hbb-revisao`.
4. Na consola da D1, colar e correr `db/schema.sql` e depois `db/seed-topics.sql` (286 temas do backlog, por prioridade).
5. No projeto Pages → Settings → Bindings → D1 database: nome da variável `DB`, base `hbb-revisao`.

## 2. Variáveis (Settings → Variables and secrets)
| Nome | Valor |
|---|---|
| ROLE_A1 | email(s) da advogada 1 (Imigração e Nacionalidade, Comercial) |
| ROLE_A2 | email(s) da advogada 2 (Contratos, Laboral, Real Estate, RGPD e Compliance, Comercial) |
| ROLE_RUI | email do Rui |
| WA_RUI | número de WhatsApp do Rui, formato 351XXXXXXXXX |
| GOAL | 40 |
| TASK_KEY | uma chave longa e aleatória (secret), usada só pela tarefa que escreve os artigos |

Os emails e nomes nunca ficam no código.

## 3. Entrada só para a equipa (Zero Trust → Access → Applications)
1. Aplicação "HBB Revisão": caminhos `/equipa` e `/api/revisao`, política "Allow" para os 3 emails, login por código no email.
2. Aplicação "HBB tarefa": caminho `/api/revisao/task`, política "Bypass" (a proteção é a TASK_KEY).

## 4. Primeiro uso
Cada advogada entra em `/equipa/`, abre "Temas para decidir" e carrega em "Pedir mais temas": aparecem os 10 primeiros das suas áreas.

## 5. Tarefa que escreve os artigos
A tarefa (noturna, ou pedida no chat) usa só dois pedidos, com o cabeçalho `X-Task-Key`:
- `GET /api/revisao/task/queue` → temas escolhidos sem artigo (`write`) e artigos com correções (`fix`).
- `POST /api/revisao/task/article` → `{id (slug PT), topic_id, title, description, body_html, facts:[{t,src,url,flag}], review_note}`. Um id que já existe cria a versão seguinte e volta para revisão.

No `body_html`, cada facto é marcado com `<span class="fx" data-f="0">texto<sup>1</sup></span>` (índice do array `facts`) e cada ponto a confirmar com `<span class="vf">[VERIFICAR]</span>`.

## 6. Publicação
O perfil do Rui descarrega os artigos aprovados em PT (.md com metadados e texto em HTML, ou .zip) para importar na plataforma de publicação, e depois marca-os como publicados.
