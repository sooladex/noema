import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <h5>Noêma</h5>
          <p style={{ margin: 0, maxWidth: 320, lineHeight: 1.7 }}>
            Un outil qui lit un texte, en extrait les notions et les enseigne : cours détaillé, fiches de révision,
            résumé.
          </p>
        </div>
        <div>
          <h5>Produit</h5>
          <Link href="/generer">Générer un cours</Link>
          <Link href="/guides/reviser-plus-vite">Réviser plus vite</Link>
          <Link href="/guides/fiches-de-revision">Faire des fiches</Link>
          <Link href="/guides/resumer-un-cours">Résumer un cours</Link>
        </div>
        <div>
          <h5>Informations</h5>
          <Link href="/contact">Contact</Link>
          <Link href="/confidentialite">Confidentialité</Link>
          <Link href="/cgu">CGU</Link>
          <Link href="/mentions-legales">Mentions légales</Link>
        </div>
      </div>
      <div className="foot-bot">
        <span>© {new Date().getFullYear()} Noêma</span>
        <span>Aucun compte requis · Aucun texte conservé · Sans cookie de suivi</span>
      </div>
    </footer>
  );
}
