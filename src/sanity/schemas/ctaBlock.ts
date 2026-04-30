import { defineType, defineField } from "sanity";

/**
 * Reusable CTA-Block mit Heading + Subline + zwei optionalen CTAs.
 * Bewusst anders als das bestehende `ctaSection`-Object (1 Button) — hier
 * primary + secondary für Money-Page-Footer / Section-Schluss.
 */
export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "CTA-Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subline",
      title: "Subline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "primaryLabel",
      title: "Primary CTA — Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "primaryHref",
      title: "Primary CTA — Link",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary CTA — Label",
      type: "string",
    }),
    defineField({
      name: "secondaryHref",
      title: "Secondary CTA — Link",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "primaryLabel" },
  },
});
