import Image from "next/image";

/**
 * Portfolio-Section.
 *
 * KORREKTUREN gegenüber Design-HTML (das Tippfehler aus alter WP-Seite übernommen hat):
 * - "Old Watsche" → "Old Wattsche" (Wattenscheider Wurzel, 2× T)
 * - "Humboldstraße" → "Humboldtstraße" (Alexander von Humboldt, 2× T)
 *
 * Adressen sind hier statisch — wenn referencePage Documents im CMS gepflegt sind,
 * wird diese Section per CMS-Query rendern (siehe TODO in CLAUDE.md).
 */

type Bestand = { marker: string; address: string };

const bestand: Bestand[] = [
  { marker: "01", address: "Old Wattsche 10, 44866 Bochum" },
  { marker: "02", address: "Kortumstraße 17, Kerkwege 3 & Viktoriastraße 57" },
  { marker: "03", address: "Viktoriastraße 22–26, 44787 Bochum" },
  { marker: "04", address: "Herner Straße 26, 44787 Bochum" },
  { marker: "05", address: "Nordring 51–53, 44787 Bochum" },
  { marker: "06", address: "Kortumstraße 15, 44787 Bochum" },
  { marker: "07", address: "Humboldtstraße 36, 44787 Bochum" },
  { marker: "08", address: "Kurt-Schumacher-Platz 10, 44787 Bochum" },
  { marker: "09", address: "Metzstraße 1, 44793 Bochum" },
  { marker: "10", address: "Ferdinandstraße 26, 44787 Bochum" },
  { marker: "11", address: "Universitätsstraße 95, 44787 Bochum" },
  { marker: "12", address: "Südring 15 & Neustraße 15, 44787 Bochum" },
];

export function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">07</span>Bestand
          </div>
          <div>
            <h2>Unsere Auswahl an Immobilien im Bestand.</h2>
            <p className="kicker">
              GKN ist kein Zwischenhändler. Was wir ankaufen, halten wir — und
              entwickeln es langfristig. Ein Auszug aus unserem aktuellen
              Bestand im Bochumer Stadtgebiet.
            </p>
          </div>
        </div>

        {/* Feature-Objekt: Südring 15 / Neustraße 15 — Hauptreferenz */}
        <div className="feature-obj">
          <div className="image">
            <Image
              className="building-photo"
              src="/objekte/01_Suedring_Neustrasse.jpg"
              alt="Südring 15 / Neustraße 15 — Bochum-Innenstadt, Mischimmobilie mit 39 Einheiten"
              width={1600}
              height={1100}
            />
            <div className="badge">Referenzobjekt</div>
            <div className="addr">
              Südring 15 &amp; Neustraße 15
              <br />
              44787 Bochum
            </div>
          </div>
          <div className="body">
            <h3>Mischimmobilie mit 39 Einheiten in Bochum-Innenstadt</h3>
            <div className="kpi-grid">
              <div className="kpi">
                <div className="v">25</div>
                <div className="l">Wohneinheiten</div>
              </div>
              <div className="kpi">
                <div className="v">14</div>
                <div className="l">Gewerbeeinheiten</div>
              </div>
              <div className="kpi">
                <div className="v">3.512&nbsp;m²</div>
                <div className="l">Gesamtfläche</div>
              </div>
              <div className="kpi">
                <div className="v">82</div>
                <div className="l">Stellplätze &amp; Garagen</div>
              </div>
              <div className="kpi">
                <div className="v">550.000&nbsp;€</div>
                <div className="l">Mieteinnahmen p. a.</div>
              </div>
              <div className="kpi">
                <div className="v">1987</div>
                <div className="l">Baujahr</div>
              </div>
            </div>
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: 1.65,
                color: "var(--ink-3)",
                margin: 0,
              }}
            >
              Vollvermietete Mischimmobilie mit klassischem Wohn-/Gewerbe-Mix in
              zentrumsnaher Lage. Ein typisches Objekt aus unserem Bestand —
              langfristig gehalten, sorgfältig verwaltet, kontinuierlich
              entwickelt.
            </p>
          </div>
        </div>

        <div className="bestand-list">
          <h4>Weitere Objekte im Bestand · Bochum</h4>
          <div className="bestand-grid">
            {bestand.map((b) => (
              <div className="row" key={b.marker}>
                <span className="marker">{b.marker}</span>
                {b.address}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
