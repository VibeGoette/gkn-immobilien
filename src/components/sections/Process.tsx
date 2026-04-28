type Step = {
  num: string;
  title: string;
  body: string;
  duration: string;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Angebot einreichen",
    body: "Adresse, Kurzbeschreibung und Preisvorstellung — formlos per E-Mail oder über das Kontaktformular.",
    duration: "Tag 1",
  },
  {
    num: "02",
    title: "Interne Bewertung",
    body: "Wir prüfen Lage, Zustand, Mieteinnahmen und Marktdynamik — ohne Zutritt zur Immobilie.",
    duration: "2–5 Tage",
  },
  {
    num: "03",
    title: "Preisindikation",
    body: "Sie erhalten eine erste, transparent begründete Preisindikation — direkt und verbindlich.",
    duration: "1 Woche",
  },
  {
    num: "04",
    title: "Diskrete Besichtigung",
    body: "Persönlicher Termin mit einem unserer Geschäftsführer. Diskret, ohne Außenwirkung.",
    duration: "2–3 Wochen",
  },
  {
    num: "05",
    title: "Notar & Anzahlung",
    body: "Verbindliches Kaufangebot, gemeinsamer Notartermin — und sofortige Anzahlung bei Abschluss.",
    duration: "4–8 Wochen",
  },
];

export function Process() {
  return (
    <section className="process" id="prozess">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">04</span>Ablauf
          </div>
          <div>
            <h2>In fünf Schritten zum Notartermin.</h2>
            <p className="kicker">
              Direktverkauf an GKN bedeutet: keine Exposéerstellung, keine
              Besichtigungstouristen, kein Finanzierungsvorbehalt. So läuft der
              Prozess von der ersten Kontaktaufnahme bis zur sofortigen
              Anzahlung.
            </p>
          </div>
        </div>
        <div className="proc-grid">
          {steps.map((s) => (
            <div className="proc-step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
              <span className="duration">{s.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
