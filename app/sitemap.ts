import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_ORIGIN, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_ORIGIN}/toothpaste`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_ORIGIN}/skill`, changeFrequency: 'monthly', priority: 0.9 },
  ];
}
