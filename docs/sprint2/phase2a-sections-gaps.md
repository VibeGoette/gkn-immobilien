# Sprint 2 / Phase 2a — Sections-Gaps für Phase 2c

> **Hinweis zur Quelle:** Der Aufgaben-Prompt der Sub-Phase 2a brach nach dem
> SOLL-Block für **Service-Pages** mid-sentence ab
> (`localCrossLinkSection (Links`). Die SOLL-Listen für **Location-,
> ServiceLocation- und Guide-Pages** sind hier mit defensiven Defaults
> ausgefüllt und in der jeweiligen Tabelle als „⚠ braucht Bestätigung"
> markiert. Diese Defaults orientieren sich an der Cluster-Pillar-SEO-Strategie
> aus `CLAUDE.md`.

Phase 2c soll fehlende Sections **anlegen** — diese Datei sammelt nur den Diff.

## Service-Pages (MFH, Gewerbe, Grundstücke, Portfolios)

SOLL aus Prompt (vor Truncation):

1. `heroSection` — heading, subline, primaryCta, image
2. `uspGridSection` — array of `uspItem`, 3–6
3. `processSection` — array of step: number, title, body, duration
4. `portableTextSection` — rich content body
5. `faqSection` — array of `faqItem`, mit FAQPage-JSON-LD
6. `ctaSection` — mit `ctaBlock`
7. `localCrossLinkSection` — *(Truncated — Annahme: Links zu Stadt-/Kombi-Seiten für die Service-Cluster-Strategie)* ⚠ braucht Bestätigung

| SOLL | Status (heute) | Diff |
| --- | --- | --- |
| `heroSection` | ⚠ vorhanden als top-level `hero`-Object **außerhalb** des pageBuilders | Architektur-Entscheidung: Hero als top-level Field belassen ODER in pageBuilder als erstes Element ziehen? Empfehlung: top-level lassen (alle Pages haben Hero, semantischer Top-Slot). |
| `uspGridSection` | ❌ fehlt | `trustBar` ist die heutige Annäherung mit inline-Items — soll auf `uspItem`-Refs umgestellt werden. Empfehlung: neuen Section-Type `uspGridSection` mit `array of uspItem` (3–6) anlegen, `trustBar` deprecation. |
| `processSection` | ⚠ vorhanden — aber inline-Steps (`number`, `title`, `description`); SOLL hat zusätzlich `body` (PortableText) und `duration` | Erweitern: `description` → `body` (portableTextStandard), neues Feld `duration` (string, z. B. „2–3 Werktage"). |
| `portableTextSection` | ⚠ vorhanden als `richTextSection` | Naming auf `portableTextSection` vereinheitlichen + Body-Type von ad-hoc auf `portableTextStandard` umstellen. |
| `faqSection` | ✅ vorhanden | FAQPage-JSON-LD-Rendering muss im Frontend-Renderer verdrahtet werden (Phase 2c-Frontend, nicht Schema). |
| `ctaSection` | ⚠ vorhanden — eigene Felder (headline/subline/cta), nicht der neue `ctaBlock` Object-Type | Refactor: `ctaSection` → wrappt `ctaBlock` (gibt secondary-CTA frei). |
| `localCrossLinkSection` | ❌ fehlt | Empfehlung Annahme-basiert: Section mit Title + array of Refs auf `locationPage`/`serviceLocationPage`. ⚠ braucht Bestätigung |

## Location-Pages (Bochum, Dortmund, Essen, weitere)

SOLL aus Prompt: **Truncated** ⚠ braucht Bestätigung. Defensive Liste:

| SOLL (vermutet) | Status (heute) | Diff |
| --- | --- | --- |
| `heroSection` | top-level `hero` | wie Service-Pages |
| `cityStatsSection` (array of `cityStats`, 3–6) | ❌ fehlt | Object-Type `cityStats` existiert seit Phase 1, Section-Wrapper fehlt. |
| `districtsSection` (array of object: name, body) | ❌ fehlt | Stadtteile/Quartiere — high-Intent Local-SEO. |
| `processSection` | wie Service-Pages | aus Service übernehmen |
| `portableTextSection` | wie Service-Pages | aus Service übernehmen |
| `faqSection` | ✅ | |
| `ctaSection` | ⚠ Refactor | wie Service-Pages |
| `serviceCrossLinkSection` (Refs auf Service-Pages für die Stadt) | ❌ fehlt | Pendant zu `localCrossLinkSection` |
| `referenceShowcase` (gefiltert auf Stadt) | ✅ vorhanden | filter-Verdrahtung im Frontend-Renderer |

## ServiceLocation-Pages (Combo: MFH+Bochum etc.)

SOLL aus Prompt: **Truncated** ⚠ braucht Bestätigung. Defensive Liste:

| SOLL (vermutet) | Status (heute) | Diff |
| --- | --- | --- |
| `heroSection` | top-level `hero` | |
| `localContextSection` (portableTextStandard) | ❌ fehlt | „Was Sie in <Stadt> für <Service> wissen müssen" — Hauptcontent. |
| `uspGridSection` | wie Service | aus Service erben |
| `processSection` | wie Service | |
| `faqSection` | ✅ | |
| `ctaSection` | ⚠ | |
| `referenceShowcase` (gefiltert auf Stadt + propertyType) | ✅ vorhanden | Filter im Renderer |
| `breadcrumbSection` *(falls breadcrumb explizit als Schema gewünscht)* | ❌ fehlt | ⚠ braucht Bestätigung |

## Guide-Pages (Ratgeber)

SOLL aus Prompt: **Truncated** ⚠ braucht Bestätigung. Defensive Liste:

| SOLL (vermutet) | Status (heute) | Diff |
| --- | --- | --- |
| `heroSection` | ❌ fehlt (`guidePage` hat `title` + `excerpt` + `image`, kein hero-Object) | Konsistenz mit Service/Location: top-level `hero` ergänzen. |
| `tableOfContentsSection` (boolean toggle) | ❌ fehlt | TOC-Auto-Generation aus h2/h3 im Body. |
| `portableTextSection` | flach als `body` (block[] + image) | Refactor auf pageBuilder + portableTextStandard, sodass Guides Sections mischen können. **Architektur-Diff**: `guidePage` ist heute kein pageBuilder-Document. |
| `faqSection` | ✅ vorhanden als `faq`-Feld | in pageBuilder migrieren statt eigenes Top-Level-Feld? ⚠ braucht Bestätigung |
| `ctaSection` | ❌ fehlt | hinzufügen |
| `relatedGuidesSection` (Refs auf weitere `guidePage`) | ❌ fehlt | Cluster-Verlinkung horizontal. |
| `relatedTransactionalSection` | ✅ vorhanden als top-level `relatedTransactional` | beibehalten, ggf. in pageBuilder ziehen — ⚠ braucht Bestätigung |

## Zusammenfassung Phase 2c

**Anzulegende Section-Object-Types** (Schema-Arbeit, nicht in 2a):

1. `uspGridSection` (Refs auf `uspItem`) — neu
2. `processSection` (V2: `body`+`duration`) — V1 deprecation
3. `portableTextSection` (V2: nutzt `portableTextStandard`) — Rename + Body-Refactor
4. `ctaSection` (V2: nutzt `ctaBlock`) — Refactor
5. `localCrossLinkSection` — neu (⚠ Spec)
6. `cityStatsSection` — neu
7. `districtsSection` — neu
8. `serviceCrossLinkSection` — neu (⚠ Spec)
9. `localContextSection` — neu (⚠ Spec)
10. `tableOfContentsSection` — neu (⚠ Spec)
11. `relatedGuidesSection` — neu

**Architektur-Refactors in Phase 2c**:

- `guidePage` auf pageBuilder umstellen (Body migrieren)
- pageBuilder-Pool pro Doc-Type whitelisten (heute: einheitlich → künftig: doc-spezifisch)
- Frontend-Renderer-Komponente bauen (heute: kein Renderer existiert)

**Offene Fragen vor Phase 2c-Start**:

- Vollständige SOLL-Liste für Location/ServiceLocation/Guide bestätigen
  (Truncation im Prompt).
- `localCrossLinkSection`-Felder spezifizieren.
- `heroSection` als pageBuilder-Member oder weiterhin top-level `hero`?
- `relatedTransactional` in pageBuilder migrieren oder top-level lassen?
