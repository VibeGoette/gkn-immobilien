import type { SchemaTypeDefinition } from "sanity";

import { seoFields } from "./seoFields";
import { hero } from "./hero";
import {
  faqItem,
  faqSection,
  trustBar,
  processSection,
  richTextSection,
  ctaSection,
  referenceShowcase,
} from "./sections";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";
import { referencePage } from "./referencePage";
import { servicePage } from "./servicePage";
import { locationPage } from "./locationPage";
import { serviceLocationPage } from "./serviceLocationPage";
import { homePage } from "./homePage";
import { guidePage } from "./guidePage";
import { blogPost } from "./blogPost";
import { tool } from "./tool";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  seoFields,
  hero,
  faqItem,
  faqSection,
  trustBar,
  processSection,
  richTextSection,
  ctaSection,
  referenceShowcase,
  // Documents — Singletons
  siteSettings,
  homePage,
  // Documents — Pages
  servicePage,
  locationPage,
  serviceLocationPage,
  referencePage,
  guidePage,
  blogPost,
  tool,
  // Documents — Other
  teamMember,
];
