# HBB website

Astro static site, hosted on Cloudflare Pages. Blog edited through Decap CMS at /admin.

## Run locally
    npm install
    npm run dev        # http://localhost:4321

## Deploy (Cloudflare Pages)
1. Push this folder to a private GitHub repository.
2. Cloudflare > Workers & Pages > Create > Pages > connect the repo.
3. Build command: `npm run build` · Output folder: `dist`.
4. Environment variables: `ZOHO_FLOW_WEBHOOK`, `ALLOWED_ORIGIN`.
5. Add the custom domain.

## Before launch: things to fill in
- `src/data/site.ts`: legal name, Bar number, NIPC, address, phone, email, strategy session price, GA4 id, Clarity id.
- `src/data/team.ts`: each lawyer's Bookings URL (the booking flow embeds it).
- `src/data/services.ts`: every value in [square brackets]. They show highlighted in yellow on the site until replaced.
- `astro.config.mjs` and `public/robots.txt`: the real domain.
- `public/admin/config.yml`: the GitHub repository name.
- Privacy, cookies and terms pages: full text from the partners.
- Photos: commissioned portraits and office photography (no stock).

## Analytics (GA4 events)
booking_start · question_answered (question_number 1–6) · call_type_selected · details_submitted · booking_completed · cta_click.
In GA4, build a funnel exploration with these steps to see where people drop off. Any step losing more than 10–15% gets cut or simplified.
Analytics only loads after cookie consent (Consent Mode v2).

## Preview mode (sample content)
The GitHub Pages preview builds with PUBLIC_SAMPLE=1: stock photos from Unsplash and sample figures replace the placeholders, with a thin "Preview" bar on top.
Placeholders are written as [label|sample] in the source. Without PUBLIC_SAMPLE they show highlighted in yellow, so nothing unconfirmed can go live unnoticed.
Remove PUBLIC_SAMPLE from the workflow (and replace every [label|sample]) before the real launch.

## AI visibility (ChatGPT, Perplexity, Gemini, Claude, Google AI answers)
- /llms.txt and /llms-full.txt are generated from the site data at every build.
- /robots.txt is generated: preview blocks everything; production allows search engines and AI assistants by name.
- Structured data (schema.org): the firm (LegalService) with each lawyer, Service + FAQ + breadcrumbs on service pages, Article with author and dates on Insights.
- Every article shows "Last checked" (frontmatter `updated`). Update it whenever a lawyer re-checks the article.
- GA4 records an `ai_referral` event (ai_source = ChatGPT, Perplexity…) for visits that come from AI tools. In GA4 also create a custom channel group "AI assistants" with source matching: chatgpt|openai|perplexity|claude|gemini|copilot|mistral|deepseek.
- At launch: submit the sitemap to Google Search Console and Bing Webmaster Tools (ChatGPT search relies on Bing).

## Languages
English first, then Português (PT), Português (Brasil), Français, Español. See src/i18n/config.ts.
Translated pages go under /pt/, /pt-br/, /fr/, /es/ with the same slugs. Add the code to `live` only after a native speaker (ideally a lawyer) has reviewed it; hreflang tags and llms.txt pick it up automatically.
