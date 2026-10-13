import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Conditions générales d’utilisation',
  description:
    'Les règles d’usage de Noêma : ce que le service garantit, ce qu’il ne garantit pas, vos droits sur les cours produits.',
  alternates: { canonical: '/cgu' },
};

export default function Cgu() {
  return (
    <div className="wrap">
      <article className="prose" style={{ paddingTop: 64 }}>
        <h1>Conditions générales d’utilisation</h1>
        <p className="updated">Dernière mise à jour : 18 septembre 2026</p>

        <h2>1. Objet</h2>
        <p>
          Noêma est un service en ligne qui produit, à partir d’un texte fourni par l’utilisateur, un cours structuré,
          des fiches de révision et un résumé. Utiliser le service vaut acceptation des présentes conditions.
        </p>

        <h2>2. Accès</h2>
        <p>
          Le service est accessible gratuitement, sans création de compte, dans la limite d’un quota quotidien de
          générations destiné à préserver la disponibilité pour tous. Ce quota peut être ajusté sans préavis.
        </p>

        <h2>3. Ce que vous pouvez faire des cours produits</h2>
        <p>
          Les cours générés vous appartiennent. Vous pouvez les lire, les modifier, les imprimer, les diffuser et les
          utiliser dans un cadre pédagogique ou professionnel, sans redevance. Nous ne revendiquons aucun droit dessus.
        </p>

        <h2>4. Ce que vous vous engagez à ne pas faire</h2>
        <ul>
          <li>Soumettre des contenus illicites, haineux, ou portant atteinte aux droits d’autrui.</li>
          <li>Soumettre des données personnelles de tiers ou des informations confidentielles.</li>
          <li>
            Automatiser des requêtes en masse, contourner le quota, ou tenter de dégrader la disponibilité du service.
          </li>
          <li>Présenter un cours généré comme une production humaine dans un contexte où cela constituerait une fraude.</li>
        </ul>

        <h2>5. Limites du service — à lire</h2>
        <p>
          Les cours sont rédigés par un modèle de langage. Cela implique qu’ils <strong>peuvent contenir des erreurs</strong>,
          des approximations ou des affirmations fausses énoncées avec assurance. Noêma est un outil de compréhension et
          de révision, pas une source d’autorité. Vérifiez toute information critique auprès de vos supports de cours,
          de vos enseignants ou de sources de référence — en particulier avant un examen, une publication, ou toute
          décision qui en dépend.
        </p>
        <p>
          Le service ne constitue ni un conseil juridique, ni un conseil médical, ni un conseil financier, quelle que
          soit la matière du texte soumis.
        </p>

        <h2>6. Disponibilité</h2>
        <p>
          Le service est fourni « en l’état », sans garantie de disponibilité continue. Il dépend de prestataires tiers
          (hébergement, fournisseur de modèle de langage) dont les interruptions nous échappent. Nous pouvons le
          suspendre ou le modifier à tout moment.
        </p>

        <h2>7. Responsabilité</h2>
        <p>
          Dans les limites permises par la loi, notre responsabilité ne saurait être engagée au titre des conséquences
          de l’usage des contenus générés, ni d’une indisponibilité du service. L’utilisateur reste responsable des
          textes qu’il soumet et de l’usage qu’il fait des résultats.
        </p>

        <h2>8. Droit applicable</h2>
        <p>
          Les présentes conditions sont soumises au droit marocain. Tout litige relève des juridictions compétentes du
          lieu du siège de l’éditeur, à défaut de résolution amiable.
        </p>

        <h2>9. Contact</h2>
        <p>
          Pour toute question : <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
        </p>

        <p style={{ marginTop: 34 }}>
          Voir aussi : <Link href="/confidentialite">politique de confidentialité</Link> ·{' '}
          <Link href="/mentions-legales">mentions légales</Link>
        </p>
      </article>
    </div>
  );
}
