import type { MetadataRoute } from 'next';
import { lastContentChange, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: lastContentChange,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
