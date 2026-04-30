import { defineType, defineField } from "sanity";
import { pageBuilder } from "./sections";

export const serviceLocationPage = defineType({
  name: "serviceLocationPage",
  title: "Service + Stadt Kombiseite",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel (intern)",
      type: "string",
      description: "z.B. 'Mehrfamilienhaus verkaufen Bochum'",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "reference",
      to: [{ type: "servicePage" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Stadt",
      type: "reference",
      to: [{ type: "locationPage" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "serviceSlug",
      title: "Service-Slug (URL-Teil)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "z.B. 'mehrfamilienhaeuser-ankauf' — wird mit Stadt zu /<service>/<stadt>/",
      validation: (r) => r.required(),
    }),
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField(pageBuilder as never),
    defineField({ name: "seo", title: "SEO", type: "seoMeta" }),
  ],
  preview: {
    select: { title: "title", service: "serviceSlug.current", city: "location.slug.current" },
    prepare: ({ title, service, city }) => ({
      title,
      subtitle: service && city ? `/${service}/${city}/` : "no slug",
    }),
  },
});
