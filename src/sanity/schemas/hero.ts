import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline (H1)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "subline", title: "Subline", type: "text", rows: 2 }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    }),
    defineField({
      name: "image",
      title: "Hero Bild",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
