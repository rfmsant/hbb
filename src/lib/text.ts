import { SAMPLE } from '../data/ph';
/** Plain text for machines (schema, llms.txt): resolves [label|sample] to the sample in preview, else keeps [label]. */
export const plain = (t: string) => t.replace(/\[([^\]|]+)(?:\|([^\]]*))?\]/g, (_m, l: string, s?: string) => (SAMPLE && s !== undefined ? s : `[${l}]`));
/** True when the text still has an unconfirmed placeholder (after resolving samples). */
export const unresolved = (t: string) => /\[[^\]]+\]/.test(plain(t));
/** Use a value in structured data only when it is confirmed (or sampled in preview). */
export const ok = (t: string) => (unresolved(t) ? undefined : plain(t));
