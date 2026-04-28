import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand brand-footer" href="/">
              <Image
                className="brand-logo"
                src="/images/gkn-logo-white.png"
                alt="GKN Immobiliengruppe"
                width={220}
                height={32}
              />
            </Link>
            <p>
              Inhabergeführter Bestandshalter und Direktankäufer für
              Mehrfamilienhäuser, Gewerbeimmobilien, Grundstücke und Portfolios
              im Ruhrgebiet. Bankenunabhängig, diskret, zuverlässig.
            </p>
          </div>
          <div>
            <h5>Ankauf</h5>
            <ul>
              <li>
                <Link href="/mehrfamilienhaeuser-ankauf">Mehrfamilienhäuser</Link>
              </li>
              <li>
                <Link href="/gewerbeimmobilien-ankauf">Gewerbeimmobilien</Link>
              </li>
              <li>
                <Link href="/grundstuecke-ankauf">Grundstücke</Link>
              </li>
              <li>
                <Link href="/portfolios-ankauf">Portfolios</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Region</h5>
            <ul>
              <li>
                <Link href="/immobilienankauf/bochum">Immobilienankauf Bochum</Link>
              </li>
              <li>
                <Link href="/immobilienankauf/dortmund">Immobilienankauf Dortmund</Link>
              </li>
              <li>
                <Link href="/immobilienankauf/essen">Immobilienankauf Essen</Link>
              </li>
              <li>
                <Link href="/immobilienankauf">Ruhrgebiet</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Kontakt</h5>
            <ul>
              <li>GKN Immobilien GmbH</li>
              <li>Humboldtstraße 34</li>
              <li>44787 Bochum</li>
              <li>
                <a href="tel:02343671506220">0234 3671 506 220</a>
              </li>
              <li>
                <a href="mailto:info@gkn-immobilien.de">info@gkn-immobilien.de</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {year} GKN Immobilien GmbH · USt-ID DE297068781</div>
          <div className="legal">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/ratgeber">Ratgeber</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
