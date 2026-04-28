"use client";

import { useState } from "react";

export function Hero() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="hero">
      <div className="container">
        <div>
          <div className="hero-eyebrow">
            Immobilienankauf Ruhrgebiet · seit Bochum
          </div>
          <h1>
            Verkaufen, ohne den
            <br />
            Markt zu&nbsp;<em>betreten.</em>
          </h1>
          <p className="lead">
            Die GKN Immobiliengruppe kauft Mehrfamilienhäuser, Gewerbeimmobilien,
            Grundstücke und Portfolios im Ruhrgebiet direkt an. Keine
            Besichtigungstouristen, keine öffentliche Ausschreibung, kein
            Finanzierungsvorbehalt. Nur ein fairer Preis, eine schnelle
            Entscheidung — und ein Team, das hält, was es verspricht.
          </p>
          <div className="hero-ctas">
            <a href="#kontakt" className="btn btn-primary">
              Immobilie diskret anbieten <span className="arrow">→</span>
            </a>
            <a href="#ankauf" className="btn btn-ghost-light">
              Ankaufsprofil ansehen
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="num">bis 30 Mio €</div>
              <div className="lbl">Portfolio-Volumen</div>
            </div>
            <div className="stat">
              <div className="num">ab 250.000 €</div>
              <div className="lbl">Einzelobjekte MFH</div>
            </div>
            <div className="stat">
              <div className="num">4–8 Wochen</div>
              <div className="lbl">bis zum Notartermin</div>
            </div>
          </div>
        </div>

        <aside className="hero-card" id="kontakt">
          <h3>Schnellangebot abgeben</h3>
          <p className="sub">
            Wir melden uns zeitnah, diskret und persönlich zurück.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: Resend / Server-Action für Lead-Submission
              setSubmitted(true);
            }}
          >
            <div className="row-2">
              <div className="field">
                <label>Objektart</label>
                <select defaultValue="Mehrfamilienhaus">
                  <option>Mehrfamilienhaus</option>
                  <option>Gewerbeimmobilie</option>
                  <option>Grundstück</option>
                  <option>Portfolio</option>
                </select>
              </div>
              <div className="field">
                <label>Stadt</label>
                <select defaultValue="Bochum">
                  <option>Bochum</option>
                  <option>Dortmund</option>
                  <option>Essen</option>
                  <option>Anderes Ruhrgebiet</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>Adresse</label>
              <input type="text" placeholder="Straße, Hausnummer" />
            </div>
            <div className="row-2">
              <div className="field">
                <label>Preisvorstellung</label>
                <input type="text" placeholder="z. B. 1.200.000 €" />
              </div>
              <div className="field">
                <label>Kontakt</label>
                <input
                  type="text"
                  placeholder="E-Mail oder Telefon"
                  required
                />
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={submitted}
            >
              {submitted ? "Vielen Dank — wir melden uns" : "Angebot senden"}
              {!submitted && <span className="arrow">→</span>}
            </button>
            <div className="promise">
              <span>
                <span className="check">✓</span> 100 % diskret
              </span>
              <span>
                <span className="check">✓</span> Ohne Makler
              </span>
              <span>
                <span className="check">✓</span> Sofortige Anzahlung
              </span>
            </div>
          </form>
        </aside>
      </div>
    </section>
  );
}
