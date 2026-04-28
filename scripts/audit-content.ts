/**
 * Content-Audit: läuft gegen Sanity und prüft alle PUBLISHED Referenzen
 * auf Vollständigkeit. Verhindert die Hauptfehler der alten Seite:
 * - Objektseiten ohne Bild
 * - Objektseiten ohne Beschreibung
 * - Objektseiten ohne Stats
 *
 * Nutzung:
 *   npx tsx scripts/audit-content.ts          # Report
 *   npx tsx scripts/audit-content.ts --fail   # Exit 1 bei kritischen Lücken (CI-Gate)
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-28",
  useCdn: false,
  perspective: "published",
});

type Ref = {
  _id: string;
  title?: string;
  slug?: { current: string };
  image?: unknown;
  galleryCount?: number;
  hasDescription?: boolean;
  statsCount?: number;
  hasAddress?: boolean;
  seo?: { metaTitle?: string; metaDescription?: string };
};

const QUERY = `*[_type == "referencePage" && !(_id in path("drafts.**"))]{
  _id, title, slug, image,
  "galleryCount": count(gallery),
  "hasDescription": defined(description) && length(description) > 0,
  "statsCount": count([
    stats.wohneinheiten, stats.gewerbeeinheiten, stats.gesamtflaeche,
    stats.stellplaetze, stats.baujahr, stats.mieteinnahmen
  ][@ != null]),
  "hasAddress": defined(addressPrimary.street) && defined(addressPrimary.houseNumber) && defined(addressPrimary.zipCode),
  seo
}`;

async function main() {
  const refs = await client.fetch<Ref[]>(QUERY);
  const issues: { ref: Ref; problems: string[] }[] = [];

  for (const r of refs) {
    const problems: string[] = [];
    if (!r.image) problems.push("kein Hauptbild");
    if (!r.hasDescription) problems.push("keine Beschreibung");
    if (!r.hasAddress) problems.push("Adresse unvollständig");
    if ((r.statsCount ?? 0) < 3) problems.push(`nur ${r.statsCount ?? 0} Kennzahlen (min 3)`);
    if ((r.galleryCount ?? 0) < 4) problems.push(`nur ${r.galleryCount ?? 0} Galerie-Bilder (empf. 4+)`);
    if (!r.seo?.metaTitle) problems.push("Meta Title fehlt");
    if (!r.seo?.metaDescription) problems.push("Meta Description fehlt");
    if (problems.length) issues.push({ ref: r, problems });
  }

  console.log(`\n📋 Content-Audit: ${refs.length} Referenzen geprüft\n`);

  if (issues.length === 0) {
    console.log("✅ Alle Referenzen vollständig.\n");
    return;
  }

  for (const { ref, problems } of issues) {
    const url = ref.slug?.current ? `/referenzen/${ref.slug.current}/` : ref._id;
    console.log(`⚠ ${ref.title ?? "(ohne Titel)"}  ${url}`);
    problems.forEach((p) => console.log(`   - ${p}`));
  }

  console.log(`\n${issues.length} von ${refs.length} Referenzen mit Problemen.\n`);

  // CRITICAL: kein Bild ODER keine Beschreibung ODER keine Adresse → Build fail
  const critical = issues.filter(({ problems }) =>
    problems.some(
      (p) =>
        p.includes("kein Hauptbild") ||
        p.includes("keine Beschreibung") ||
        p.includes("Adresse unvollständig"),
    ),
  );

  if (process.argv.includes("--fail") && critical.length > 0) {
    console.error(`\n❌ ${critical.length} kritische Lücken — Build abgebrochen.`);
    console.error("   Behebe Bild/Beschreibung/Adresse oder unpublishe die Referenzen.\n");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Audit fehlgeschlagen:", err);
  process.exit(1);
});
