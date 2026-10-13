import type { Metadata } from 'next';
import Link from 'next/link';
import { url } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Réviser plus vite sans réviser moins bien : 6 leviers',
  description:
    'Les méthodes de révision qui marchent vraiment, celles qui font perdre du temps, et comment organiser une semaine avant un examen.',
  alternates: { canonical: '/guides/reviser-plus-vite' },
  openGraph: { type: 'article', url: '/guides/reviser-plus-vite' },
};

const ld = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Réviser plus vite sans réviser moins bien : 6 leviers',
  description: 'Les méthodes de révision qui marchent vraiment et celles qui font perdre du temps.',
  inLanguage: 'fr-FR',
  mainEntityOfPage: url('/guides/reviser-plus-vite'),
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
        <h1>Réviser plus vite sans réviser moins bien</h1>
        <p className="lede" style={{ marginBottom: 30 }}>
          La plupart des heures de révision sont perdues, non par manque de sérieux, mais parce qu’elles sont investies
          dans des activités qui donnent une sensation de travail sans produire de mémoire.
        </p>

        <h2>1. Arrêter de relire</h2>
        <p>
          La relecture est l’activité de révision la plus répandue et l’une des moins rentables. Elle produit de la
          fluidité — le texte devient facile à parcourir — et le cerveau interprète cette facilité comme de la
          maîtrise. C’est un faux signal. Remplacez chaque relecture par une tentative de restitution : fermez le
          document et écrivez ce que vous savez. Ce qui sort est acquis ; ce qui ne sort pas est le vrai programme de
          la séance.
        </p>

        <h2>2. Espacer plutôt que masser</h2>
        <p>
          Six heures d’un coup la veille valent moins que six fois une heure réparties sur deux semaines. L’oubli
          partiel entre deux séances n’est pas une perte : c’est lui qui rend le rappel coûteux, et donc efficace.
          Concrètement, revoyez une notion à J+1, J+3, J+7, puis juste avant l’épreuve.
        </p>

        <h2>3. Alterner les matières dans une même séance</h2>
        <p>
          Travailler un seul type d’exercice pendant deux heures donne de bons résultats pendant la séance et de
          mauvais une semaine après. Alterner oblige à identifier de quel type de problème il s’agit avant de le
          résoudre — or c’est exactement la compétence demandée en examen, où les exercices ne sont pas annoncés par
          chapitre.
        </p>

        <h2>4. Expliquer à voix haute, sans notes</h2>
        <p>
          Expliquer une notion comme si quelqu’un l’ignorait révèle instantanément les trous. Les phrases toutes faites
          du cours ne passent pas l’épreuve de l’oral improvisé : dès que vous devez relier deux idées avec vos propres
          mots, vous voyez où le lien manque. Cinq minutes d’explication valent une heure de surlignage.
        </p>

        <h2>5. Travailler par notion, pas par page</h2>
        <p>
          « Réviser le chapitre 4 » n’est pas une tâche : on ne sait pas quand elle est finie. « Savoir expliquer la
          normalisation en troisième forme normale » en est une, vérifiable en trente secondes. Découpez votre matière
          en notions nommées, et suivez-les une par une. L’effet secondaire est motivationnel : une liste de notions
          cochées donne une prise sur un volume qui paraissait informe.
        </p>

        <h2>6. Comprendre avant de mémoriser</h2>
        <p>
          Mémoriser ce qu’on ne comprend pas coûte trois à cinq fois plus cher, et s’effondre au premier énoncé
          reformulé. Quand une notion résiste, le réflexe utile n’est pas de la répéter plus fort, mais d’aller chercher
          d’où elle vient : quel problème elle résout, pourquoi quelqu’un a eu besoin de l’inventer. Une notion dont on
          comprend la raison d’être se retient presque sans effort.
        </p>

        <h2>Une semaine type avant un examen</h2>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Jour</th>
                <th>Activité</th>
                <th>Pourquoi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>J-7</td>
                <td>Lister les notions du programme, repérer celles qui résistent</td>
                <td>Transformer un volume en tâches vérifiables</td>
              </tr>
              <tr>
                <td>J-6 à J-4</td>
                <td>Comprendre les notions difficiles, une par séance</td>
                <td>La compréhension conditionne tout le reste</td>
              </tr>
              <tr>
                <td>J-3</td>
                <td>Restitution à blanc, sans notes</td>
                <td>Révéler les trous pendant qu’il est encore temps</td>
              </tr>
              <tr>
                <td>J-2</td>
                <td>Exercices mélangés, tous chapitres confondus</td>
                <td>S’entraîner à reconnaître le type de problème</td>
              </tr>
              <tr>
                <td>J-1</td>
                <td>Fiches uniquement, puis arrêt tôt</td>
                <td>Consolidation ; le sommeil fait une partie du travail</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Là où un outil fait gagner du temps</h2>
        <p>
          Les deux étapes les plus coûteuses sont la première — découper la matière en notions — et celle de la
          compréhension d’un passage obscur. C’est ce que Noêma automatise : vous collez le chapitre, il en sort la
          liste des notions, chacune expliquée avec une analogie et un exemple résolu, plus les fiches. Le temps
          récupéré va là où il compte : à vous tester.
        </p>
        <p>
          <Link className="cta" href="/generer">
            Transformer mon chapitre en cours
          </Link>
        </p>

        <h2>À lire ensuite</h2>
        <ul>
          <li>
            <Link href="/guides/fiches-de-revision">Faire des fiches de révision vraiment utiles</Link>
          </li>
          <li>
            <Link href="/guides/resumer-un-cours">Résumer un cours sans perdre ce qui compte</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
