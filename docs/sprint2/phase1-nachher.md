# Sprint 2 / Phase 1 — Nachher

Stand: nach Schema-Ergänzung in dieser Phase.

## Diff zu Phase-1-vorher

### Neu angelegt (Object-Types)

| Name | Datei | Begründung |
| --- | --- | --- |
| `ctaBlock` | `src/sanity/schemas/ctaBlock.ts` | SOLL-Item — bisheriges `ctaSection` deckt nur 1 Button ab, hier primary + secondary CTA mit getrennten Labels/Hrefs |
| `uspItem` | `src/sanity/schemas/uspItem.ts` | SOLL-Item — vorher nur inline in `trustBar.items`, jetzt reusable als Array-Member auf Pages |
| `cityStats` | `src/sanity/schemas/cityStats.ts` | SOLL-Item — Lokale Kennzahl mit `label`/`value`/`footnote` (Quelle/Stand) |
| `portableTextStandard` | `src/sanity/schemas/portableTextStandard.ts` | SOLL-Item — zentraler Body-Type mit definierten Styles (normal/h2/h3/h4/blockquote), Marks (strong/em/underline/code + link/internalLink), Listen (bullet/number), Image-Embed (alt required, caption) und Callout-Block (info/note/warning/success) |

### Modifiziert

- `src/sanity/schemas/index.ts` — die 4 neuen Object-Types in der Object-Section registriert (Reihenfolge nach den bestehenden Sections-Objekten).

### Nicht geändert (mit Begründung)

Per Guardrail: bestehende Schemas mit Pflichtfeld-Diff zur SOLL-Liste werden **nicht** eigenmächtig refactored. Die Diffs sind in `phase1-vorher.md` Abschnitt „Pflichtfeld-Diffs" dokumentiert. Konkret betrifft das:

- `servicePage` — kein top-level `body`, `usps`, `process`, `faqs`, `cta` (Inhalt via pageBuilder/Sections); `assetType` heißt `serviceType` mit zusätzlichem Wert `hub`.
- `locationPage` — kein `title`/`region`/`districts`-Feld, kein top-level `body`/`cityStats`/`faqs`/`cta`.
- `serviceLocationPage` — `parentService`/`parentLocation` heißen `service`/`location`; kein `localContext`; `seo` nicht required.
- `guidePage` — kein `hero`-Object, kein `tableOfContents`, kein `relatedGuides`, kein top-level `cta`.
- `blogPost` — `publishedAt`/`excerpt` nicht required, kein `updatedAt`, kein `tags`/`relatedPosts`/`faqs`, `image.alt` nicht required.
- `referencePage` (= `referenceObject`) — `units`/`garages`/`parkingSpots(number)` als getrennte Felder fehlen (vorhanden via `stats`-Object).
- `siteSettings` — `legalName`/`country`/`openingHours`/`socialLinks`/`schemaOrg` fehlen.

Empfehlung für nachfolgende Phase: einzelne Refactor-Tickets pro Document-Type, mit explizitem Sign-off — viele dieser Diffs sind funktional über das `pageBuilder`-Pattern (Sections-Array) bereits abgedeckt, das ist eine andere SEO-Architektur-Entscheidung als die SOLL-Liste vorschlägt.

### Schemas mit Naming-Diff zur SOLL-Liste (bewusst belassen)

| SOLL | Repo | Begründung |
| --- | --- | --- |
| `seoMeta` | `seoFields` | inhaltlich äquivalent + zusätzlich `focusKeyword`. Umbenennen würde alle Document-Schemas und Frontend-Queries refactoren (Guardrail). |
| `referenceObject` | `referencePage` | inhaltlich äquivalent + strikter validiert (Audit-Lessons aus Sprint 1). Umbenennen würde alle Refs (`referenceShowcase`, `homePage.team`, Frontend-Queries, Sitemap, Seed-Skript) brechen. |

## Resultierende Schema-Liste (vollständig)

### Object-Types (registriert in `src/sanity/schemas/index.ts`)

1. `seoFields` *(= SOLL `seoMeta`)*
2. `hero`
3. `faqItem`
4. `faqSection`
5. `trustBar`
6. `processSection`
7. `richTextSection`
8. `ctaSection`
9. `referenceShowcase`
10. **`ctaBlock`** *(neu)*
11. **`uspItem`** *(neu)*
12. **`cityStats`** *(neu)*
13. **`portableTextStandard`** *(neu)*

### Document-Types

Singletons: `siteSettings`, `homePage`.
Pages: `servicePage`, `locationPage`, `serviceLocationPage`, `referencePage` (=SOLL `referenceObject`), `guidePage`, `blogPost`.
Andere: `tool`, `teamMember`.

## Validierung

| Schritt | Ergebnis | Kommentar |
| --- | --- | --- |
| `npm run typecheck` | ✅ grün | tsc --noEmit ohne Fehler |
| `npm run build` | ✅ grün | Next 16 Build, alle Routes prerendered (8 statische + 5 SSG) |
| `npm run lint` | ⚠ pre-existing broken | `next lint` wurde in Next 16 entfernt; kein `eslint.config.js` im Repo. Bestand schon vor dieser Phase auf `4b0a701` (head of main). Fix gehört in eigenes Tooling-Ticket (eslint v9 flat config). |
| `npm run sanity:typegen` | ⚠ blockiert | `sanity schema extract` validiert Project-ID gegen API; `NEXT_PUBLIC_SANITY_PROJECT_ID` ist `placeholder`, weil Sanity-Projekt noch nicht via Vercel Marketplace provisioniert. CLAUDE.md TODO „Sanity-Projekt via Vercel Marketplace verbinden". Sobald Project-ID gesetzt ist, generiert sich `sanity.types.ts` automatisch. |

## Studio öffnet ohne Errors

**Nicht lokal verifizierbar** in dieser Phase, weil Studio ohne echtes Sanity-Projekt nicht ausführbar ist (gleicher Grund wie typegen). Die Schema-Definitionen sind aber TS-validiert (`typecheck` grün) und der Next-Build (der Studio embedded mountet) läuft durch — dies ist die stärkste lokal mögliche Aussage.

Nach Vercel-Marketplace-Setup: `npm run dev` → `http://localhost:3000/studio` → erwartet keine neuen Fehler, da nur additive Object-Type-Einträge.

## Vercel-Preview-URL

**Nicht in dieser Phase**. Sanity ist noch nicht provisioniert, deshalb wäre der Preview-Build genauso wie der lokale Build (statische Startseite plus Sanity-Calls schlagen zur Laufzeit fehl, falls Sanity-getriebene Pages besucht werden). Preview-URL macht erst Sinn nach dem CLAUDE.md-TODO „Sanity-Projekt via Vercel Marketplace verbinden".

## Offene Punkte für Nachfolge-Phasen

1. Pflichtfeld-Refactor pro Document-Type — separate, abgesegnete Tickets (nicht Phase 1).
2. Sanity-Projekt provisionieren (CLAUDE.md TODO) → entsperrt `sanity:typegen` und Studio-Öffnung.
3. ESLint v9 flat config einrichten oder `lint`-Script entfernen — pre-existing.
4. `referencePage` ↔ `referenceObject` Naming-Entscheidung final treffen (Empfehlung: bei `referencePage` bleiben, da strikter validiert + alle Refs daran hängen).
