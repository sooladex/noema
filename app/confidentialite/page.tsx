import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Ce que Noêma fait de vos textes : rien n’est conservé, aucun compte, aucun cookie de suivi. Détail des traitements et de vos droits.',
  alternates: { canonical: '/confidentialite' },
};

export default function Confidentialite() {
  return (
    <div className="wrap">
      <article className="prose" style={{ paddingTop: 64 }}>
        <h1>Politique de confidentialité</h1>
        <p className="updated">Dernière mise à jour : 18 septembre 2026</p>

        <p>
          Cette page décrit, sans détour, ce qui arrive aux données qui passent par Noêma. Le principe directeur est
          simple : le service n’a pas besoin de vous connaître pour fonctionner, donc il ne cherche pas à vous
          connaître.
        </p>

        <h2>Ce que nous ne collectons pas</h2>
        <ul>
          <li>Aucun compte, donc aucun nom, aucune adresse e-mail, aucun mot de passe.</li>
          <li>Aucun cookie de suivi, aucun traceur publicitaire, aucun profilage.</li>
          <li>Aucune revente ni partage de données à des fins commerciales — il n’y a rien à vendre.</li>
        </ul>

        <h2>Le texte que vous collez</h2>
        <p>
          Votre texte est transmis à notre serveur, qui l’envoie immédiatement au modèle de langage chargé de rédiger le
          cours, puis renvoie le résultat à votre navigateur. Le texte n’est écrit dans aucune base de données et
          n’est pas conservé après la réponse. Le cours produit n’existe que dans la mémoire de votre navigateur : il
          disparaît quand vous fermez l’onglet, sauf si vous l’exportez vous-même.
        </p>
        <p>
          Conséquence importante : nous ne pouvons pas retrouver un cours que vous auriez perdu. Exportez ce que vous
          voulez garder.
        </p>

        <h2>Sous-traitant : Google</h2>
        <p>
          La rédaction du cours est effectuée par l’API Gemini de Google. Votre texte lui est donc transmis pour être
          traité. L’usage que Google fait des données reçues via son API est régi par ses propres conditions, que nous
          ne contrôlons pas. Si votre texte contient des informations confidentielles ou personnelles, ne le collez
          pas : traitez-le comme vous traiteriez un envoi à un service tiers.
        </p>

        <h2>Données techniques</h2>
        <p>
          Notre hébergeur enregistre, comme tout serveur web, les journaux d’accès techniques : adresse IP, date, page
          demandée, type de navigateur. Ces journaux servent à la sécurité et au diagnostic de panne, et sont conservés
          de façon temporaire par l’hébergeur.
        </p>
        <p>
          Votre adresse IP est également utilisée, sous forme de compteur en mémoire, pour limiter le nombre de
          générations gratuites par jour. Ce compteur n’est associé à aucune autre donnée et s’efface tout seul à
          l’expiration de la fenêtre.
        </p>

        <h2>Clé API personnelle</h2>
        <p>
          Lorsque le service fonctionne en mode « votre propre clé », la clé que vous saisissez reste dans la mémoire de
          la page, n’est jamais enregistrée sur nos serveurs ni dans votre navigateur, et disparaît à la fermeture de
          l’onglet.
        </p>

        <h2>Vos droits</h2>
        <p>
          Le règlement général sur la protection des données vous donne un droit d’accès, de rectification,
          d’effacement, de limitation et d’opposition sur vos données personnelles. En pratique, comme nous ne
          conservons ni compte ni texte, il n’y a le plus souvent rien à effacer. Pour toute question, écrivez à{' '}
          <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
        </p>

        <h2>Modifications</h2>
        <p>
          Cette politique peut évoluer, notamment si de nouvelles fonctionnalités nécessitent de nouveaux traitements.
          La date de mise à jour en haut de page fait foi.
        </p>

        <p style={{ marginTop: 34 }}>
          Voir aussi : <Link href="/cgu">conditions d’utilisation</Link> ·{' '}
          <Link href="/mentions-legales">mentions légales</Link>
        </p>
      </article>
    </div>
  );
}
