export const SITE = {
  name: 'Noêma',
  domain: (process.env.NEXT_PUBLIC_SITE_URL || 'https://noema.vercel.app').replace(/\/$/, ''),
  tagline: 'Transformez un texte en cours détaillé',
  contact: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@example.com',
  locale: 'fr_FR',
  lang: 'fr',
} as const;

export const url = (path = '/') => `${SITE.domain}${path.startsWith('/') ? path : `/${path}`}`;
