// [label] = still to be supplied by the lawyers, shown highlighted.
// [label|sample] = same, but with a sample value shown instead when PUBLIC_SAMPLE=1 (preview builds).
export const SAMPLE = import.meta.env.PUBLIC_SAMPLE === '1';
export const ph = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/\[([^\]|]+)(?:\|([^\]]*))?\]/g, (_m, label: string, sample?: string) =>
     SAMPLE && sample !== undefined ? sample : `<span class="ph">[${label}]</span>`);
/** Unsplash stock photo URL (preview only). */
export const stock = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
