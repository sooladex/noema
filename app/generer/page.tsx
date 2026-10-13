import type { Metadata } from 'next';
import Generateur from '@/components/Generateur';
import { LIMITE } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Générer un cours à partir d’un texte',
  description:
    'Collez votre texte, choisissez le niveau, obtenez un cours détaillé, des fiches de révision et un résumé. Sans inscription, export Markdown et PDF.',
  alternates: { canonical: '/generer' },
  openGraph: {
    title: 'Générer un cours à partir d’un texte — Noêma',
    description: 'Un texte entre, un cours complet sort. Sans inscription.',
    url: '/generer',
  },
};

export default function PageGenerer() {
  const mode: 'service' | 'byok' = process.env.GEMINI_API_KEY ? 'service' : 'byok';

  return (
    <div className="wrap">
      <section className="hero" style={{ paddingBottom: 6 }}>
        <h1>Générer un cours</h1>
        <p className="lede">
          Collez le texte à enseigner. Noêma en extrait les notions et rédige le cours, les fiches et le résumé.
        </p>
      </section>
      <Generateur mode={mode} limite={LIMITE} />
    </div>
  );
}
