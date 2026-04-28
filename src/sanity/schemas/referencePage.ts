import { defineType, defineField } from "sanity";

export const referencePage = defineType({
  name: "referencePage",
  title: "Referenz / Portfolio-Objekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel (z.B. Adresse)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse (vollständig)",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "Stadt",
      type: "reference",
      to: [{ type: "locationPage" }],
    }),
    defineField({
      name: "propertyType",
      title: "Objekttyp",
      type: "string",
      options: {
        list: [
          { title: "Mehrfamilienhaus", value: "mfh" },
          { title: "Gewerbeimmobilie", value: "gewerbe" },
          { title: "Grundstück", value: "grundstueck" },
          { title: "Portfolio", value: "portfolio" },
          { title: "Mischobjekt", value: "misch" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Hauptbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "stats",
      title: "Kennzahlen",
      type: "object",
      fields: [
        { name: "wohneinheiten", title: "Wohneinheiten", type: "number" },
        { name: "gewerbeeinheiten", title: "Gewerbeeinheiten", type: "number" },
        { name: "gesamtflaeche", title: "Gesamtfläche (m²)", type: "number" },
        { name: "stellplaetze", title: "Stellplätze", type: "string" },
        { name: "baujahr", title: "Baujahr", type: "number" },
        { name: "mieteinnahmen", title: "Mieteinnahmen p.a. (EUR)", type: "number" },
      ],
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "acquisitionDate",
      title: "Datum Ankauf",
      type: "date",
    }),
    defineField({
      name: "featured",
      title: "Auf Startseite hervorheben",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sortierung",
      type: "number",
      initialValue: 0,
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "title", subtitle: "address", media: "image" },
  },
});
