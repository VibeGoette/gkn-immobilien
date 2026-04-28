import { defineType, defineField } from "sanity";
import { pageBuilder } from "./sections";

export const servicePage = defineType({
  name: "servicePage",
  title: "Leistungsseite",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel (intern)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "z.B. 'mehrfamilienhaeuser-ankauf', 'gewerbeimmobilien-ankauf'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "serviceType",
      title: "Service-Typ",
      type: "string",
      options: {
        list: [
          { title: "Mehrfamilienhäuser", value: "mfh" },
          { title: "Gewerbeimmobilien", value: "gewerbe" },
          { title: "Grundstücke", value: "grundstueck" },
          { title: "Portfolios", value: "portfolio" },
          { title: "Hub (alle Services)", value: "hub" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField(pageBuilder as never),
    defineField({
      name: "relatedLocations",
      title: "Verlinkte Stadt-Kombiseiten",
      type: "array",
      of: [{ type: "reference", to: [{ type: "locationPage" }, { type: "serviceLocationPage" }] }],
      description: "Interne Verlinkung zu passenden Stadt-Seiten",
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `/${subtitle}/` : "no slug",
    }),
  },
});
