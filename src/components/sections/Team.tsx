import Image from "next/image";

type Member = {
  cornerLabel: string;
  imgSrc: string;
  imgAlt: string;
  roleTag: string;
  name: string;
  position: string;
  body: string;
  email: string;
};

// Korrektur ggü. Design-HTML: Alt-Text war versehentlich "Mike Grobosch" für mg-gkn.jpg.
// Korrekte Person ist Moritz Glud (laut Kontext-File).
const members: Member[] = [
  {
    cornerLabel: "PORTRAIT · 01",
    imgSrc: "/images/ak-gkn.jpg",
    imgAlt: "Ahmet Kurt — Sprecher der Geschäftsführung GKN Immobiliengruppe",
    roleTag: "Sprecher der Geschäftsführung",
    name: "Ahmet Kurt",
    position: "Institutionelle Investitionen & Portfolios",
    body: "Mit Erfahrung, Strategie und Netzwerk verantwortet Ahmet Kurt die Ausrichtung der GKN Immobiliengruppe im institutionellen Bereich — erster Ansprechpartner für professionelle Investoren und Partner auf Augenhöhe.",
    email: "kurt@gkn-immobilien.de",
  },
  {
    cornerLabel: "PORTRAIT · 02",
    imgSrc: "/images/pn-gkn.jpg",
    imgAlt: "Patrick Nierychlo — Geschäftsführer GKN Immobiliengruppe",
    roleTag: "Geschäftsführer",
    name: "Patrick Nierychlo",
    position: "Private Verkäufer & Eigentümer",
    body: "Feingefühl im Gespräch und fundierte Marktkenntnis machen Patrick Nierychlo zum idealen Ansprechpartner für private Eigentümer. Er begleitet Sie transparent und partnerschaftlich durch den gesamten Verkaufsprozess.",
    email: "nierychlo@gkn-immobilien.de",
  },
  {
    cornerLabel: "PORTRAIT · 03",
    imgSrc: "/images/mg-gkn.jpg",
    imgAlt: "Moritz Glud — Verwaltung, Bauleitung, Verkauf bei GKN Immobiliengruppe",
    roleTag: "Verwaltung · Bauleitung · Verkauf",
    name: "Moritz Glud",
    position: "Operatives & Projektführung",
    body: "Zuverlässigkeit in der Projektführung und ein sicherer Blick für das Wesentliche machen Moritz Glud zur tragenden Kraft im operativen Bereich — von der Bewertung über die Bauleitung bis zur Übergabe.",
    email: "glud@gkn-immobilien.de",
  },
];

export function Team() {
  return (
    <section className="team" id="team">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">06</span>Team
          </div>
          <div>
            <h2>Drei Persönlichkeiten. Ein Fundament.</h2>
            <p className="kicker">
              Eigentümer im Ruhrgebiet verkaufen an drei Personen mit Namen,
              Gesicht und Handschlag — nicht an einen anonymen Investor. Sie
              sprechen direkt mit der Geschäftsführung.
            </p>
          </div>
        </div>
        <div className="team-grid">
          {members.map((m) => (
            <article className="member" key={m.email}>
              <div className="portrait">
                <div className="corner">{m.cornerLabel}</div>
                <Image
                  className="portrait-img"
                  src={m.imgSrc}
                  alt={m.imgAlt}
                  width={600}
                  height={600}
                />
                <div className="role-tag">{m.roleTag}</div>
              </div>
              <div className="body">
                <h3>{m.name}</h3>
                <div className="position">{m.position}</div>
                <p>{m.body}</p>
                <div className="contact-line">
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
