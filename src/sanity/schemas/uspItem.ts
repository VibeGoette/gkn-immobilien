import { defineType, defineField } from "sanity";

/**
 * Reusable USP-/Vorteil-Item mit Icon, Titel, Body.
 * Nutzbar in `array of [{type: 'uspItem'}]` auf servicePage.usps,
 * locationPage, etc. Icons als Slug-String (frontend-mapped),
 * nicht als Image — Konsistenz im Design wichtiger als Freiheit.
 */
export const uspItem = defineType({
  name: "uspItem",
  title: "USP / Vorteil",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon (Slug)",
      type: "string",
      description:
        "Frontend mapped (z.B. 'shield', 'clock', 'eye', 'handshake'). Liste in src/components abgleichen.",
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Beschreibung",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "icon" },
  },
});
