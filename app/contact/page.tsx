import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Une question, un bug, une suggestion sur Noêma ? Voici comment nous joindre.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <div className="wrap">
      <article className="prose" style={{ paddingTop: 64 }}>
        <h1>Contact</h1>
        <p>
          Noêma est un petit projet, tenu par une personne. Les messages sont lus, et les retours utiles finissent
          souvent en modification du produit.
        </p>

        <h2>Écrire</h2>
        <p>
          <a href={`mailto:${SITE.contact}`} className="cta" style={{ textDecoration: 'none' }}>
            {SITE.contact}
          </a>
        </p>

        <h2>Ce qui aide vraiment dans un signalement de bug</h2>
        <ul>
          <li>Ce que vous faisiez au moment du problème, étape par étape.</li>
          <li>Le message d’erreur exact, ou la référence affichée sur la page d’erreur.</li>
          <li>Votre navigateur et si vous étiez sur mobile ou sur ordinateur.</li>
          <li>Le type de texte soumis — inutile de l’envoyer en entier, sa nature et sa longueur suffisent.</li>
        </ul>

        <h2>Délai</h2>
        <p>
          Comptez quelques jours. Il n’y a pas d’équipe support derrière l’adresse, seulement une personne qui répond
          quand elle le peut.
        </p>
      </article>
    </div>
  );
}
