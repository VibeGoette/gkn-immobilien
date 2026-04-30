import { defineType, defineField, defineArrayMember } from "sanity";

// FAQ-Item
export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ-Eintrag",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Frage", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Antwort", type: "array", of: [{ type: "block" }], validation: (r) => r.required() }),
  ],
});

// FAQ-Section (renders FAQPage Schema.org)
export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ-Sektion",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", initialValue: "Häufige Fragen" }),
    defineField({
      name: "items",
      title: "FAQs",
      type: "array",
      of: [{ type: "faqItem" }],
      validation: (r) => r.min(3).warning("Mindestens 3 FAQs für Schema-Wert"),
    }),
  ],
});

// Trust-Bar (Vorteile, Stats, USPs)
export const trustBar = defineType({
  name: "trustBar",
  title: "Trust-Bar / USPs",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Überschrift", type: "string" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Wert (optional)", type: "string" },
            { name: "description", title: "Beschreibung", type: "text", rows: 2 },
          ],
        }),
      ],
    }),
  ],
});

// Process-Section ("So läuft der Verkauf ab")
export const processSection = defineType({
  name: "processSection",
  title: "Prozess-Sektion",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", initialValue: "So läuft der Verkauf ab" }),
    defineField({
      name: "steps",
      title: "Schritte",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "number", title: "Nummer", type: "number" },
            { name: "title", title: "Titel", type: "string" },
            { name: "description", title: "Beschreibung", type: "text", rows: 3 },
          ],
        }),
      ],
    }),
  ],
});

// Rich-Text-Section
export const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich-Text",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string" }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
});

// CTA-Section
export const ctaSection = defineType({
  name: "ctaSection",
  title: "CTA-Sektion",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subline", title: "Subline", type: "text", rows: 2 }),
    defineField({
      name: "cta",
      title: "Button",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    }),
  ],
});

// Reference-Showcase (verlinkt referenceObjects)
export const referenceShowcase = defineType({
  name: "referenceShowcase",
  title: "Referenz-Showcase",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", initialValue: "Unsere Auswahl" }),
    defineField({
      name: "references",
      title: "Referenzen",
      type: "array",
      of: [{ type: "reference", to: [{ type: "referenceObject" }] }],
    }),
    defineField({
      name: "showAll",
      title: "Alle Referenzen automatisch anzeigen",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

// Section-Builder (Block-Type für Pages)
export const pageBuilder = {
  name: "sections",
  title: "Sektionen",
  type: "array",
  of: [
    { type: "trustBar" },
    { type: "processSection" },
    { type: "richTextSection" },
    { type: "faqSection" },
    { type: "ctaSection" },
    { type: "referenceShowcase" },
  ],
};
