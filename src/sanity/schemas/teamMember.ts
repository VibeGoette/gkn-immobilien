import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team-Mitglied",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Rolle / Position",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "longBio",
      title: "Ausführliche Bio (für E-E-A-T / About-Sektion)",
      type: "array",
      of: [{ type: "block" }],
      description: "Karriere, Schwerpunkte, Persönliches — boostet Trust & SGE-Sichtbarkeit.",
    }),
    defineField({
      name: "qualifications",
      title: "Qualifikationen / Zertifikate",
      type: "array",
      of: [{ type: "string" }],
      description: "z.B. 'Geprüfter Fachwirt Immobilienwirtschaft (IHK)'",
    }),
    defineField({
      name: "yearsExperience",
      title: "Jahre Berufserfahrung",
      type: "number",
    }),
    defineField({
      name: "specialty",
      title: "Spezialgebiet (für Ansprechpartner-Routing)",
      type: "string",
      options: {
        list: [
          { title: "Institutionelle Investitionen", value: "institutional" },
          { title: "Private Verkäufe", value: "private" },
          { title: "Operativ / Bauleitung / Verwaltung", value: "operations" },
        ],
      },
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "mobile",
      title: "Mobil",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Sortierung",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { name: "order", title: "Reihenfolge", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
