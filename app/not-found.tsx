import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: true },
};

export default function NonTrouve() {
  return (
    <div className="wrap">
      <div className="empty">
        <p className="big">404</p>
        <h1 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: 14 }}>Cette page n’existe pas</h1>
        <p>
          Le lien est peut-être erroné, ou la page a été déplacée. Rien n’est perdu : l’outil est toujours là.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="cta" href="/generer">
            Générer un cours
          </Link>
          <Link className="cta ghost" href="/">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
