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
