import { defineCollection, z } from 'astro:content';
const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Residency', 'Tax', 'Property', 'Business', 'Succession', 'Living']),
    author: z.string(),
    reviewedBy: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});
export const collections = { insights };
