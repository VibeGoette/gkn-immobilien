import { defineType, defineArrayMember } from "sanity";

/**
 * Standard PortableText-Body — wiederverwendbar in allen Pages.
 * Definierte Styles, Marks, Listen, Image-Embeds und Callout-Block.
 *
 * Nutzung als Field-Type:
 *   { name: "body", type: "portableTextStandard" }
 *
 * Das ersetzt die bisher pro Schema inline definierten Block-Arrays
 * und stellt konsistentes Rendering im Frontend sicher.
 */
export const portableTextStandard = defineType({
  name: "portableTextStandard",
  title: "Body (Rich Text)",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Zitat", value: "blockquote" },
      ],
      lists: [
        { title: "Aufzählung", value: "bullet" },
        { title: "Nummeriert", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
          { title: "Unterstrichen", value: "underline" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (r) =>
                  r.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              },
              {
                name: "openInNewTab",
                type: "boolean",
                title: "In neuem Tab öffnen",
                initialValue: false,
              },
            ],
          },
          {
            name: "internalLink",
            type: "object",
            title: "Interner Link",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Ziel",
                to: [
                  { type: "servicePage" },
                  { type: "locationPage" },
                  { type: "serviceLocationPage" },
                  { type: "guidePage" },
                  { type: "blogPost" },
                  { type: "referencePage" },
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt-Text",
          validation: (r) => r.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Bildunterschrift",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Callout / Hinweis-Box",
      fields: [
        {
          name: "tone",
          type: "string",
          title: "Tonalität",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Hinweis", value: "note" },
              { title: "Warnung", value: "warning" },
              { title: "Erfolg", value: "success" },
            ],
            layout: "radio",
          },
          initialValue: "info",
        },
        {
          name: "title",
          type: "string",
          title: "Titel",
        },
        {
          name: "body",
          type: "array",
          title: "Inhalt",
          of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
          validation: (r) => r.required(),
        },
      ],
      preview: {
        select: { title: "title", subtitle: "tone" },
        prepare: ({ title, subtitle }) => ({
          title: title ?? "Callout",
          subtitle: subtitle ?? "info",
        }),
      },
    }),
  ],
});
