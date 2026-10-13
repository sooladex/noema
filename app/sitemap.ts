import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

const PAGES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, freq: 'weekly' },
  { path: '/generer', priority: 0.9, freq: 'monthly' },
  { path: '/guides/reviser-plus-vite', priority: 0.8, freq: 'monthly' },
  { path: '/guides/fiches-de-revision', priority: 0.8, freq: 'monthly' },
  { path: '/guides/resumer-un-cours', priority: 0.8, freq: 'monthly' },
  { path: '/contact', priority: 0.4, freq: 'yearly' },
  { path: '/confidentialite', priority: 0.3, freq: 'yearly' },
  { path: '/cgu', priority: 0.3, freq: 'yearly' },
  { path: '/mentions-legales', priority: 0.3, freq: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((p) => ({
    url: `${SITE.domain}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
