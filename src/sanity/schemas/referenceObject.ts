import { defineType, defineField } from "sanity";

/**
 * Bestandsobjekt im GKN-Portfolio (Referenz-Detailseite).
 *
 * Naming-Hinweis: `referenceObject` ist semantisch ('Bestandsobjekt'),
 * nicht im Sanity-Sinn — dies ist trotz des Namens ein DOCUMENT-Type,
 * kein Object-Type. URL ist /referenzen/<slug>.
 *
 * STRIKTE VALIDIERUNG — verhindert die Hauptfehler der alten Seite:
 * - Leere Objektseiten (Titel ohne Bild/Beschreibung)
 * - Inkonsistente Adressformate ("Südring 15 & Neustraße 15" vs "& Neustraße 1")
 * - Schreibfehler in Adressen ("Humboldstraße" statt "Humboldtstraße")
 * Lösung: strukturierte Adressfelder + Pflicht für Bild, Beschreibung, mind. 3 Stats.
 */
export const referenceObject = defineType({
  name: "referenceObject",
  title: "Bestandsobjekt (Referenz)",
  type: "document",
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "address", title: "Adresse" },
    { name: "stats", title: "Kennzahlen" },
    { name: "media", title: "Medien" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titel (intern, z.B. 'MFH Südring 15')",
      type: "string",
      group: "content",
      description: "Der öffentliche Titel wird aus der Adresse generiert.",
      validation: (r) => r.required().min(3),
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
      name: "city",
      title: "Stadt (Referenz auf locationPage)",
      type: "reference",
      group: "address",
      to: [{ type: "locationPage" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "propertyType",
      title: "Objekttyp",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Mehrfamilienhaus", value: "mfh" },
          { title: "Gewerbeimmobilie", value: "gewerbe" },
          { title: "Grundstück", value: "grundstueck" },
          { title: "Portfolio", value: "portfolio" },
          { title: "Mischobjekt", value: "misch" },
        ],
      },
      validation: (r) => r.required(),
    }),
    // STRUKTURIERTE ADRESSE — verhindert inkonsistente Schreibweisen
    defineField({
      name: "addressPrimary",
      title: "Hauptadresse",
      type: "object",
      group: "address",
      fields: [
        { name: "street", title: "Straße", type: "string", validation: (r) => r.required() },
        { name: "houseNumber", title: "Hausnummer", type: "string", validation: (r) => r.required() },
        { name: "zipCode", title: "PLZ", type: "string", validation: (r) => r.required().regex(/^[0-9]{5}$/, { name: "PLZ", invert: false }) },
        { name: "cityName", title: "Stadt (Klartext)", type: "string", validation: (r) => r.required() },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "addressAdditional",
      title: "Weitere Adressen (für Mehrobjekt-Liegenschaften)",
      type: "array",
      group: "address",
      description: "Z.B. wenn das Objekt auch 'Neustraße 15' umfasst.",
      of: [
        {
          type: "object",
          fields: [
            { name: "street", title: "Straße", type: "string", validation: (r) => r.required() },
            { name: "houseNumber", title: "Hausnummer", type: "string", validation: (r) => r.required() },
          ],
          preview: {
            select: { street: "street", num: "houseNumber" },
            prepare: ({ street, num }) => ({ title: `${street ?? ""} ${num ?? ""}`.trim() }),
          },
        },
      ],
    }),
    // PFLICHT: Hauptbild
    defineField({
      name: "image",
      title: "Hauptbild (Hero)",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt-Text", validation: (r) => r.required() },
      ],
      validation: (r) => r.required().error("Hauptbild ist Pflicht — keine leeren Objektseiten."),
    }),
    // EMPFEHLUNG: min. 4 Bilder in Galerie
    defineField({
      name: "gallery",
      title: "Galerie (Empfehlung: 5–10 Bilder)",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt-Text" }],
        },
      ],
      validation: (r) =>
        r
          .min(4)
          .warning("Mindestens 4 Bilder empfohlen — sonst wirkt die Objektseite leer (Audit-Lesson)."),
    }),
    // EMPFEHLUNG: Beschreibung
    defineField({
      name: "description",
      title: "Beschreibung (Pflicht)",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
      validation: (r) =>
        r
          .required()
          .min(1)
          .error("Beschreibung ist Pflicht — keine Objektseite ohne Inhalt."),
    }),
    defineField({
      name: "highlights",
      title: "Besonderheiten / Highlights (Bullet-Liste)",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description: "Z.B. 'Vollvermietet', 'Dachgeschoss-Ausbaupotenzial', 'Saniert 2022'.",
    }),
    defineField({
      name: "stats",
      title: "Kennzahlen (mind. 3 Pflicht)",
      type: "object",
      group: "stats",
      fields: [
        { name: "wohneinheiten", title: "Wohneinheiten", type: "number" },
        { name: "gewerbeeinheiten", title: "Gewerbeeinheiten", type: "number" },
        { name: "gesamtflaeche", title: "Gesamtfläche (m²)", type: "number" },
        { name: "stellplaetze", title: "Stellplätze (z.B. '61 + 21')", type: "string" },
        { name: "baujahr", title: "Baujahr", type: "number" },
        { name: "mieteinnahmen", title: "Mieteinnahmen p.a. (EUR)", type: "number" },
      ],
      validation: (r) =>
        r.custom((stats) => {
          if (!stats) return "Kennzahlen sind Pflicht.";
          const filled = Object.values(stats as Record<string, unknown>).filter(
            (v) => v !== undefined && v !== null && v !== "",
          ).length;
          return filled >= 3
            ? true
            : "Mindestens 3 Kennzahlen ausfüllen — leere Stat-Bars wirken unprofessionell.";
        }),
    }),
    defineField({
      name: "measures",
      title: "Maßnahmen / Entwicklung (optional)",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
      description: "Was wurde am Objekt umgesetzt (Sanierung, Modernisierung, Aufstockung)?",
    }),
    defineField({
      name: "acquisitionDate",
      title: "Datum Ankauf",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "featured",
      title: "Auf Startseite hervorheben",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sortierung",
      type: "number",
      group: "content",
      initialValue: 0,
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  preview: {
    select: {
      street: "addressPrimary.street",
      num: "addressPrimary.houseNumber",
      cityName: "addressPrimary.cityName",
      zip: "addressPrimary.zipCode",
      media: "image",
      title: "title",
    },
    prepare: ({ street, num, cityName, zip, media, title }) => {
      const addr =
        street && num
          ? `${street} ${num}${zip ? `, ${zip}` : ""}${cityName ? ` ${cityName}` : ""}`
          : "⚠ Adresse fehlt";
      return { title: title ?? addr, subtitle: addr, media };
    },
  },
});
