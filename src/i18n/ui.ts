import type { Locale } from './config';

// Interface text in both languages. Copy follows the Bar's advertising rules (EOA art. 94):
// objective information only, no fees, no figures, no comparisons, no promises.
export const ui = {
  en: {
    nav: [['/for-companies/', 'For companies'], ['/moving-to-portugal/', 'Moving to Portugal'], ['/areas/', 'Practice areas'], ['/team/', 'Team'], ['/insights/', 'Insights']] as [string, string][],
    cta: 'Book an initial meeting',
    menu: 'Menu',
    skip: 'Skip to content',
    langSwitch: 'Português',
    tagline: 'Law firm in Lisbon',
    footerLinks: [['/privacy/', 'Privacy'], ['/cookies/', 'Cookies'], ['/terms/', 'Legal notice']] as [string, string][],
    cookieSettings: 'Cookie settings',
    complaints: 'Complaints book',
    consentText: 'We use analytics cookies to understand which pages are useful and where the booking form can be simpler. Nothing is shared for advertising without your consent.',
    consentAll: 'Accept analytics',
    consentNone: 'Only necessary',
    consentPolicy: 'Cookie policy',
    preview: 'Preview · not final',
    areasEyebrow: 'Practice areas',
    seeArea: 'See the area',
    home: 'Home',
  },
  pt: {
    nav: [['/for-companies/', 'Empresas'], ['/moving-to-portugal/', 'Mudar-se para Portugal'], ['/areas/', 'Áreas'], ['/team/', 'Equipa'], ['/insights/', 'Artigos']] as [string, string][],
    cta: 'Marcar primeira reunião',
    menu: 'Menu',
    skip: 'Saltar para o conteúdo',
    langSwitch: 'English',
    tagline: 'Sociedade de advogados em Lisboa',
    footerLinks: [['/privacy/', 'Privacidade'], ['/cookies/', 'Cookies'], ['/terms/', 'Aviso legal']] as [string, string][],
    cookieSettings: 'Definições de cookies',
    complaints: 'Livro de Reclamações',
    consentText: 'Usamos cookies de análise para perceber que páginas são úteis e onde o formulário de marcação pode ser mais simples. Nada é partilhado para publicidade sem o seu consentimento.',
    consentAll: 'Aceitar análise',
    consentNone: 'Só os necessários',
    consentPolicy: 'Política de cookies',
    preview: 'Pré-visualização · versão não final',
    areasEyebrow: 'Áreas de prática',
    seeArea: 'Ver a área',
    home: 'Início',
  },
} satisfies Record<Locale, unknown>;

export type T = { en: string; pt: string };
export type TL = { en: string[]; pt: string[] };
