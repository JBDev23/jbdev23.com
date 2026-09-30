import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  pathnames: {
    '/': {
      es: '/',
      en: '/'
    },
    '/work': {
      es: '/proyectos',
      en: '/work'
    },
    '/work/[slug]': {
      es: '/proyectos/[slug]',
      en: '/work/[slug]'
    },
    '/aviso-legal': {
      es: '/aviso-legal',
      en: '/legal-notice'
    },
    '/politica-cookies': {
      es: '/politica-cookies',
      en: '/cookie-policy'
    },
    '/politica-privacidad': {
      es: '/politica-privacidad',
      en: '/privacy-policy'
    }
  }
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
