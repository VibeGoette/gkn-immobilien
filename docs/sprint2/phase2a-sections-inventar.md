# Sprint 2 / Phase 2a — Sections-Inventar

Stand: nach Renames (`seoFields → seoMeta`, `referencePage → referenceObject`)
und blogPost-Erweiterung. Architektur-Constraint: PageBuilder-Pattern bleibt
für Service-/Location-/ServiceLocation-/Guide-Pages erhalten — keine flachen
Top-Level-Felder wie `usps[]`/`process[]`/`faqs[]`/`cta`.

## Existierende pageBuilder-Sections

Quelle: `src/sanity/schemas/sections.ts`.

| Name | Typ | Felder | Verwendet in Doc-Type | Frontend-Component |
| --- | --- | --- | --- | --- |
| `faqItem` | object | `question` (string, req), `answer` (block[], req) | `faqSection.items[]` | — (Sub-Type) |
| `faqSection` | object | `title` (string, default "Häufige Fragen"), `items` (faqItem[], min 3 warning) | pageBuilder | **fehlt** (statischer `Faq.tsx` — homepage only, nicht Sanity-driven) |
| `trustBar` | object | `title` (string), `items[]` (inline object: `label`, `value?`, `description`) | pageBuilder | **fehlt** (statischer `Advantages.tsx`) |
| `processSection` | object | `title` (string, default "So läuft der Verkauf ab"), `steps[]` (inline object: `number`, `title`, `description`) | pageBuilder | **fehlt** (statischer `Process.tsx`) |
| `richTextSection` | object | `title` (string), `body` (block[] + image) | pageBuilder | **fehlt** |
| `ctaSection` | object | `headline` (string), `subline` (text), `cta` (inline object: `label`, `href`) | pageBuilder | **fehlt** (statischer `Faq.tsx > CtaStrip`) |
| `referenceShowcase` | object | `title` (string, default "Unsere Auswahl"), `references[]` (Refs auf `referenceObject`), `showAll` (boolean) | pageBuilder | **fehlt** (statischer `Portfolio.tsx`) |

`pageBuilder` selbst ist **kein** registrierter Sanity-Type, sondern ein
exportiertes Field-Definition-Object aus `sections.ts` (Z. 140) — als
Array-Field mit definiertem `of`-Pool. Wird per
`defineField(pageBuilder as never)` in Documents eingehängt.

## Wo wird pageBuilder verwendet (Doc-Schemas)

Quelle: `grep -n "pageBuilder" src/sanity/schemas/*.ts`.

Alle vier akzeptieren **denselben** Section-Pool (kein doc-spezifisches
Whitelisting):

```
[trustBar, processSection, richTextSection, faqSection, ctaSection, referenceShowcase]
```

| Doc-Type | Hat pageBuilder | Field-Name im Schema |
| --- | --- | --- |
| `homePage` | ✅ | `sections` |
| `servicePage` | ✅ | `sections` |
| `locationPage` | ✅ | `sections` |
| `serviceLocationPage` | ✅ | `sections` |
| `guidePage` | ❌ | hat stattdessen `body` (block[] + image), `faq` (faqSection), `relatedTransactional[]` |
| `blogPost` | ❌ | hat nur `body` (block[] + image) |
| `referenceObject` | ❌ | hat nur `description` (block[]) + `measures` (block[]) |

`guidePage` und `blogPost` arbeiten heute mit einem flachen `body` statt
mit pageBuilder-Sections — das **widerspricht der Architektur-Vorgabe**, dass
PageBuilder-Pattern für `guidePage` der Soll ist (siehe Phase 2c-Gap).

## Statische Frontend-Sections (homepage only)

Quelle: `src/components/sections/`. Diese Komponenten sind **statisch** befüllt
(direkt aus dem Design-HTML), **nicht Sanity-driven**, und werden ausschließlich
in `app/(site)/page.tsx` gerendert:

| Datei | Renderfunktion | Verwendet in |
| --- | --- | --- |
| `Hero.tsx` | Hero-Section (statisch) | `app/(site)/page.tsx` |
| `About.tsx` | About-Block | dito |
| `Advantages.tsx` | USP-Grid (statisch) | dito |
| `Ankaufsprofil.tsx` | Ankaufsprofil-Block | dito |
| `Process.tsx` | Prozess-Schritte (statisch) | dito |
| `Region.tsx` + `RegionMap.tsx` | Region/Map | dito |
| `Team.tsx` | Team (statisch) | dito |
| `Portfolio.tsx` | Portfolio-Showcase (statisch, Adressen hardcoded) | dito |
| `Faq.tsx` (+ `CtaStrip`) | FAQ + CTA (statisch) | dito |

Header/Footer/UtilityBar liegen in `src/components/layout/` und werden
ausschließlich von `app/(site)/layout.tsx` gerendert.

## Frontend-Mapping (Sanity-Sections → React-Components)

**Status: nicht vorhanden.**

Es existiert **kein zentraler Renderer** wie `components/PageBuilder.tsx` oder
`components/SectionRenderer.tsx`. Die Sanity-Pages
(`app/(site)/[serviceSlug]/page.tsx`, `[serviceSlug]/[city]/page.tsx`,
`immobilienankauf/[city]/page.tsx`) fetchen `sections` per groq, rendern den
Array aber **nicht** — heute erscheint nur `<h1>{hero.headline}</h1>` als
Placeholder.

Beispiel `app/(site)/[serviceSlug]/page.tsx`:

```ts
const QUERY = `*[_type == "servicePage" && slug.current == $slug][0]{
  _id, title, serviceType, hero, sections, seo, ...
}`;
// sections wird gefetcht, aber:
return <article>...<h1>{data.hero?.headline ?? data.title}</h1>...</article>;
```

Konsequenz: Der Sprung von "Sanity-Sections existieren als Schema" zu
"Frontend rendert sie" steht noch aus. Das ist der Hauptbestandteil von
Phase 2c (gemeinsam mit Seed).

## Inventar-Befund

1. **Schema-seitig** existiert ein PageBuilder-Pool mit 6 Sections (FAQ,
   TrustBar, Process, RichText, CTA, ReferenceShowcase) — uniform für alle
   vier dynamischen Pages.
2. **Frontend-seitig** rendert kein einziger Renderer dieses Schema —
   stattdessen gibt es 9 statische Hardcode-Sections für die Startseite und
   Placeholder-Pages für alle anderen Routes.
3. **Naming-Diff** zur SOLL-Liste der nächsten Phase: aktuelle Section-Namen
   sind generisch (`trustBar`, `ctaSection`); SOLL-Namen sind explizit
   (`uspGridSection`, `localCrossLinkSection` u. a.). Detail in
   `phase2a-sections-gaps.md`.
4. **Strukturlücke**: `guidePage` und `blogPost` haben keinen pageBuilder —
   bei `guidePage` ist das ein Architektur-Diff zur SOLL-Vorgabe.
