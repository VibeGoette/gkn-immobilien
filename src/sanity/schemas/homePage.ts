import { defineType, defineField } from "sanity";
import { pageBuilder } from "./sections";

export const homePage = defineType({
  name: "homePage",
  title: "Startseite",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "hero" }),
    defineField({
      name: "intro",
      title: "Intro-Text (Über uns)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "stats",
      title: "Statistik-Bar",
      type: "object",
      fields: [
        { name: "experienceYears", title: "Jahre Erfahrung", type: "number" },
        { name: "experts", title: "Experten", type: "number" },
        { name: "propertiesCount", title: "Immobilien im Bestand", type: "number" },
      ],
    }),
    defineField({
      name: "team",
      title: "Team-Sektion",
      type: "object",
      fields: [
        { name: "title", title: "Titel", type: "string", initialValue: "Drei Persönlichkeiten. Ein Fundament." },
        {
          name: "members",
          title: "Mitglieder",
          type: "array",
          of: [{ type: "reference", to: [{ type: "teamMember" }] }],
        },
      ],
    }),
    defineField(pageBuilder as never),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    prepare: () => ({ title: "Startseite" }),
  },
});
