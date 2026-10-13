'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Erreur({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Point de branchement pour Sentry ; la console suffit tant qu'il n'est pas installé.
    console.error('Erreur applicative Noêma', error);
  }, [error]);

  return (
    <div className="wrap">
      <div className="empty">
        <p className="big">500</p>
        <h1 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: 14 }}>Quelque chose a lâché de notre côté</h1>
        <p>
          Ce n’est pas votre faute. Réessayez : la plupart de ces erreurs sont passagères. Si elle persiste, écrivez-nous
          en mentionnant ce qui s’est passé.
        </p>
        {error.digest && (
          <p className="note" style={{ fontFamily: 'var(--mono)', marginBottom: 22 }}>
            référence : {error.digest}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="cta" onClick={reset} type="button" style={{ border: 'none', cursor: 'pointer' }}>
            Réessayer
          </button>
          <Link className="cta ghost" href="/contact">
            Nous écrire
          </Link>
        </div>
      </div>
    </div>
  );
}
