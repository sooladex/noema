import type { Metadata, Viewport } from 'next';
import './globals.css';
import Background from '@/components/Background';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE, url } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'Noêma — transformer un texte en cours détaillé',
    template: '%s · Noêma',
  },
  description:
    'Collez un texte : Noêma repère les notions citées et en fait un cours clair, des fiches de révision et un résumé. Sans inscription.',
  applicationName: 'Noêma',
  authors: [{ name: 'Noêma' }],
  generator: 'Next.js',
  keywords: [
    'générateur de cours',
    'fiches de révision',
    'résumé de cours',
    'réviser',
    'comprendre un cours',
    'transformer un texte en cours',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.domain,
    siteName: 'Noêma',
    title: 'Noêma — transformer un texte en cours détaillé',
    description:
      'Collez un texte : Noêma repère les notions citées et en fait un cours clair, des fiches de révision et un résumé.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noêma — transformer un texte en cours détaillé',
    description: 'Un texte entre, un cours complet sort : définitions, explications, analogies, exemples, fiches, résumé.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'education',
};

export const viewport: Viewport = {
  themeColor: '#06070d',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': url('/#organization'),
      name: 'Noêma',
      url: SITE.domain,
      email: SITE.contact,
      description: 'Outil en ligne qui transforme un texte en cours détaillé, fiches de révision et résumé.',
    },
    {
      '@type': 'WebSite',
      '@id': url('/#website'),
      url: SITE.domain,
      name: 'Noêma',
      inLanguage: 'fr-FR',
      publisher: { '@id': url('/#organization') },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: url('/generer?q={search_term_string}') },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': url('/#app'),
      name: 'Noêma',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: url('/generer'),
      inLanguage: 'fr-FR',
      description:
        'Générateur de cours : à partir d’un texte, produit un cours structuré, des fiches de révision et un résumé.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      publisher: { '@id': url('/#organization') },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        <Background />
        <div className="page">
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
