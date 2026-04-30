# Sanity Migrations

Skripte, die bestehende Documents im Sanity-Datastore an Schema-Änderungen
anpassen. Werden manuell ausgeführt, sind idempotent und unterstützen einen
`--dry-run`-Modus.

## Voraussetzungen

In `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<aus Vercel-Marketplace>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=<Editor-Token aus Sanity → API → Tokens>
```

## Vor jedem Live-Lauf

1. Backup ziehen:
   ```
   npx sanity dataset export production backup-pre-migration.tar.gz
   ```
2. Trockenlauf:
   ```
   npx tsx migrations/<file>.ts --dry-run
   ```
3. Live-Lauf, sobald Output plausibel:
   ```
   npx tsx migrations/<file>.ts
   ```

## Reihenfolge (für Phase 2b)

Die beiden aktuellen Migrations sind **orthogonal** — sie patchen unabhängige
Pfade und können in beliebiger Reihenfolge laufen:

1. `2026-rename-referencePage-to-referenceObject.ts`
   - Findet alle Documents mit `_type == "referencePage"` und setzt
     `_type = "referenceObject"`.
   - Referenzen (`_ref`) auf diese Documents bleiben gültig — Sanity-Refs sind
     type-agnostisch.
2. `2026-rename-seoFields-to-seoMeta.ts`
   - Findet alle Documents mit eingebettetem `seo._type == "seoFields"` oder
     `defaultSeo._type == "seoFields"` und patcht den Discriminator auf
     `seoMeta`.
   - Wenn das Studio den `_type`-Discriminator beim Speichern nie serialisiert
     hat, ist das Skript ein No-Op (kein Schaden).

## Rollback

- **Bevorzugt**: einzelne Documents per Sanity History (Studio → Document
  → Inspect → Restore) zurücksetzen.
- **Bulk-Rollback**: das Migrations-Skript spiegelverkehrt ausführen — die
  Konstanten `FROM_TYPE` / `TO_TYPE` am Datei-Anfang tauschen, dann erneut
  laufen lassen. Vorher unbedingt das pre-migration Backup zur Hand haben.

## Hinweis

Diese Migrations werden **nicht in Phase 2a** ausgeführt. Sie laufen in
Phase 2b gegen das dann provisionierte Sanity-Projekt. Aktuell zeigt
`NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder` — gegen den fehlt jeder
Datastore.
