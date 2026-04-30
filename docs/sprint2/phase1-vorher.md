# Sprint 2 / Phase 1 — Bestandsaufnahme (vorher)

Stand: vor Schema-Ergänzung.
Quelle: `sanity.config.ts` + `src/sanity/schemas/index.ts` + `src/sanity/structure.ts`.

## Registrierte Schemas

Reihenfolge wie in `src/sanity/schemas/index.ts`.

### Object-Types (reusable)

| Name | Datei | Zweck |
| --- | --- | --- |
| `seoFields` | `seoFields.ts` | SEO-Meta (entspricht SOLL-Item `seoMeta`) |
| `hero` | `hero.ts` | Hero-Block mit Eyebrow/Headline/Subline/CTAs/Image |
| `faqItem` | `sections.ts` | Einzelner FAQ-Eintrag |
| `faqSection` | `sections.ts` | FAQ-Sektion (FAQPage Schema.org) |
| `trustBar` | `sections.ts` | USP/Trust-Items inline |
| `processSection` | `sections.ts` | Prozess-Schritte inline |
| `richTextSection` | `sections.ts` | Rich-Text-Block für Pages |
| `ctaSection` | `sections.ts` | CTA-Section mit headline + 1 Button |
| `referenceShowcase` | `sections.ts` | Referenz-Showcase mit Refs auf `referencePage` |

`pageBuilder` (in `sections.ts`) ist **kein** registrierter Type, sondern ein wiederverwendbares Field-Definition-Object für Document-Schemas (`servicePage`, `locationPage`, `serviceLocationPage`, `homePage`).

### Document-Types

| Name | Datei | Singleton | Required-Felder | Notizen |
| --- | --- | --- | --- | --- |
| `siteSettings` | `siteSettings.ts` | ja | — (keine `validation.required` auf top-level) | Felder: title, tagline, logo, logoWhite, contact{phone,email,address}, legal{companyName,street,zipCode,city,vatId,registerNumber,registerCourt,professionalTitle,professionalChamber,professionalCountry,managingDirectors}, navigation[], footerNavigation[], defaultSeo:seoFields |
| `homePage` | `homePage.ts` | ja | — | Felder: hero, intro:block[], stats{experienceYears,experts,propertiesCount}, team{title,members[]→teamMember}, sections (pageBuilder), seo |
| `servicePage` | `servicePage.ts` | nein | title, slug, serviceType, seo (custom: metaTitle + metaDescription) | Felder: title, slug, serviceType (mfh/gewerbe/grundstueck/portfolio/hub), hero, sections, relatedLocations[] (warning min 1), seo |
| `locationPage` | `locationPage.ts` | nein | city, slug, seo (custom: metaTitle + metaDescription) | Felder: city, slug, geo:geopoint, hero, marketIntro:text, sections, relatedServices[] (warning min 1), seo |
| `serviceLocationPage` | `serviceLocationPage.ts` | nein | title, service (ref), location (ref), serviceSlug | Felder: title, service→servicePage, location→locationPage, serviceSlug, hero, sections, seo (NICHT required) |
| `referencePage` | `referencePage.ts` | nein | title, slug, city (ref), propertyType, addressPrimary{street,houseNumber,zipCode regex /^[0-9]{5}$/,cityName}, image (mit alt), description (block[]), stats (custom: ≥3 Werte) | Sehr strikt validiert. Felder zusätzlich: addressAdditional[], gallery (warning min 4), highlights[], measures, acquisitionDate, featured, order, seo |
| `guidePage` | `guidePage.ts` | nein | title, slug | Felder: title, slug, excerpt, publishedAt, image, body (block + image), faq:faqSection, relatedTransactional[] (warning min 1), seo |
| `blogPost` | `blogPost.ts` | nein | title, slug | Felder: title, slug, excerpt, publishedAt, author→teamMember, image, categories (fixed-list: marktanalyse/ankaeufe/presse/wissen), body, seo |
| `tool` | `tool.ts` | nein | title, slug, toolType | Lead-Magneten/Rechner-Konfig — extra zur SOLL-Liste |
| `teamMember` | `teamMember.ts` | nein | name | extra zur SOLL-Liste, von `homePage.team.members` und `blogPost.author` referenziert |

### Studio-Struktur

`structure.ts` registriert `siteSettings` und `homePage` als Singletons (via `SINGLETON_TYPES`-Set und `documentId`). `sanity.config.ts` filtert für Singletons die Actions `unpublish`, `delete`, `duplicate` raus und blockt sie aus `templates`.

## Gap-Analyse gegen SOLL-Liste

### Document-Types

| SOLL | Status | Notiz |
| --- | --- | --- |
| `homePage` (Singleton) | ✅ vorhanden | |
| `servicePage` | ✅ vorhanden | `assetType` heißt hier `serviceType` (+ extra Wert `hub`) |
| `locationPage` | ✅ vorhanden | |
| `serviceLocationPage` | ✅ vorhanden | `parentService` heißt `service`, `parentLocation` heißt `location` |
| `guidePage` | ✅ vorhanden | |
| `blogPost` | ✅ vorhanden | |
| `referenceObject` | ⚠ vorhanden unter Name `referencePage` | inhaltlich äquivalent + strikter validiert |
| `siteSettings` (Singleton) | ✅ vorhanden | |

### Object-Types

| SOLL | Status | Notiz |
| --- | --- | --- |
| `seoMeta` | ⚠ vorhanden unter Name `seoFields` | inhaltlich äquivalent + zusätzlich `focusKeyword` |
| `faqItem` | ✅ vorhanden | |
| `ctaBlock` | ❌ **fehlt** | `ctaSection` deckt nur 1 Button ab, ohne `secondary`-CTA |
| `uspItem` | ❌ **fehlt** | nur inline in `trustBar.items` definiert, nicht als reusable Object-Type |
| `cityStats` | ❌ **fehlt** | nicht vorhanden — `homePage.stats` ist anderes Schema |
| `portableTextStandard` | ❌ **fehlt** | Block-Arrays werden inline (`{type:"block"}, {type:"image"}`) pro Schema definiert, kein zentraler Standard-Type |

### Pflichtfeld-Diffs pro Document-Type

Per Guardrail werden bestehende Schemas **nicht** eigenmächtig refactored. Diffs sind dokumentiert, Umsetzung erfolgt — falls erforderlich — in einem späteren Sprint-Schritt nach Rückfrage.

Allgemeine SOLL-Pflicht (für alle Pages außer `siteSettings`): `title`, `slug`, `seo`, `body` (optional).

| Document | Diff zur SOLL |
| --- | --- |
| `servicePage` | kein top-level `body`-Feld (Inhalt nur über `sections`/pageBuilder); kein top-level `usps`, `process`, `faqs`, `cta` (alles via pageBuilder); `assetType` = `serviceType` mit zusätzlichem Wert `hub` |
| `locationPage` | kein `title` (statt dessen `city` als impliziter Titel); kein `region`-Feld (Default `Ruhrgebiet` fehlt); kein top-level `body`, `cityStats`, `districts`, `faqs`, `cta` (z.T. via pageBuilder/`marketIntro`) |
| `serviceLocationPage` | `parentService`→`service`, `parentLocation`→`location`; kein `localContext`-Feld; kein top-level `body`, `faqs`, `cta`; `seo` nicht als required markiert |
| `guidePage` | kein `hero`-Object (nur `title`, `excerpt`, `image`); kein `tableOfContents`-boolean; `relatedGuides` fehlt (existiert nur `relatedTransactional`); kein top-level `cta` |
| `blogPost` | `publishedAt` nicht required; kein `updatedAt`; `excerpt` ohne max-200-Validation, nicht required; `image` ohne required `alt`-Feld; `tags` fehlt (existiert `categories` mit fixed list); kein `relatedPosts` mit max 3; kein `faqs` |
| `referencePage` (=referenceObject) | `units` als eigenes Object fehlt (vorhanden via `stats.wohneinheiten` + `stats.gewerbeeinheiten`); `garages` separat fehlt (vorhanden nur als String-Mix in `stats.stellplaetze`); `parkingSpots` ist string statt number |
| `siteSettings` | `legalName` fehlt separat; `country` fehlt; `openingHours` fehlt; `socialLinks` fehlt; `schemaOrg`-Object fehlt (LocalBusiness JSON-LD im Code, aber kein Studio-Feld) |

### Extra-Schemas (nicht in SOLL-Liste, vorhanden)

- `tool` — Rechner/Lead-Magneten (Sprint-1-Anforderung)
- `teamMember` — Team-Bios mit E-E-A-T (Sprint-1-Anforderung)
- `hero` — wiederverwendbarer Hero-Object-Type
- `trustBar`, `processSection`, `richTextSection`, `ctaSection`, `referenceShowcase` — pageBuilder-Sections

## Befund

Alle SOLL-Document-Types sind vorhanden, teils unter abweichendem Namen (`referencePage` ↔ `referenceObject`, `seoFields` ↔ `seoMeta`).

Konkret **fehlen** als reusable Object-Types: `ctaBlock`, `uspItem`, `cityStats`, `portableTextStandard`. Diese werden in Phase 1 angelegt.

Die in der Gap-Tabelle dokumentierten Pflichtfeld-Diffs der bestehenden Document-Types werden **nicht** automatisch korrigiert (Guardrail).
