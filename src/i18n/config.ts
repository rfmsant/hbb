// Languages. English is the default (no prefix). Others live under /pt/, /pt-br/, /fr/, /es/.
// Add a code to `live` only when that language's pages are translated and reviewed by a native speaker.
export const locales = {
  en: { label: 'English', html: 'en', prefix: '' },
  pt: { label: 'Português', html: 'pt-PT', prefix: 'pt' },
  'pt-br': { label: 'Português (Brasil)', html: 'pt-BR', prefix: 'pt-br' },
  fr: { label: 'Français', html: 'fr', prefix: 'fr' },
  es: { label: 'Español', html: 'es', prefix: 'es' },
} as const;
export type Locale = keyof typeof locales;
export const live: Locale[] = ['en'];
export const planned: Locale[] = ['en', 'pt', 'pt-br', 'fr', 'es'];

/** Path of the same page in another language. `path` is the English path, e.g. "/services/d7-visa/". */
export const localePath = (l: Locale, path: string) => (locales[l].prefix ? `/${locales[l].prefix}${path}` : path);
