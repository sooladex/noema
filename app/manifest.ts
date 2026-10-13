import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Noêma — générateur de cours',
    short_name: 'Noêma',
    description:
      'Transforme un texte en cours détaillé, fiches de révision et résumé.',
    start_url: '/generer',
    display: 'standalone',
    background_color: '#06070d',
    theme_color: '#06070d',
    lang: 'fr',
    categories: ['education', 'productivity'],
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
