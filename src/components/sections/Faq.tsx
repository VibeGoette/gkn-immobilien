type FaqItem = { q: string; a: string };

const faqs: FaqItem[] = [
  {
    q: "Welche Immobilien kauft GKN an?",
    a: "Wir kaufen Mehrfamilienhäuser ab 250.000 €, Gewerbeimmobilien, Grundstücke und Portfolios bis 30 Mio. € im Ruhrgebiet an — unabhängig vom Zustand. Schwerpunkt sind Bochum, Dortmund und Essen, wir prüfen aber auch attraktive Objekte in der gesamten Metropolregion Ruhr.",
  },
  {
    q: "Muss die Immobilie vermietet sein?",
    a: "Nein. Leerstand ist für uns kein Ausschlusskriterium. Auch sanierungsbedürftige Objekte mit Instandhaltungsstau, leerstehende Gewerbeflächen oder Mehrfamilienhäuser mit Teilleerstand werden von uns angekauft.",
  },
  {
    q: "Wie schnell erhalte ich ein Angebot?",
    a: "Wir prüfen Ihr Angebot intern und geben Ihnen zeitnah eine Rückmeldung — ohne externe Bankenabstimmungen. Eine erste Preisindikation ist in der Regel innerhalb einer Woche möglich, der gesamte Prozess bis zum Notartermin dauert vier bis acht Wochen.",
  },
  {
    q: "Muss ich einen Makler einschalten?",
    a: "Nein. Wir kaufen direkt — von Eigentümern und über Makler gleichermaßen. Beim Direktverkauf an GKN sparen Sie sich Provisionen, Exposéerstellung und Zeitverluste durch Besichtigungstouristen.",
  },
  {
    q: "Was bedeutet bankenunabhängiger Ankauf?",
    a: "Wir finanzieren unsere Ankäufe eigenkapitalbasiert. Es gibt keinen Finanzierungsvorbehalt im Kaufvertrag und keine Abhängigkeit von Bankentscheidungen — ein zugesagter Deal ist ein abgeschlossener Deal.",
  },
  {
    q: "Wird mein Verkauf wirklich diskret behandelt?",
    a: "Ja. Es gibt kein öffentliches Exposé, keine Maklerschilder, keine Massenbesichtigungen. Die Besichtigung erfolgt einmalig mit einem unserer Geschäftsführer persönlich. Auf Wunsch unterzeichnen wir vorab eine NDA.",
  },
];

export function Faq() {
  // FAQPage Schema.org JSON-LD für Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="faq" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">08</span>Häufige Fragen
          </div>
          <div>
            <h2>Antworten zum Immobilienankauf.</h2>
          </div>
        </div>
        <div className="faq-grid">
          <div>
            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                color: "var(--ink-3)",
                margin: "0 0 24px",
              }}
            >
              Sie haben eine Frage zum Direktankauf, zur Bewertung oder zum
              Ablauf? Die wichtigsten Punkte beantworten wir hier — für alles
              Weitere stehen unsere Geschäftsführer persönlich zur Verfügung.
            </p>
            <a href="#kontakt" className="btn btn-ghost-dark">
              Persönlich nachfragen <span className="arrow">→</span>
            </a>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details className="faq-item" key={f.q} open={i === 0}>
                <summary>
                  {f.q} <span className="toggle">+</span>
                </summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaStrip() {
  return (
    <section className="cta-strip">
      <div className="container">
        <h2>
          Bereit, Ihre Immobilie <em>diskret</em> zu verkaufen? Wir freuen uns
          auf Ihr Angebot.
        </h2>
        <div className="actions">
          <a href="#kontakt" className="btn">
            Jetzt Immobilie anbieten <span className="arrow">→</span>
          </a>
          <a href="tel:02343671506220" className="btn outline">
            +49 234 3671 506 220 <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
