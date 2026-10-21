// Bios, years, languages and Bar numbers to be supplied by each lawyer.
// bookingUrl: the lawyer's Microsoft Bookings (or Zoho Bookings) page. The booking flow sends clients there.
export type Lawyer = { slug: string; name: string; role: string; areas: string[]; bookingUrl: string };

export const team: Lawyer[] = [
  { slug: 'florbela-lopes', name: 'Florbela Lopes', role: 'Founding Partner · Immigration & Residence', areas: ['Golden Visa', 'D7', 'D8', 'Family reunification'], bookingUrl: '' },
  { slug: 'leandro-nogueira', name: 'Leandro Nogueira', role: 'Immigration, Nationality & Real Estate', areas: ['Citizenship', 'Property'], bookingUrl: '' },
  { slug: 'diogo-pedro', name: 'Diogo Pedro', role: 'Tax & Corporate', areas: ['Tax', 'D2', 'Companies'], bookingUrl: '' },
  { slug: 'margarida-tempera', name: 'Margarida Tempera', role: 'Litigation, Business & Corporate', areas: ['Business', 'Disputes'], bookingUrl: '' },
];

export const bySlug = (s: string) => team.find((l) => l.slug === s)!;
