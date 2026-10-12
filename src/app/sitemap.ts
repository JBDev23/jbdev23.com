import { MetadataRoute } from 'next';
import { PROJECTS } from '@/constants/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.jbdev23.com';

  const routePairs: Array<{
    es: string;
    en: string;
    changeFrequency: 'monthly' | 'yearly';
    priority: number;
  }> = [
    {
      es: '/es',
      en: '/en',
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      es: '/es/proyectos',
      en: '/en/work',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      es: '/es/aviso-legal',
      en: '/en/legal-notice',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      es: '/es/politica-cookies',
      en: '/en/cookie-policy',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      es: '/es/politica-privacidad',
      en: '/en/privacy-policy',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic project routes
  PROJECTS.forEach((project) => {
    routePairs.push({
      es: `/es/proyectos/${project.slug}`,
      en: `/en/work/${project.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const now = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routePairs.forEach((route) => {
    const alternates = {
      languages: {
        es: `${baseUrl}${route.es}`,
        en: `${baseUrl}${route.en}`,
        'x-default': `${baseUrl}${route.es}`,
      },
    };

    // Spanish entry
    sitemapEntries.push({
      url: `${baseUrl}${route.es}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    });

    // English entry
    sitemapEntries.push({
      url: `${baseUrl}${route.en}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    });
  });

  return sitemapEntries;
}
