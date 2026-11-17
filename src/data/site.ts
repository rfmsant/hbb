// Everything the team still has to confirm lives here. [label|sample]: shown highlighted until confirmed.
export const site = {
  name: 'HBB — Harbor Beyond Borders',
  // Firm name rules: Lei 53/2015, art. 20 ("Advogados" and "SP" before the legal form).
  legalName: '[Denominação legal|HBB – Harbor Beyond Borders, Advogados, SP, Lda]',
  oaNumber: '[—|00/27]',
  nipc: '[—|500 000 000]',
  address: '[Morada|Avenida da Liberdade 110], Lisboa',
  phone: '+351 [—|210 000 000]',
  email: 'geral@[domínio|harborbeyondborders.com]',
  // Google Analytics 4. Nothing loads while it is a placeholder.
  ga4Id: 'G-XXXXXXXXXX',
  // Microsoft Clarity project id (optional). Loads only after analytics consent.
  clarityId: '',
};

// Microsoft Bookings pages, one per calendar. Fill in when the Bookings pages exist.
// cal1: immigration & nationality · cal2: contracts, employment, real estate, GDPR · cal3: shared (corporate, or "not sure")
export const calendars: Record<'cal1' | 'cal2' | 'cal3', string> = { cal1: '', cal2: '', cal3: '' };
