import { defineType, defineField } from "sanity";
import { pageBuilder } from "./sections";

export const locationPage = defineType({
  name: "locationPage",
  title: "Stadtseite",
  type: "document",
  fields: [
    defineField({
      name: "city",
      title: "Stadt",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "city", maxLength: 96 },
      description: "z.B. 'bochum', 'dortmund', 'essen'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "geo",
      title: "Geo-Koordinaten (für Local SEO Schema)",
      type: "geopoint",
    }),
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField({
      name: "marketIntro",
      title: "Marktbeschreibung Stadt",
      type: "text",
      rows: 4,
      description: "Kurze Einleitung zum lokalen Immobilienmarkt",
    }),
    defineField(pageBuilder as never),
    defineField({
      name: "relatedServices",
      title: "Verlinkte Service-Seiten",
      type: "array",
      of: [{ type: "reference", to: [{ type: "servicePage" }, { type: "serviceLocationPage" }] }],
      validation: (r) => r.min(1).warning("Min. 1 verlinkte Service-Seite — Cluster-Strategie."),
    }),
    defineField({
      name: "seo",
      title: "SEO (Pflicht)",
      type: "seoFields",
      validation: (r) =>
        r.required().custom((seo: { metaTitle?: string; metaDescription?: string } | undefined) => {
          if (!seo?.metaTitle) return "Meta Title Pflicht für Stadtseiten.";
          if (!seo?.metaDescription) return "Meta Description Pflicht.";
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "city", subtitle: "slug.current" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `/immobilienankauf/${subtitle}/` : "no slug",
    }),
  },
});
