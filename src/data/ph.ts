// Escapes text and highlights [placeholders] the lawyers still need to fill in.
export const ph = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
   .replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
