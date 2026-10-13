import Link from 'next/link';

export default function Header() {
  return (
    <header className="top">
      <div className="top-in">
        <Link href="/" className="logo" aria-label="Noêma, accueil">
          <i aria-hidden="true" />
          Noêma
        </Link>
        <nav aria-label="Navigation principale">
          <Link className="tbtn" href="/guides/reviser-plus-vite">
            Guides
          </Link>
          <Link className="tbtn" href="/#faq">
            FAQ
          </Link>
          <Link className="tbtn solid" href="/generer">
            Générer un cours
          </Link>
        </nav>
      </div>
    </header>
  );
}
