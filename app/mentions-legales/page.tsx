import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Éditeur, hébergeur et informations légales du site Noêma.',
  alternates: { canonical: '/mentions-legales' },
};

export default function MentionsLegales() {
  return (
    <div className="wrap">
      <article className="prose" style={{ paddingTop: 64 }}>
        <h1>Mentions légales</h1>
        <p className="updated">Dernière mise à jour : 18 septembre 2026</p>

        <h2>Éditeur du site</h2>
        <p>
          Noêma est édité par El Asri Adil, éditeur individuel.
          <br />
          Contact : <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>
          <br />
          Adresse postale : communiquée sur demande écrite à l’adresse de contact ci-dessus.
        </p>
        <p>
          Directeur de la publication : El Asri Adil.
        </p>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
          .
        </p>

        <h2>Traitement des contenus</h2>
        <p>
          La génération des cours s’appuie sur l’API Gemini de Google LLC. Les textes soumis sont transmis à ce
          prestataire pour le seul temps du traitement. Voir la{' '}
          <a href="/confidentialite">politique de confidentialité</a>.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          La structure du site, son design et son code sont la propriété de l’éditeur. Les cours générés à partir de vos
          textes vous appartiennent : l’éditeur n’en revendique aucun droit.
        </p>

        <h2>Signalement</h2>
        <p>
          Pour signaler un contenu problématique ou une atteinte à un droit, écrivez à{' '}
          <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a> en précisant l’URL concernée et la nature du problème.
        </p>
      </article>
    </div>
  );
}
