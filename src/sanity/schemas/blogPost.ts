import { defineType, defineField } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog / News",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
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
      title: "Excerpt",
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
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "image",
      title: "Cover-Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "Kategorien",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Marktanalyse", value: "marktanalyse" },
          { title: "Ankäufe", value: "ankaeufe" },
          { title: "Pressemitteilung", value: "presse" },
          { title: "Wissen", value: "wissen" },
        ],
      },
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "image" },
  },
});
