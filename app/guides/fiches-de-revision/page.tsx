import type { Metadata } from 'next';
import Link from 'next/link';
import { url } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Faire des fiches de révision vraiment utiles : la méthode',
  description:
    'Pourquoi la plupart des fiches ne servent à rien, et comment en écrire qui font réellement mémoriser. Méthode en 5 règles, avec exemples.',
  alternates: { canonical: '/guides/fiches-de-revision' },
  openGraph: { type: 'article', url: '/guides/fiches-de-revision' },
};

const ld = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Faire des fiches de révision vraiment utiles : la méthode',
  description:
    'Pourquoi la plupart des fiches ne servent à rien, et comment en écrire qui font réellement mémoriser.',
  inLanguage: 'fr-FR',
  mainEntityOfPage: url('/guides/fiches-de-revision'),
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
        <h1>Faire des fiches de révision vraiment utiles</h1>
        <p className="lede" style={{ marginBottom: 30 }}>
          Recopier son cours en plus petit n’est pas faire une fiche. C’est l’erreur qui coûte le plus d’heures aux
          étudiants, et elle vient d’un malentendu sur ce qu’une fiche est censée faire.
        </p>

        <h2>Le malentendu de départ</h2>
        <p>
          Une fiche n’est pas un condensé du cours. C’est un <strong>déclencheur de rappel</strong>. Sa qualité ne se
          mesure pas à ce qu’elle contient, mais à ce qu’elle vous force à retrouver de tête. Une fiche qui contient
          tout ne vous fait rien retrouver : vous la relisez, tout vous paraît familier, et cette familiarité se
          confond avec la maîtrise. Le jour de l’épreuve, la page blanche corrige l’illusion.
        </p>
        <p>
          Les travaux sur l’apprentissage convergent sur ce point depuis des décennies : se tester est nettement plus
          efficace que relire, à temps de travail égal. Toute la méthode qui suit découle de là.
        </p>

        <h2>Règle 1 — une notion par fiche, pas un chapitre</h2>
        <p>
          Si une fiche couvre trois concepts, vous ne saurez jamais lequel des trois vous bloque. Découpez jusqu’à ce
          que chaque fiche porte un nom que vous pourriez écrire en titre d’une question d’examen : « l’encapsulation »,
          « la troisième forme normale », « le théorème des valeurs intermédiaires ».
        </p>

        <h2>Règle 2 — commencer par la phrase-noyau</h2>
        <p>
          En haut de la fiche, une seule phrase qui dit l’essentiel de la notion sans jargon. Si vous n’arrivez pas à
          l’écrire, vous n’avez pas compris — et c’est une information précieuse, obtenue en trente secondes plutôt
          qu’en trois heures de relecture.
        </p>
        <p>
          Exemple : « L’encapsulation cache l’état d’un objet pour qu’on puisse changer son intérieur sans casser le
          reste du programme. » Tout le reste de la fiche développe cette phrase.
        </p>

        <h2>Règle 3 — écrire les points clés en questions, pas en affirmations</h2>
        <p>
          Au lieu de « la clé étrangère garantit l’intégrité référentielle », écrivez « qu’est-ce qui empêche une ligne
          de pointer vers un enregistrement inexistant ? ». La version affirmative se relit passivement ; la version
          interrogative vous oblige à produire la réponse. C’est la différence entre reconnaître et savoir.
        </p>

        <h2>Règle 4 — ajouter l’erreur typique</h2>
        <p>
          Sur chaque fiche, notez la confusion classique associée à la notion. « Confondre surcharge et
          redéfinition. » « Croire qu’un getter public encapsule. » Les examens sont construits sur ces pièges, et une
          notion n’est réellement acquise que lorsque vous savez ce qu’elle <em>n’est pas</em>.
        </p>

        <h2>Règle 5 — une analogie de votre cru</h2>
        <p>
          Une image concrète ancre un concept abstrait bien mieux qu’une définition supplémentaire. Elle n’a pas besoin
          d’être élégante, seulement d’être à vous. Une analogie empruntée s’oublie ; une analogie fabriquée par vous
          reste, parce que la fabriquer était déjà un acte de compréhension.
        </p>

        <h2>Comment les utiliser ensuite</h2>
        <p>
          Cachez tout sauf le titre. Récitez à voix haute ce que vous savez. Puis découvrez et comparez. Ce qui est
          tombé juste, vous ne le revoyez pas avant plusieurs jours ; ce qui a manqué revient dès le lendemain. C’est la
          répétition espacée, et elle transforme un volume de révision en mémoire durable.
        </p>
        <p>
          Le piège inverse existe aussi : passer plus de temps à fabriquer de belles fiches qu’à s’en servir. Une fiche
          moche et utilisée bat une fiche parfaite et contemplée.
        </p>

        <h2>Gagner les heures de fabrication</h2>
        <p>
          Reste le coût : écrire des fiches correctes prend du temps, et ce temps est pris sur la révision elle-même.
          C’est précisément ce que Noêma fait à votre place — vous collez le chapitre, et vous récupérez une fiche par
          notion, structurée selon les règles ci-dessus : phrase-noyau, points clés, vocabulaire, astuce de
          mémorisation. Vous gardez le travail qui compte, celui de vous tester.
        </p>
        <p>
          <Link className="cta" href="/generer">
            Générer mes fiches
          </Link>
        </p>

        <h2>À lire ensuite</h2>
        <ul>
          <li>
            <Link href="/guides/reviser-plus-vite">Réviser plus vite sans réviser moins bien</Link>
          </li>
          <li>
            <Link href="/guides/resumer-un-cours">Résumer un cours sans perdre ce qui compte</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
