import Link from "next/link";
import Image from "next/image";

type City = {
  nn: string;
  href: string;
  name: string;
  meta: string;
};

const cities: City[] = [
  { nn: "i.", href: "/immobilienankauf/bochum", name: "Bochum", meta: "Sitz · Heimatmarkt · Bestand" },
  { nn: "ii.", href: "/immobilienankauf/dortmund", name: "Dortmund", meta: "Innenstadt · Hörde · Hombruch" },
  { nn: "iii.", href: "/immobilienankauf/essen", name: "Essen", meta: "drittgrößte Stadt NRW" },
  { nn: "iv.", href: "/immobilienankauf", name: "Metropolregion Ruhr", meta: "auf Anfrage" },
];

export function Region() {
  return (
    <section className="region" id="region">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">05</span>Region
          </div>
          <div>
            <h2>Drei Städte. Ein Heimatmarkt.</h2>
            <p className="kicker">
              Wir sind kein überregionaler Investor, der das Ruhrgebiet nur als
              Koordinate kennt. Wir kennen die Stadtteile, die Mietmärkte und
              die Entwicklungsperspektiven von Wattenscheid bis Hörde.
            </p>
          </div>
        </div>
        <div className="region-grid">
          <div className="cities">
            {cities.map((c) => (
              <Link href={c.href} className="city" key={c.href}>
                <span className="nn">{c.nn}</span>
                <span>
                  <span className="name">{c.name}</span>
                </span>
                <span className="meta">{c.meta}</span>
                <span className="arrow-link">→</span>
              </Link>
            ))}
          </div>

          <div className="region-map">
            <Image
              className="region-photo"
              src="/images/bochum-region.jpg"
              alt="Bochum Innenstadt — Bermuda3eck / Kortumstraße"
              width={1200}
              height={800}
            />
            <div className="region-overlay">
              <div className="region-corner-tl">
                <div className="region-title">Metropolregion Ruhr</div>
                <div className="region-sub">Ankaufsgebiet · GKN</div>
              </div>
              <div className="region-corner-br">
                <div className="region-pin">
                  <span className="pin-dot"></span>
                  <div className="pin-text">
                    <strong>Bochum</strong>
                    <em>Sitz · Hauptmarkt</em>
                  </div>
                </div>
              </div>
              <div className="region-bottom">
                <span>51° 28′ N · 7° 13′ E</span>
                <span>
                  Bochum · Dortmund · Essen · Herne · Gelsenkirchen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
