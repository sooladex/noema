import type { Metadata } from 'next';
import Link from 'next/link';
import Intro from '@/components/Intro';
import { url } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Générateur de cours : un texte devient un cours clair — Noêma',
  description:
    'Collez un cours, un chapitre ou des notes : Noêma en extrait les notions et rédige un cours détaillé, des fiches de révision et un résumé. Gratuit, sans inscription.',
  alternates: { canonical: '/' },
};

const FAQ = [
  {
    q: 'Qu’est-ce que Noêma fait exactement ?',
    r: "Vous collez un texte — un chapitre de cours, des notes de TD, un article technique. Noêma identifie les notions qui y sont citées, puis rédige un cours qui les enseigne : pour chaque notion, une définition, la raison d'être du concept, une explication progressive, une analogie du quotidien, un exemple résolu étape par étape, les erreurs fréquentes et les points à retenir. Vous recevez aussi une fiche de révision par notion et un résumé général.",
  },
  {
    q: 'En quoi est-ce différent d’un simple résumé ?',
    r: "Un résumé raccourcit un texte : il suppose que vous avez déjà compris. Noêma fait l'inverse — il rallonge là où c'est nécessaire pour rendre une notion compréhensible à quelqu'un qui la découvre, et ne condense que dans l'onglet résumé. C'est la différence entre « voici l'essentiel » et « voici pourquoi ça marche comme ça ».",
  },
  {
    q: 'Faut-il créer un compte ?',
    r: 'Non. Aucun compte, aucun mot de passe, aucune adresse e-mail demandée. Vous collez un texte et vous générez.',
  },
  {
    q: 'Mes textes sont-ils conservés ?',
    r: "Non. Le texte transite par notre serveur pour être envoyé au modèle de langage qui rédige le cours, puis il est oublié. Aucune base de données ne le stocke, et le cours produit n'existe que dans votre navigateur jusqu'à ce que vous l'exportiez.",
  },
  {
    q: 'Quelles matières sont couvertes ?',
    r: "Toutes celles qui s'expliquent avec des mots : informatique, mathématiques, droit, économie, biologie, histoire, langues. Les notions à formules (maths, physique, algorithmique) sont rendues avec leur expression et sa lecture en clair.",
  },
  {
    q: 'Puis-je exporter le cours ?',
    r: 'Oui : copie en Markdown, téléchargement en fichier .md, ou impression en PDF avec une mise en page pensée pour le papier.',
  },
  {
    q: 'Dans quelles langues ?',
    r: 'Français, anglais, arabe et espagnol. Le texte source peut être dans une langue et le cours produit dans une autre.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': url('/#faq'),
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.r },
  })),
};

export default function Accueil() {
  return (
    <>
      <Intro />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="wrap">
        <section className="hero">
          <p className="kicker">Gratuit · Sans inscription</p>
          <h1>
            Un texte entre. Un <em>cours qui se comprend</em> en sort.
          </h1>
          <p className="lede">
            Collez un chapitre, des notes de TD ou un article. Noêma repère les notions qui y sont citées et les
            enseigne vraiment : définitions, explications construites, analogies concrètes, exemples résolus, erreurs à
            éviter. Plus des fiches de révision et un résumé.
          </p>
          <div className="hero-cta">
            <Link className="cta" href="/generer">
              Générer mon cours
            </Link>
            <Link className="cta ghost" href="#comment">
              Comment ça marche
            </Link>
          </div>
          <p className="note" style={{ marginTop: 18 }}>
            Aucun compte · Aucun texte conservé · Export Markdown et PDF
          </p>
        </section>

        <section className="band" id="quoi">
          <h2>Ce que vous recevez</h2>
          <p>
            Trois documents, produits d’un seul coup à partir du même texte. Ils ne disent pas la même chose : l’un
            enseigne, l’autre fait réviser, le dernier remet en perspective.
          </p>
          <div className="grid3">
            <article className="feat">
              <div className="ico" aria-hidden="true">
                ◈
              </div>
              <h3>Le cours complet</h3>
              <p>
                Une section par notion : définition précise, pourquoi le concept existe, explication qui se construit
                paragraphe après paragraphe, analogie du quotidien, exemple travaillé résolu pas à pas, erreurs
                fréquentes, points à retenir.
              </p>
            </article>
            <article className="feat">
              <div className="ico" aria-hidden="true">
                ▤
              </div>
              <h3>Les fiches de révision</h3>
              <p>
                Une carte par notion, condensée pour la mémoire : l’essentiel en une phrase, les points clés, le
                vocabulaire à connaître et une astuce de mémorisation.
              </p>
            </article>
            <article className="feat">
              <div className="ico" aria-hidden="true">
                ◍
              </div>
              <h3>Le résumé</h3>
              <p>
                La notion-clé en une phrase, une synthèse qui relie les notions entre elles, le plan du cours, les
                mots-clés et des pistes pour aller plus loin.
              </p>
            </article>
          </div>
        </section>

        <section className="band" id="comment">
          <h2>Comment ça marche</h2>
          <p>Trois étapes, moins d’une minute.</p>
          <div className="steps">
            <div className="step">
              <b>1</b>
              <p>
                <strong>Collez votre texte</strong>
                Un chapitre, des notes prises en cours, un énoncé, un article technique. De quelques phrases à une
                vingtaine de pages.
              </p>
            </div>
            <div className="step">
              <b>2</b>
              <p>
                <strong>Réglez le niveau</strong>
                Collège, lycée, licence, master ou vulgarisation — et la profondeur voulue. Le vocabulaire et la hauteur
                d’explication s’ajustent.
              </p>
            </div>
            <div className="step">
              <b>3</b>
              <p>
                <strong>Lisez, révisez, exportez</strong>
                Le cours s’affiche avec son sommaire. Basculez vers les fiches ou le résumé, puis copiez en Markdown ou
                imprimez en PDF.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="pour-qui">
          <h2>Pour qui</h2>
          <div className="grid3">
            <article className="feat">
              <h3>Étudiants</h3>
              <p>
                Un polycopié dense, un cours mal pris, un chapitre sauté : vous obtenez la version qui s’explique, avec
                les fiches déjà faites.
              </p>
            </article>
            <article className="feat">
              <h3>Enseignants</h3>
              <p>
                Une base de support à retravailler : structure pédagogique, exemples, erreurs typiques des élèves, le
                tout exportable et modifiable.
              </p>
            </article>
            <article className="feat">
              <h3>Autodidactes</h3>
              <p>
                Une documentation technique aride devient un cours avec analogies et exemples résolus, au niveau que
                vous choisissez.
              </p>
            </article>
          </div>
        </section>

        <section className="band" id="faq">
          <h2>Questions fréquentes</h2>
          <div style={{ maxWidth: 760, marginTop: 26 }}>
            {FAQ.map((f) => (
              <details className="faq" key={f.q}>
                <summary>{f.q}</summary>
                <div>{f.r}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <h2>Essayez sur votre prochain chapitre</h2>
          <p>Collez le texte que vous avez sous la main. Vous verrez le résultat avant de décider s’il vous sert.</p>
          <Link className="cta" href="/generer">
            Générer mon cours
          </Link>
        </section>
      </div>
    </>
  );
}
