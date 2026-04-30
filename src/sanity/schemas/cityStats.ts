import { defineType, defineField } from "sanity";

/**
 * Reusable Kennzahl-Item für Stadt-Seiten.
 * `value` als String, weil viele Werte Einheiten oder Bereiche enthalten
 * (z.B. "12,3 Mio. €", "5,4 %", "1,2–1,5"). Fußnote für Quelle/Stand.
 */
export const cityStats = defineType({
  name: "cityStats",
  title: "Lokale Kennzahl",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label (z.B. 'Durchschnitt €/m²')",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "value",
      title: "Wert (z.B. '2.180 €' oder '5,4 %')",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "footnote",
      title: "Fußnote (Quelle / Stand)",
      type: "string",
      description: "z.B. 'Quelle: empirica, Stand Q1 2026'.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
    prepare: ({ title, subtitle }) => ({
      title: subtitle ? `${title}: ${subtitle}` : title,
    }),
  },
});
