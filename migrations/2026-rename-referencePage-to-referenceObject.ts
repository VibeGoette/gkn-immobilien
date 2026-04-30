/**
 * MIGRATION: rename document `_type` from `referencePage` to `referenceObject`
 *
 * Hintergrund: Sprint 2 Phase 2a, Naming-Konsistenz.
 * Das Schema wurde umbenannt (src/sanity/schemas/referenceObject.ts);
 * dieses Skript wandelt bestehende Documents in der Sanity-Datenbank mit.
 *
 * Idempotent: zweimaliges Ausführen findet beim zweiten Lauf 0 Dokumente.
 *
 * Setup:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   - SANITY_WRITE_TOKEN (Editor-Token) in .env.local
 *
 * Run (Trockenlauf):
 *   npx tsx migrations/2026-rename-referencePage-to-referenceObject.ts --dry-run
 *
 * Run (live):
 *   npx tsx migrations/2026-rename-referencePage-to-referenceObject.ts
 *
 * Rollback:
 *   - Sanity History → einzelne Dokumente per Hand restoren
 *   - oder Skript spiegelverkehrt ausführen (findet Type 'referenceObject',
 *     setzt zurück auf 'referencePage')
 *
 * WICHTIG: Vor dem Live-Lauf ein Sanity-Backup ziehen
 *   (`npx sanity dataset export production backup-pre-rename.tar.gz`).
 */

import "dotenv/config";
import { createClient } from "@sanity/client";

const FROM_TYPE = "referencePage";
const TO_TYPE = "referenceObject";

const dryRun = process.argv.includes("--dry-run");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-28",
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("❌ SANITY_WRITE_TOKEN fehlt in .env.local");
    process.exit(1);
  }

  console.log(
    `→ Migration: _type ${FROM_TYPE} → ${TO_TYPE}${dryRun ? " (DRY-RUN)" : ""}`,
  );

  const docs = await client.fetch<{ _id: string; _rev: string }[]>(
    `*[_type == $from]{ _id, _rev }`,
    { from: FROM_TYPE },
  );

  console.log(`  Gefunden: ${docs.length} Document(s) mit _type='${FROM_TYPE}'`);

  if (docs.length === 0) {
    console.log("  Nichts zu tun. Migration ist idempotent ✓");
    return;
  }

  if (dryRun) {
    docs.forEach((d) => console.log(`  [dry-run] würde patchen: ${d._id}`));
    return;
  }

  // Sanity erlaubt _type-Patch direkt; Referenzen auf diese Docs (per _ref)
  // sind type-agnostisch und bleiben gültig.
  const tx = client.transaction();
  for (const d of docs) {
    tx.patch(d._id, { set: { _type: TO_TYPE } });
  }
  const result = await tx.commit({ visibility: "async" });
  console.log(`  ✓ ${result.results?.length ?? docs.length} Document(s) gepatcht`);
}

main().catch((err) => {
  console.error("❌ Migration fehlgeschlagen:", err);
  process.exit(1);
});
