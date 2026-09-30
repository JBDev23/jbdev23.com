import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jbdev23.com'
  
  const staticPages = [
    '',
    '/aviso-legal',
    '/politica-cookies',
    '/politica-privacidad',
    '/work'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'monthly' : 'yearly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
