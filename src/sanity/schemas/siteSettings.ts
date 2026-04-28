import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "GKN Immobiliengruppe",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Immobilienankauf auf die schnelle, transparente und feine Art",
    }),
    defineField({
      name: "logo",
      title: "Logo (Vollfarbe)",
      type: "image",
    }),
    defineField({
      name: "logoWhite",
      title: "Logo (Weiß / für dunkle Hintergründe)",
      type: "image",
    }),
    defineField({
      name: "contact",
      title: "Kontaktdaten",
      type: "object",
      fields: [
        { name: "phone", title: "Telefon (Hauptnummer)", type: "string" },
        { name: "email", title: "E-Mail", type: "string" },
        { name: "address", title: "Adresse", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "navigation",
      title: "Hauptnavigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer-Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Standard-SEO (Fallback für alle Pages)",
      type: "seoFields",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
