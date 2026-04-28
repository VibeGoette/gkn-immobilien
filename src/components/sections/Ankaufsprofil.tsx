type Objekt = {
  roman: "I" | "II" | "III" | "IV";
  nn: string;
  title: string;
  tag: string;
  body: string;
  bullets: string[];
};

const objekte: Objekt[] = [
  {
    roman: "I",
    nn: "01",
    title: "Mehrfamilienhäuser",
    tag: "Einzelobjekte ab 250.000 €",
    body: "Vom unsanierten Objekt bis zum vollvermieteten Bestandsgebäude. Wir kaufen Zinshäuser und MFH ankauf-bereit — auch bei Leerstand, Instandhaltungsstau oder Sanierungsbedarf.",
    bullets: [
      "Voll vermietete Bestandsobjekte",
      "Sanierungsbedürftige Häuser",
      "Geerbte Mehrfamilienhäuser",
      "Leerstand kein Ausschlusskriterium",
    ],
  },
  {
    roman: "II",
    nn: "02",
    title: "Gewerbeimmobilien",
    tag: "Büro · Praxis · Einzelhandel · Mischnutzung",
    body: "Bevorzugt in gut frequentierten zentrumsnahen Lagen oder in aufstrebenden Stadtteilen. Auch leerstehende Gewerbeflächen mit Umnutzungspotenzial sind für uns interessant.",
    bullets: [
      "Büro- und Praxisflächen",
      "Einzelhandel und Ladenlokale",
      "Mischimmobilien Wohnen/Gewerbe",
      "Innenstadtlagen Bochum/Dortmund/Essen",
    ],
  },
  {
    roman: "III",
    nn: "03",
    title: "Portfolios",
    tag: "bis 30.000.000 €",
    body: "Wohn- und Mischportfolios für institutionelle Verkäufer, Erbengemeinschaften und Bestandshalter. Inhomogene Lagen, gemischte Sanierungsstände und unterschiedliche Vermietungsstände sind möglich.",
    bullets: [
      "Wohngebiete und Mischgebiete",
      "Inhomogene Lagen akzeptiert",
      "Ansprechpartner: Ahmet Kurt",
      "Geordneter, vertraulicher Prozess",
    ],
  },
  {
    roman: "IV",
    nn: "04",
    title: "Grundstücke",
    tag: "Bauflächen · Entwicklungsflächen",
    body: "Wir kaufen erschlossene Baugrundstücke ebenso wie Brachflächen und Entwicklungsareale im Ruhrgebiet. Direktankauf ohne Bieterverfahren, ohne öffentliche Vermarktung.",
    bullets: [
      "Erschlossene Baugrundstücke",
      "Entwicklungsflächen, B-Plan offen",
      "Brachflächen mit Potenzial",
      "Auch Angebote von Maklern willkommen",
    ],
  },
];

export function Ankaufsprofil() {
  return (
    <section className="ankauf" id="ankauf">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">03</span>Ankaufsprofil
          </div>
          <div>
            <h2>Was wir im Ruhrgebiet ankaufen.</h2>
            <p className="kicker">
              Vier klare Objektkategorien, ein Investitionsvolumen bis 30 Mio. €
              — und kein Ausschluss bei Zustand, Leerstand oder Sanierungsbedarf.
            </p>
          </div>
        </div>

        <div className="ankauf-intro">
          <div className="left">
            <h3>
              Region: Ruhrgebiet, mit Schwerpunkt Bochum, Dortmund, Essen.
            </h3>
            <p
              style={{
                color: "var(--ink-3)",
                fontSize: "15.5px",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Wir kaufen bevorzugt in Städten mit positiver wirtschaftlicher
              Entwicklung, guter Verkehrsanbindung und wachsender Bevölkerung.
              Unser Heimatmarkt ist der Bochumer Bestand — aber wir sind in der
              gesamten Metropolregion Ruhr aktiv.
            </p>
          </div>
          <div className="meta-list">
            <div className="item">
              <div className="k">Investitionsvolumen</div>
              <div className="v">bis 30.000.000 €</div>
            </div>
            <div className="item">
              <div className="k">Mindestkaufpreis MFH</div>
              <div className="v">ab 250.000 €</div>
            </div>
            <div className="item">
              <div className="k">Vermietungsstand</div>
              <div className="v">unerheblich</div>
            </div>
            <div className="item">
              <div className="k">Zustand</div>
              <div className="v">unerheblich</div>
            </div>
          </div>
        </div>

        <div className="objekt-grid">
          {objekte.map((o) => (
            <article className="objekt-card" key={o.roman}>
              <div className="num-block">
                <div className="roman">{o.roman}</div>
                <div className="nn">{o.nn}</div>
              </div>
              <div>
                <h3>{o.title}</h3>
                <div className="tag">{o.tag}</div>
                <p>{o.body}</p>
                <ul>
                  {o.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
