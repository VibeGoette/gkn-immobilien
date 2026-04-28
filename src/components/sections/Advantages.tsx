type Advantage = {
  roman: string;
  icon: React.ReactNode;
  title: string;
  body: string;
};

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
};

const advantages: Advantage[] = [
  {
    roman: "i",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx={12} cy={12} r={9} />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    title: "Schnelle Entscheidung",
    body: "Wir prüfen Ihr Angebot intern und melden uns innerhalb kurzer Zeit verbindlich zurück — ohne langwierige Bankenprozesse oder externe Abstimmungen.",
  },
  {
    roman: "ii",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x={3} y={6} width={18} height={13} rx={1} />
        <path d="M3 10h18M8 15h3" />
      </svg>
    ),
    title: "Sofortige Anzahlung",
    body: "Bei Vertragsabschluss leisten wir eine sofortige Anzahlung. Das gibt Ihnen Planungssicherheit von Beginn an — nicht erst beim Eigentumsübergang.",
  },
  {
    roman: "iii",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l8 4v6c0 4.5-3.5 7-8 8-4.5-1-8-3.5-8-8V7l8-4z" />
      </svg>
    ),
    title: "Bankenunabhängig",
    body: "Wir finanzieren unsere Ankäufe eigenkapitalbasiert. Kein Finanzierungsvorbehalt, keine Abhängigkeit von Bankentscheidungen, keine geplatzten Deals.",
  },
  {
    roman: "iv",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx={12} cy={12} r={3} />
        <line x1={4} y1={20} x2={20} y2={4} />
      </svg>
    ),
    title: "Absolute Diskretion",
    body: "Kein öffentliches Exposé, keine Besichtigungsmassen, kein Maklerschild im Garten. Ihr Verkauf bleibt zwischen Ihnen und uns — garantiert.",
  },
  {
    roman: "v",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M8 11l3 3 5-5" />
        <circle cx={12} cy={12} r={9} />
      </svg>
    ),
    title: "Faire Verhandlung",
    body: "Unsere Geschäftsführer sind persönlich Ihre Ansprechpartner — nicht ein Call-Center. Handschlagqualität und Verlässlichkeit sind unser Geschäftsmodell.",
  },
  {
    roman: "vi",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 12h18M3 6h18M3 18h12" />
      </svg>
    ),
    title: "Jeder Zustand willkommen",
    body: "Sanierungsbedarf, Leerstand, Instandhaltungsstau — für uns kein Ausschlusskriterium. Wir kennen den Markt und schätzen den Wert realistisch ein.",
  },
];

export function Advantages() {
  return (
    <section className="advantages">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">02</span>Ihre Vorteile
          </div>
          <div>
            <h2>Sechs Gründe, an GKN zu verkaufen.</h2>
            <p className="kicker">
              Schnelle Entscheidungen. Klare Kommunikation. Absolute Diskretion.
              Wir verbinden den institutionellen Anspruch mit der
              Handschlagqualität eines lokalen Familienunternehmens.
            </p>
          </div>
        </div>
        <div className="adv-grid">
          {advantages.map((a) => (
            <div className="adv-card" key={a.roman}>
              <div className="idx">{a.roman}</div>
              <div className="ic">{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
