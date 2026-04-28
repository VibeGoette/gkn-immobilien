export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-28";

// Defensive: kein assertValue mehr, damit Build ohne Sanity-Projekt nicht failed.
// Wird "placeholder" verwendet, schlagen Sanity-Calls zur Laufzeit fehl —
// die statische Startseite läuft trotzdem. Sobald Vercel-Marketplace-Integration
// installiert ist, werden die echten Werte automatisch gesetzt.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

export const studioUrl = "/studio";

export const isSanityConfigured = projectId !== "placeholder";
