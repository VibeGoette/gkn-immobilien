import { defineType, defineField } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (r) =>
        r.max(60).warning("Optimal unter 60 Zeichen für volle Anzeige in SERPs"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (r) =>
        r.max(160).warning("Optimal unter 160 Zeichen"),
    }),
    defineField({
      name: "focusKeyword",
      title: "Fokus-Keyword",
      type: "string",
      description: "Hauptkeyword dieser Seite (Cluster-Mapping)",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "noindex (von Suchmaschinen ausschließen)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL (optional Override)",
      type: "url",
    }),
  ],
});
