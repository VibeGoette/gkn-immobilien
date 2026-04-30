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
        { name: "address", title: "Adresse (Anzeigeformat)", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "legal",
      title: "Impressum / Rechtliches",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "companyName", title: "Firmenname (vollständig)", type: "string" },
        { name: "street", title: "Straße + Hausnummer", type: "string" },
        { name: "zipCode", title: "PLZ", type: "string" },
        { name: "city", title: "Stadt", type: "string" },
        { name: "vatId", title: "USt-IdNr.", type: "string" },
        { name: "registerNumber", title: "Handelsregister-Nr.", type: "string" },
        { name: "registerCourt", title: "Registergericht", type: "string" },
        { name: "professionalTitle", title: "Berufsbezeichnung (gem. § 5 TMG)", type: "string" },
        { name: "professionalChamber", title: "Zuständige Kammer", type: "string" },
        { name: "professionalCountry", title: "Verleihungsstaat", type: "string", initialValue: "Deutschland" },
        { name: "managingDirectors", title: "Geschäftsführer (für Impressum)", type: "string" },
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
      type: "seoMeta",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
