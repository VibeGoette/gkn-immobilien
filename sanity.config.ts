"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { structure, SINGLETON_TYPES } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "GKN Immobiliengruppe",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && !["unpublish", "delete", "duplicate"].includes(action),
          )
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
