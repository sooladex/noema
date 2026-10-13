import { Fragment, type ReactNode } from 'react';

/**
 * Rend le balisage inline léger produit par le modèle (**gras**, *italique*, `code`)
 * sans jamais injecter de HTML : chaque fragment devient un nœud React.
 */
export default function Riche({ children }: { children?: string | null }) {
  const texte = children ?? '';
  if (!texte) return null;

  const motif = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  const morceaux = texte.split(motif).filter((m) => m !== '');

  const noeuds: ReactNode[] = morceaux.map((m, i) => {
    if (m.startsWith('**') && m.endsWith('**') && m.length > 4) {
      return <b key={i}>{m.slice(2, -2)}</b>;
    }
    if (m.startsWith('`') && m.endsWith('`') && m.length > 2) {
      return (
        <code key={i} className="inline-code">
          {m.slice(1, -1)}
        </code>
      );
    }
    if (m.startsWith('*') && m.endsWith('*') && m.length > 2) {
      return <i key={i}>{m.slice(1, -1)}</i>;
    }
    return <Fragment key={i}>{m}</Fragment>;
  });

  return <>{noeuds}</>;
}
