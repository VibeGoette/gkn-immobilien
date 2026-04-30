/**
 * MIGRATION: rename embedded object `_type` from `seoFields` to `seoMeta`
 *
 * Hintergrund: Sprint 2 Phase 2a, Naming-Konsistenz.
 * `seoFields` ist ein registrierter Object-Type, der in praktisch allen
 * Document-Schemas als `seo`-Feld eingebettet ist (plus `defaultSeo` auf
 * siteSettings). Ob Sanity beim Speichern ein `_type`-Discriminator-Feld
 * im JSON serialisiert, hängt vom Studio-Verhalten ab — defensives Skript:
 * findet jede Stelle, wo `seo._type == "seoFields"` oder
 * `defaultSeo._type == "seoFields"`, und patcht sie auf "seoMeta".
 *
 * Idempotent: zweimaliges Ausführen findet beim zweiten Lauf 0 Treffer.
 * Wenn das Studio `_type` ohnehin nicht serialisiert hat, ist das Skript
 * ein No-Op — schadet nicht.
 *
 * Setup + Run wie referenceObject-Migration. Reihenfolge: egal (orthogonal).
 *
 * Rollback: Sanity History oder Spiegellauf
 * (TO_TYPE/FROM_TYPE in den Konstanten tauschen).
 */

import "dotenv/config";
import { createClient } from "@sanity/client";

const FROM_TYPE = "seoFields";
const TO_TYPE = "seoMeta";

const dryRun = process.argv.includes("--dry-run");

const writeToken =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-28",
  token: writeToken,
  useCdn: false,
});

type Hit = {
  _id: string;
  seoMatches: boolean;
  defaultSeoMatches: boolean;
};

async function main() {
  if (!writeToken) {
    console.error(
      "❌ SANITY_API_WRITE_TOKEN (oder SANITY_WRITE_TOKEN) fehlt in .env.local",
    );
    process.exit(1);
  }

  console.log(
    `→ Migration: embedded _type ${FROM_TYPE} → ${TO_TYPE}${dryRun ? " (DRY-RUN)" : ""}`,
  );

  const hits = await client.fetch<Hit[]>(
    `*[seo._type == $from || defaultSeo._type == $from]{
      _id,
      "seoMatches": seo._type == $from,
      "defaultSeoMatches": defaultSeo._type == $from
    }`,
    { from: FROM_TYPE },
  );

  console.log(`  Gefunden: ${hits.length} Document(s) mit eingebettetem '${FROM_TYPE}'`);

  if (hits.length === 0) {
    console.log("  Nichts zu tun. Migration ist idempotent ✓");
    return;
  }

  if (dryRun) {
    hits.forEach((h) => {
      const paths = [
        h.seoMatches ? "seo._type" : null,
        h.defaultSeoMatches ? "defaultSeo._type" : null,
      ].filter(Boolean);
      console.log(`  [dry-run] würde patchen: ${h._id} → [${paths.join(", ")}]`);
    });
    return;
  }

  const tx = client.transaction();
  for (const h of hits) {
    const patch: Record<string, string> = {};
    if (h.seoMatches) patch["seo._type"] = TO_TYPE;
    if (h.defaultSeoMatches) patch["defaultSeo._type"] = TO_TYPE;
    tx.patch(h._id, { set: patch });
  }
  const result = await tx.commit({ visibility: "async" });
  console.log(`  ✓ ${result.results?.length ?? hits.length} Document(s) gepatcht`);
}

main().catch((err) => {
  console.error("❌ Migration fehlgeschlagen:", err);
  process.exit(1);
});
