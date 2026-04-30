import { defineType, defineField } from "sanity";

export const guidePage = defineType({
  name: "guidePage",
  title: "Ratgeber",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel (H1)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "image",
      title: "Header-Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ-Sektion (FAQPage Schema)",
      type: "faqSection",
    }),
    defineField({
      name: "relatedTransactional",
      title: "Verlinkte transaktionale Seiten (Pflicht für interne Verlinkung)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "servicePage" }, { type: "locationPage" }, { type: "serviceLocationPage" }] }],
      validation: (r) => r.min(1).warning("Mindestens 1 transaktionale Seite verlinken (Cluster-Strategie)"),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `/ratgeber/${subtitle}/` : "no slug",
      media,
    }),
  },
});
