import type { Metadata } from 'next';
import Link from 'next/link';
import { url } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Résumer un cours sans perdre ce qui compte',
  description:
    'Ce qu’un bon résumé garde et ce qu’il jette, la méthode en 4 passes, et pourquoi un résumé ne remplace jamais une explication.',
  alternates: { canonical: '/guides/resumer-un-cours' },
  openGraph: { type: 'article', url: '/guides/resumer-un-cours' },
};

const ld = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Résumer un cours sans perdre ce qui compte',
  description: 'Ce qu’un bon résumé garde et ce qu’il jette, et la méthode en quatre passes.',
  inLanguage: 'fr-FR',
  mainEntityOfPage: url('/guides/resumer-un-cours'),
  publisher: { '@id': url('/#organization') },
  author: { '@id': url('/#organization') },
  datePublished: '2026-09-18',
  dateModified: '2026-09-18',
};

export default function Guide() {
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article className="prose" style={{ paddingTop: 64 }}>
        <h1>Résumer un cours sans perdre ce qui compte</h1>
        <p className="lede" style={{ marginBottom: 30 }}>
          Un mauvais résumé garde les mots et jette le raisonnement. Un bon résumé fait l’inverse : il peut être plus
          court de 90 % et rester suffisant pour reconstruire le cours.
        </p>

        <h2>Ce qu’un résumé doit garder</h2>
        <p>
          Quatre choses, et rien d’autre : <strong>les notions</strong> en jeu, <strong>les relations</strong> entre
          elles, <strong>les raisons</strong> qui justifient chaque notion, et <strong>les frontières</strong> — les cas
          où la règle ne s’applique plus. Le reste — exemples, digressions, reformulations du professeur — est du
          support pédagogique : utile à la première lecture, inutile en révision.
        </p>
        <p>
          Le test est simple. Donnez votre résumé à quelqu’un du même niveau : s’il peut redériver le cours à partir de
          là, le résumé est bon. S’il ne fait que reconnaître des mots déjà vus, il ne sert à rien.
        </p>

        <h2>Ce qu’un résumé doit jeter sans hésiter</h2>
        <ul>
          <li>Les phrases de transition et les annonces de plan.</li>
          <li>Les exemples multiples qui illustrent la même idée : un seul suffit, le plus parlant.</li>
          <li>Les détails chiffrés non structurants, sauf s’ils sont eux-mêmes l’objet du cours.</li>
          <li>Les redites : un cours oral en contient beaucoup, c’est normal à l’oral et nuisible à l’écrit.</li>
        </ul>

        <h2>La méthode en quatre passes</h2>
        <p>
          <strong>Passe 1 — repérer.</strong> Parcourez le cours en ne notant que les noms de notions. Pas de phrases,
          juste une liste. Vous obtenez le squelette, souvent bien plus court que prévu.
        </p>
        <p>
          <strong>Passe 2 — définir.</strong> Pour chaque nom, écrivez une définition en une phrase, de mémoire d’abord,
          en vérifiant ensuite. Ce que vous n’arrivez pas à définir sans regarder est précisément ce qu’il faudra
          retravailler.
        </p>
        <p>
          <strong>Passe 3 — relier.</strong> Tracez les liens : qu’est-ce qui découle de quoi, qu’est-ce qui s’oppose à
          quoi, qu’est-ce qui est un cas particulier de quoi. C’est la passe que presque tout le monde saute, et c’est
          elle qui transforme une liste en compréhension. Un cours dont on connaît les liens ne s’oublie presque plus.
        </p>
        <p>
          <strong>Passe 4 — condenser.</strong> Écrivez le tout en une page maximum, puis en un paragraphe, puis en une
          phrase. Chaque réduction force un arbitrage sur ce qui est vraiment central. La phrase finale est votre
          garde-fou : si vous la retenez, vous pouvez redéployer le reste.
        </p>

        <h2>Le piège du résumé trop tôt</h2>
        <p>
          Résumer un cours qu’on n’a pas compris produit un résumé faux : on condense les mots de surface en gardant les
          formulations qui ont l’air importantes, et en perdant précisément le raisonnement. L’ordre correct est :
          comprendre, puis résumer. Un résumé est une <em>sortie</em> de la compréhension, jamais un raccourci vers
          elle.
        </p>
        <p>
          C’est pour cette raison que Noêma produit d’abord un cours complet et seulement ensuite un résumé : le résumé
          est écrit à partir d’une compréhension déjà déployée, pas à partir du texte brut.
        </p>

        <h2>Résumé, fiche, cours : trois objets différents</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Objet</th>
                <th>Sert à</th>
                <th>Quand l’utiliser</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Le cours</td>
                <td>Comprendre pour la première fois</td>
                <td>Avant tout le reste</td>
              </tr>
              <tr>
                <td>La fiche</td>
                <td>Se tester notion par notion</td>
                <td>Pendant les révisions, en boucle</td>
              </tr>
              <tr>
                <td>Le résumé</td>
                <td>Revoir la structure d’ensemble</td>
                <td>La veille, et juste avant l’épreuve</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginTop: 30 }}>
          <Link className="cta" href="/generer">
            Obtenir les trois d’un coup
          </Link>
        </p>

        <h2>À lire ensuite</h2>
        <ul>
          <li>
            <Link href="/guides/fiches-de-revision">Faire des fiches de révision vraiment utiles</Link>
          </li>
          <li>
            <Link href="/guides/reviser-plus-vite">Réviser plus vite sans réviser moins bien</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
