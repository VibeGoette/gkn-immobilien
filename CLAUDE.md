# GKN Immobiliengruppe — Project Brief

## Unternehmen (Single Source of Truth)
- **Firma**: GKN Immobilien GmbH
- **Sitz**: Humboldtstraße 34, 44787 Bochum (Vorsicht: zwei T in Humboldt**t**! Alte Seite hatte Tippfehler)
- **Tel**: 0234 3671 506 220
- **E-Mail**: info@gkn-immobilien.de
- **USt-ID**: DE297068781
- **Berufsbezeichnung**: Geprüfter Fachwirt Immobilienwirtschaft (IHK), IHK Mittleres Ruhrgebiet
- **Geschäftsführung**: Ahmet Kurt (institutionell), Patrick Nierychlo (private), Moritz Glud (operativ)

## Stack
- **Next.js 16** App Router, React 19, TypeScript strict
- **Tailwind CSS v4** (PostCSS-Plugin)
- **Sanity v4** embedded Studio bei `/studio`
- **Vercel Marketplace Integration** (Sanity native, Env-Vars auto)

## Architektur
Single-Repo, Single-Deployment. Frontend + Studio in einer Codebase.

```
app/
├── (site)/                    # Frontend Route Group
│   ├── page.tsx               # Startseite (homePage Singleton)
│   ├── [serviceSlug]/         # Leistungsseiten (servicePage)
│   │   └── [city]/            # Service+Stadt Kombi (serviceLocationPage)
│   ├── immobilienankauf/[city]/  # Stadtseiten (locationPage)
│   ├── portfolio/             # Referenzen-Hub
│   ├── referenzen/[slug]/     # Referenz-Detail (referencePage)
│   ├── ratgeber/[slug]/       # Ratgeber (guidePage)
│   ├── blog/[slug]/           # Blog (blogPost)
│   └── kontakt/
├── studio/[[...tool]]/        # Embedded Sanity Studio
├── sitemap.ts                 # Auto-Sitemap aus Sanity
└── robots.ts

src/sanity/
├── env.ts
├── lib/{client,image,live}.ts
├── schemas/                   # Alle Schemas
└── structure.ts               # Studio-Navigation
```

## SEO-Strategie (Cluster-Pillar)
- **Pillar-Seiten**: Startseite, 4 Leistungsseiten (MFH, Gewerbe, Grundstücke, Portfolios)
- **Cluster**: Stadt-Seiten (Bochum, Dortmund, Essen) + Service+Stadt Kombi-Seiten
- **Supporting**: Ratgeber-Artikel verlinken IMMER min. 1 transaktionale Seite (im Schema enforced)
- **BOFU-First**: Priority Score BV 45% / RE 35% / TP 20%

## Sanity-Datenmodell
- **Singletons**: `siteSettings`, `homePage`
- **Pages**: `servicePage`, `locationPage`, `serviceLocationPage`, `referencePage`, `guidePage`, `blogPost`
- **Tools**: `tool` (Rechner: ertragswert, kostenvergleich, spekusteuer; Lead-Magneten: wertcheck, diskret, checkliste, marktbericht)
- **Other**: `teamMember`
- **Reusable Objects**: `seoFields`, `hero`, `faqSection`, `trustBar`, `processSection`, `richTextSection`, `ctaSection`, `referenceShowcase`

## URL-Konvention (autoritativ aus GKN-Kontext-fuer-Claude.md)
- **Nested, ohne trailing slash**: `/immobilienankauf/bochum`, `/mehrfamilienhaeuser-ankauf/bochum`
- Sitemap, Frontend-Links, internal redirects: alle ohne `/` am Ende
- Next.js default `trailingSlash: false` aktiv

## Seed-Workflow
Initial-Daten kommen via `npm run seed`:
- `siteSettings` — komplettes Impressum (Firma, USt-ID, IHK-Bezeichnung, GFs)
- 3 `teamMember` — Kurt, Nierychlo, Glud mit echten Kontaktdaten + Spezialisierung
- 3 `locationPage` — Bochum, Dortmund, Essen mit Geo-Koordinaten + SEO
- 12 `referencePage` Stubs — alle Bochum-Adressen aus dem Bestand. Hauptreferenz Südring 15 published, andere als DRAFTS bis Bilder + Beschreibung gepflegt sind.

Idempotent: feste `_id` Werte → mehrfache Runs erzeugen Updates statt Duplikate.

## Deployment
- **Hoster**: Vercel
- **Domain**: gkn-immobilien.de (DNS-Cutover am Ende)
- **Sanity Setup**: Über Vercel Marketplace (1-Click) → provisioned automatisch Project ID, Dataset, Tokens als Env-Vars

## Env-Vars (auto via Vercel-Sanity-Integration)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (default: production)
- `NEXT_PUBLIC_SANITY_API_VERSION` (default: 2026-04-28)
- `SANITY_API_READ_TOKEN` (für Draft-Mode)
- `NEXT_PUBLIC_SITE_URL` (https://gkn-immobilien.de)

## Git
```bash
git config user.email "designedbygotti@gmail.com"
git config user.name "VibeGoette"
```

## TODO (next sessions)
- [ ] Design-System aus Claude-Design-Output übernehmen → `app/globals.css` (CSS-Variables, Fonts, Tokens)
- [ ] Header + Footer Components aus Design ableiten
- [ ] Section-Renderer-Komponenten bauen (für `pageBuilder` Output)
- [ ] PortableText-Custom-Components für Body-Inhalte
- [ ] Inhalte aus `gkn-content-vollstaendig.md` als servicePage/locationPage/serviceLocationPage seed-bar machen (zweiter Seed-Pass)
- [ ] 7 Blog-Artikel als `blogPost` Documents seeden (`scripts/seed-blog.ts`)
- [ ] FAQPage Schema.org JSON-LD pro Seite mit FAQ
- [ ] Local SEO Schema (RealEstateAgent + LocalBusiness) für Stadtseiten
- [ ] Tool-React-Components: Ertragswert-Rechner, Verkaufskosten-Vergleich, Speku-Check
- [ ] Lead-Magnet-Formulare (Resend für E-Mails: Wertcheck, Diskrete Erstanfrage)
- [ ] Sanity-Projekt via Vercel Marketplace verbinden
- [ ] DNS-Cutover gkn-immobilien.de → Vercel

## Rollout-Reihenfolge (laut Briefing)
1. Startseite
2. 4 Leistungsseiten
3. 3 Stadtseiten (Bochum, Dortmund, Essen)
4. Kombiseiten (Bochum zuerst)
5. Referenzen migrieren
6. Ratgeber für Longtails

---

## ⚠ Anti-Patterns aus Audit der alten Seite (NICHT wiederholen)

Die alte WordPress-Seite hatte konkrete Schwächen — diese sind im neuen Stack durch Code/Schema-Constraints **systematisch verhindert**:

### 1. Leere Objektseiten
**Alt**: Viele Portfolio-Seiten zeigten nur Titel + Kommentarformular.
**Neu**: `referencePage` Schema erzwingt: `image` (required), `description` (required), `addressPrimary` (required, alle Felder), min. 3 Stats (custom validation), Galerie-Warnung ab < 4 Bildern.
**Gate**: `npm run audit:content:strict` failt den Build, wenn published Refs Bild/Beschreibung/Adresse fehlen.

### 2. WordPress-Reste (Kommentare, Login-Hinweise)
**Alt**: "Schreibe einen Kommentar", "Du musst angemeldet sein …" auf Objektseiten.
**Neu**: Stack hat keine Kommentar-/Auth-Defaults. Nichts implementieren, was nicht aktiv von einer Section-Komponente angefordert wird.

### 3. Doppelte Navigation
**Alt**: Header/Menu mehrfach gerendert (Theme-Konflikt).
**Neu**: Navigation ausschließlich in `app/(site)/layout.tsx`. Keine Page rendert eigene globale Nav.

### 4. Inkonsistente Adressen
**Alt**: "Südring 15 & Neustraße 15" vs. "& Neustraße 1" auf gleicher Seite. "Humboldstraße" statt "Humboldtstraße".
**Neu**: Strukturierte Felder im Schema (`addressPrimary` + `addressAdditional`), PLZ-Regex-Validierung. Frontend rendert ausschließlich via `src/lib/address.ts` Helper (`formatAddressFull`, `formatAddressShort`, `formatStreetline`). **Niemals Adressen im JSX manuell zusammenbauen.**

### 5. Schwache Portfolio-Übersicht
**Alt**: Reine Textliste ohne Bilder/Kennzahlen.
**Neu**: `/portfolio/` rendert grid mit Hero-Bild + Adresse + Quick-Stats (WE/GE/m²) per Default.

### 6. Schwache Vertrauenssignale auf Startseite
**Alt**: Generische Floskeln, keine harten Zahlen.
**Neu**: `homePage.stats` (Pflicht-Felder Erfahrungsjahre, Experten, Anzahl Objekte) + `referenceShowcase` Section + Team-Sektion mit Reference auf `teamMember`.

### 7. Leere SEO-Felder
**Alt**: Default-WordPress-Titles, keine Meta-Descriptions.
**Neu**: `seo` ist Pflicht auf `servicePage` und `locationPage` (custom validation für `metaTitle` + `metaDescription`). `seoFields` warnt bei Title > 60 / Description > 160 Zeichen.

### 8. Cluster-Strategie nicht durchgezogen
**Alt**: Keine systematische interne Verlinkung.
**Neu**: `guidePage.relatedTransactional` Pflichtfeld. `servicePage.relatedLocations` und `locationPage.relatedServices` mit Min-Validierung.

### Pre-Publish Checklist (für jede neue Page im Studio)
- [ ] Hero ausgefüllt (eyebrow, headline, CTA)
- [ ] SEO-Felder: metaTitle (< 60), metaDescription (< 160), focusKeyword
- [ ] Bei Referenzen: Bild + min. 4 Galerie-Bilder + min. 3 Stats + Beschreibung
- [ ] Cluster-Verlinkung: relatedServices/relatedLocations gesetzt
- [ ] Ratgeber: relatedTransactional auf min. 1 Money-Page
