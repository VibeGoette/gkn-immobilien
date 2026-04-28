import { defineType, defineField } from "sanity";

/**
 * Interaktive Tools / Rechner / Lead-Magneten.
 * Stellt Konfiguration + Texte fürs Frontend bereit.
 * Die eigentliche Berechnungslogik liegt in React-Komponenten,
 * dieses Schema liefert Inhalte (Headline, FAQ, CTA, Disclaimer, Faktoren).
 */
export const tool = defineType({
  name: "tool",
  title: "Tool / Rechner / Lead-Magnet",
  type: "document",
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "config", title: "Konfiguration" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titel (intern)",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "toolType",
      title: "Tool-Typ",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Ertragswert-Schnellrechner (MFH)", value: "ertragswert" },
          { title: "Verkaufskosten-Vergleich (Makler vs GKN)", value: "kostenvergleich" },
          { title: "Spekulationssteuer-Check", value: "spekusteuer" },
          { title: "Wertcheck-Formular (Lead-Magnet)", value: "wertcheck" },
          { title: "Diskrete Erstanfrage (Formular)", value: "diskret" },
          { title: "Checkliste-Download (PDF)", value: "checkliste" },
          { title: "Marktbericht-Download (PDF)", value: "marktbericht" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "hero", title: "Hero", type: "hero", group: "content" }),
    defineField({
      name: "explanation",
      title: "Erklärung / Wie funktioniert es?",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ctaText",
      title: "CTA nach Berechnung / Submission",
      type: "string",
      group: "content",
      initialValue: "GKN macht Ihnen ein konkretes Angebot — kostenlos und unverbindlich.",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA-Button Label",
      type: "string",
      group: "content",
      initialValue: "Jetzt Angebot anfragen",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA-Link",
      type: "string",
      group: "content",
      initialValue: "/kontakt",
    }),
    defineField({
      name: "disclaimer",
      title: "Disclaimer (z.B. bei Speku-Check)",
      type: "text",
      rows: 3,
      group: "content",
      description: "Wichtig bei steuer- oder rechtsbezogenen Tools.",
    }),
    // Nur für Ertragswert-Rechner: konfigurierbare Faktoren
    defineField({
      name: "ertragswertConfig",
      title: "Ertragswert-Faktoren (nur für 'ertragswert')",
      type: "object",
      group: "config",
      hidden: ({ document }) => document?.toolType !== "ertragswert",
      fields: [
        {
          name: "factors",
          title: "Faktoren je Lage/Stadt",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label (z.B. 'Bochum mittel')", type: "string" },
                { name: "factorMin", title: "Faktor min", type: "number" },
                { name: "factorMax", title: "Faktor max", type: "number" },
              ],
            },
          ],
        },
        {
          name: "conditionDeductions",
          title: "Zustandsabzüge (Prozent)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Zustand", type: "string" },
                { name: "deductionPercent", title: "Abzug %", type: "number" },
              ],
            },
          ],
        },
        {
          name: "factorsValidUntil",
          title: "Faktoren gültig bis (Quartal)",
          type: "string",
          description: "z.B. 'Q1 2026' — wird im Tool transparent angezeigt.",
        },
      ],
    }),
    // Lead-Magneten mit PDF
    defineField({
      name: "downloadFile",
      title: "Download-Datei (PDF)",
      type: "file",
      group: "config",
      options: { accept: "application/pdf" },
      hidden: ({ document }) =>
        !["checkliste", "marktbericht"].includes(document?.toolType as string),
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "faqSection",
      group: "content",
    }),
    defineField({
      name: "relatedTransactional",
      title: "Verlinkte Money-Pages",
      type: "array",
      group: "content",
      of: [
        {
          type: "reference",
          to: [
            { type: "servicePage" },
            { type: "locationPage" },
            { type: "serviceLocationPage" },
          ],
        },
      ],
      validation: (r) => r.min(1).warning("Min. 1 transaktionale Seite verlinken."),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields", group: "seo" }),
  ],
  preview: {
    select: { title: "title", subtitle: "toolType", media: "hero.image" },
  },
});
