import Link from "next/link";
import { RegionMap } from "./RegionMap";

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

/**
 * Region-Section: dunkelblauer Editorial-Block mit custom SVG-Karte rechts
 * und nummerierter City-Liste links. Nutzt die neue .region-dark Variante
 * (in globals.css definiert) statt der hellen Default-Section.
 */
export function Region() {
  return (
    <section className="region region-dark" id="region">
      <div className="container">
        <div className="section-head section-head-dark">
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

        <div className="region-grid region-grid-dark">
          <div className="cities cities-dark">
            {cities.map((c) => (
              <Link href={c.href} className="city city-dark" key={c.href}>
                <span className="nn">{c.nn}</span>
                <span className="name">{c.name}</span>
                <span className="meta">{c.meta}</span>
                <span className="arrow-link">→</span>
              </Link>
            ))}
          </div>

          <div className="region-map-box">
            <RegionMap />
          </div>
        </div>
      </div>
    </section>
  );
}
