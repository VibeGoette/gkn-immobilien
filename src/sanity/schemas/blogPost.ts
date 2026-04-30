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
      name: "updatedAt",
      title: "Zuletzt aktualisiert",
      type: "datetime",
      description:
        "Letztes inhaltliches Update — wird in Article-JSON-LD als dateModified verwendet.",
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
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.max(10),
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "relatedPosts",
      title: "Verwandte Beiträge",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "blogPost" }],
          options: { filter: "_id != ^._id" },
        },
      ],
      validation: (r) => r.max(3),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoMeta" }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "image" },
  },
});
