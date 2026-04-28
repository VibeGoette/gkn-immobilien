/**
 * Seed-Skript: Pflegt die initialen Sanity-Documents mit ECHTEN Daten
 * aus GKN-Kontext-fuer-Claude.md.
 *
 * Idempotent — verwendet feste _id Werte, sodass mehrfache Runs
 * Updates statt Duplikate erzeugen.
 *
 * Setup:
 *   1. NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   2. SANITY_WRITE_TOKEN in .env.local (Sanity → API → Tokens → "Editor"-Token)
 *
 * Run:
 *   npx tsx scripts/seed.ts
 */

import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-28",
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error("❌ SANITY_WRITE_TOKEN fehlt in .env.local");
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// SITE SETTINGS — Singleton mit ECHTEN Impressums-Daten
// ─────────────────────────────────────────────────────────────────────────────
const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "GKN Immobiliengruppe",
  tagline: "Immobilienankauf auf die schnelle, transparente und feine Art",
  contact: {
    phone: "0234 3671 506 220",
    email: "info@gkn-immobilien.de",
    address: "Humboldtstraße 34\n44787 Bochum",
  },
  legal: {
    companyName: "GKN Immobilien GmbH",
    street: "Humboldtstraße 34",
    zipCode: "44787",
    city: "Bochum",
    vatId: "DE297068781",
    professionalTitle: "Geprüfter Fachwirt Immobilienwirtschaft (IHK)",
    professionalChamber: "IHK Mittleres Ruhrgebiet",
    professionalCountry: "Deutschland",
    managingDirectors: "Ahmet Kurt, Patrick Nierychlo, Moritz Glud",
  },
  navigation: [
    { _key: "n1", label: "Ankauf", href: "/immobilienankauf" },
    { _key: "n2", label: "Mehrfamilienhäuser", href: "/mehrfamilienhaeuser-ankauf" },
    { _key: "n3", label: "Gewerbe", href: "/gewerbeimmobilien-ankauf" },
    { _key: "n4", label: "Portfolio", href: "/portfolio" },
    { _key: "n5", label: "Ratgeber", href: "/ratgeber" },
    { _key: "n6", label: "Kontakt", href: "/kontakt" },
  ],
  footerNavigation: [
    { _key: "f1", label: "Impressum", href: "/impressum" },
    { _key: "f2", label: "Datenschutz", href: "/datenschutz" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// TEAM — die 3 Geschäftsführer mit echten Daten
// ─────────────────────────────────────────────────────────────────────────────
const team = [
  {
    _id: "team.kurt",
    _type: "teamMember",
    name: "Ahmet Kurt",
    role: "Sprecher der Geschäftsführung | Ansprechpartner für institutionelle Investitionen",
    bio: "Mit Erfahrung, Strategie und Netzwerk verantwortet Ahmet Kurt die Ausrichtung der GKN Immobiliengruppe im institutionellen Bereich. Er ist der erste Ansprechpartner für professionelle Investoren und Partner auf Augenhöhe.",
    phone: "0234 3671 506 220",
    mobile: "0163 4290849",
    email: "kurt@gkn-immobilien.de",
    specialty: "institutional",
    qualifications: ["Geprüfter Fachwirt Immobilienwirtschaft (IHK)"],
    order: 1,
  },
  {
    _id: "team.nierychlo",
    _type: "teamMember",
    name: "Patrick Nierychlo",
    role: "Geschäftsführer | Ansprechpartner für private Verkäufe",
    bio: "Feingefühl im Gespräch und fundierte Marktkenntnis machen Patrick Nierychlo zum idealen Ansprechpartner für private Eigentümer. Er begleitet Sie transparent und partnerschaftlich durch den gesamten Verkaufsprozess.",
    phone: "0234 3671 506 220",
    mobile: "01575 8557025",
    email: "nierychlo@gkn-immobilien.de",
    specialty: "private",
    order: 2,
  },
  {
    _id: "team.glud",
    _type: "teamMember",
    name: "Moritz Glud",
    role: "Verwaltung | Bauleitung | Verkauf",
    bio: "Zuverlässigkeit in der Projektführung und ein sicherer Blick machen Moritz Glud zur tragenden Kraft im operativen Bereich.",
    phone: "0234 3671 506 220",
    email: "glud@gkn-immobilien.de",
    specialty: "operations",
    order: 3,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LOCATIONS — Bochum, Dortmund, Essen (Stubs, SEO-Texte kommen aus content-md)
// ─────────────────────────────────────────────────────────────────────────────
const locations = [
  {
    _id: "loc.bochum",
    _type: "locationPage",
    city: "Bochum",
    slug: { _type: "slug", current: "bochum" },
    geo: { _type: "geopoint", lat: 51.4818, lng: 7.2197 },
    seo: {
      metaTitle: "Immobilienankauf Bochum — GKN Immobiliengruppe",
      metaDescription:
        "Direktankauf von Mehrfamilienhäusern, Gewerbe und Portfolios in Bochum. Bankenunabhängig, diskret, mit sofortiger Anzahlung.",
      focusKeyword: "immobilienankauf bochum",
    },
  },
  {
    _id: "loc.dortmund",
    _type: "locationPage",
    city: "Dortmund",
    slug: { _type: "slug", current: "dortmund" },
    geo: { _type: "geopoint", lat: 51.5136, lng: 7.4653 },
    seo: {
      metaTitle: "Immobilienankauf Dortmund — GKN Immobiliengruppe",
      metaDescription:
        "Verkaufen Sie Ihre Immobilie in Dortmund direkt an einen Bestandshalter. Schnell, diskret, ohne Maklerprovision.",
      focusKeyword: "immobilienankauf dortmund",
    },
  },
  {
    _id: "loc.essen",
    _type: "locationPage",
    city: "Essen",
    slug: { _type: "slug", current: "essen" },
    geo: { _type: "geopoint", lat: 51.4556, lng: 7.0116 },
    seo: {
      metaTitle: "Immobilienankauf Essen — GKN Immobiliengruppe",
      metaDescription:
        "Direktankauf von Bestandsimmobilien in Essen. GKN kauft MFH, Gewerbe und Portfolios — diskret und mit fester Anzahlung.",
      focusKeyword: "immobilienankauf essen",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCE STUBS — 12 echte Bestandsadressen
// Bilder + Beschreibung + komplette Stats kommen später beim manuellen Pflegen.
// Bis dahin sind die Stubs DRAFTS (id mit "drafts." Prefix), damit sie nicht
// versehentlich live gehen und den Audit-Check failen.
// ─────────────────────────────────────────────────────────────────────────────
type RefStub = {
  slug: string;
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  type: "mfh" | "gewerbe" | "grundstueck" | "portfolio" | "misch";
  additional?: { street: string; houseNumber: string }[];
  // Wenn ECHT befüllt (Suedring), kein draft prefix
  hasContent?: boolean;
  stats?: Record<string, number | string>;
};

const referenceStubs: RefStub[] = [
  {
    slug: "suedring-15-neustrasse-15-bochum",
    street: "Südring",
    houseNumber: "15",
    zip: "44787",
    city: "Bochum",
    type: "misch",
    additional: [{ street: "Neustraße", houseNumber: "15" }],
    hasContent: true,
    stats: {
      wohneinheiten: 25,
      gewerbeeinheiten: 14,
      gesamtflaeche: 3512.58,
      stellplaetze: "61 + 21",
      baujahr: 1987,
      mieteinnahmen: 550000,
    },
  },
  { slug: "old-wattsche-10-bochum", street: "Old Wattsche", houseNumber: "10", zip: "44866", city: "Bochum", type: "mfh" },
  { slug: "kortumstrasse-17-bochum", street: "Kortumstraße", houseNumber: "17", zip: "44787", city: "Bochum", type: "misch", additional: [{ street: "Kerkwege", houseNumber: "3" }, { street: "Viktoriastraße", houseNumber: "57" }] },
  { slug: "viktoriastrasse-22-26-bochum", street: "Viktoriastraße", houseNumber: "22-26", zip: "44787", city: "Bochum", type: "mfh" },
  { slug: "herner-strasse-26-bochum", street: "Herner Straße", houseNumber: "26", zip: "44787", city: "Bochum", type: "mfh" },
  { slug: "nordring-51-53-bochum", street: "Nordring", houseNumber: "51-53", zip: "44787", city: "Bochum", type: "mfh" },
  { slug: "kortumstrasse-15-bochum", street: "Kortumstraße", houseNumber: "15", zip: "44787", city: "Bochum", type: "mfh" },
  { slug: "humboldtstrasse-36-bochum", street: "Humboldtstraße", houseNumber: "36", zip: "44787", city: "Bochum", type: "mfh" },
  { slug: "kurt-schumacher-platz-10-bochum", street: "Kurt-Schumacher-Platz", houseNumber: "10", zip: "44787", city: "Bochum", type: "gewerbe" },
  { slug: "metzstrasse-1-bochum", street: "Metzstraße", houseNumber: "1", zip: "44793", city: "Bochum", type: "mfh" },
  { slug: "ferdinandstrasse-26-bochum", street: "Ferdinandstraße", houseNumber: "26", zip: "44787", city: "Bochum", type: "mfh" },
  { slug: "universitaetsstrasse-95-bochum", street: "Universitätsstraße", houseNumber: "95", zip: "44787", city: "Bochum", type: "mfh" },
];

const buildReference = (s: RefStub) => {
  const id = s.hasContent ? `ref.${s.slug}` : `drafts.ref.${s.slug}`;
  const title = `${s.street} ${s.houseNumber}${
    s.additional?.length ? ` & ${s.additional.map((a) => `${a.street} ${a.houseNumber}`).join(" & ")}` : ""
  }, ${s.city}`;
  return {
    _id: id,
    _type: "referencePage",
    title,
    slug: { _type: "slug", current: s.slug },
    propertyType: s.type,
    city: { _type: "reference", _ref: `loc.${s.city.toLowerCase()}` },
    addressPrimary: {
      street: s.street,
      houseNumber: s.houseNumber,
      zipCode: s.zip,
      cityName: s.city,
    },
    ...(s.additional && {
      addressAdditional: s.additional.map((a, i) => ({
        _key: `add${i}`,
        street: a.street,
        houseNumber: a.houseNumber,
      })),
    }),
    ...(s.stats && { stats: s.stats }),
    description: s.hasContent
      ? [
          {
            _type: "block",
            _key: "desc1",
            children: [
              { _type: "span", text: "Hauptreferenz im Bochumer Bestand. Detailbeschreibung folgt." },
            ],
          },
        ]
      : undefined,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTE
// ─────────────────────────────────────────────────────────────────────────────
async function run() {
  const tx = client.transaction();

  // Site Settings
  tx.createOrReplace(siteSettings);
  console.log("→ siteSettings");

  // Team
  for (const t of team) {
    tx.createOrReplace(t);
    console.log(`→ ${t._id}`);
  }

  // Locations
  for (const l of locations) {
    tx.createOrReplace(l);
    console.log(`→ ${l._id}`);
  }

  // References
  for (const r of referenceStubs) {
    const doc = buildReference(r);
    tx.createOrReplace(doc);
    console.log(`→ ${doc._id} ${doc._id.startsWith("drafts.") ? "(DRAFT)" : "(PUBLISHED)"}`);
  }

  await tx.commit();

  console.log(`\n✅ Seed komplett: 1 settings + ${team.length} team + ${locations.length} locations + ${referenceStubs.length} references`);
  console.log(`\nDrafts (${referenceStubs.filter((r) => !r.hasContent).length}): müssen vor Publish manuell mit Bildern + Beschreibung + Stats befüllt werden.`);
  console.log(`Run 'npm run audit:content' um Lücken zu sehen.\n`);
}

run().catch((err) => {
  console.error("❌ Seed fehlgeschlagen:", err);
  process.exit(1);
});
