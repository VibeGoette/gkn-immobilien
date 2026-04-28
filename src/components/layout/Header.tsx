import Link from "next/link";
import Image from "next/image";

/**
 * Site-Header.
 * Anti-Pattern-Schutz: globale Nav nur HIER, niemals in einer Page-Component.
 * (Vermeidet das "doppelte Navigation" Problem der alten Seite.)
 */
export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href="/">
          <Image
            className="brand-logo"
            src="/images/gkn-logo-blue.png"
            alt="GKN Immobiliengruppe"
            width={220}
            height={45}
            priority
          />
          <div className="brand-divider"></div>
          <div className="brand-sub">Direktankauf · Bochum</div>
        </Link>
        <nav className="primary" aria-label="Hauptnavigation">
          <Link href="/immobilienankauf">Was wir ankaufen</Link>
          <Link href="/#prozess">Ablauf</Link>
          <Link href="/#region">Region</Link>
          <Link href="/#team">Team</Link>
          <Link href="/portfolio">Bestand</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link href="/#kontakt" className="btn btn-ghost-light">
          Jetzt anbieten <span className="arrow">→</span>
        </Link>
      </div>
    </header>
  );
}
