import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://gkn-immobilien.de";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE}/`, priority: 1 },
  { url: `${BASE}/portfolio`, priority: 0.8 },
  { url: `${BASE}/kontakt`, priority: 0.8 },
  { url: `${BASE}/blog`, priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Wenn Sanity nicht konfiguriert ist (initial build), nur statische Routes ausgeben.
  if (!isSanityConfigured) {
    const now = new Date();
    return STATIC_ROUTES.map((r) => ({ ...r, lastModified: now }));
  }

  let services: Array<{ slug: { current: string } }> = [];
  let locations: Array<{ slug: { current: string } }> = [];
  let combos: Array<{
    serviceSlug: { current: string };
    location: { slug: { current: string } };
  }> = [];
  let refs: Array<{ slug: { current: string } }> = [];
  let guides: Array<{ slug: { current: string } }> = [];
  let posts: Array<{ slug: { current: string } }> = [];

  try {
    [services, locations, combos, refs, guides, posts] = await Promise.all([
      client.fetch(`*[_type == "servicePage" && defined(slug.current)]{ slug }`),
      client.fetch(`*[_type == "locationPage" && defined(slug.current)]{ slug }`),
      client.fetch(
        `*[_type == "serviceLocationPage" && defined(serviceSlug.current)]{ serviceSlug, "location": location->{ slug } }`,
      ),
      client.fetch(`*[_type == "referencePage" && defined(slug.current)]{ slug }`),
      client.fetch(`*[_type == "guidePage" && defined(slug.current)]{ slug }`),
      client.fetch(`*[_type == "blogPost" && defined(slug.current)]{ slug }`),
    ]);
  } catch (err) {
    console.warn("Sitemap: Sanity-Fetch fehlgeschlagen, fallback auf statische Routes.", err);
  }

  const now = new Date();
  return [
    ...STATIC_ROUTES.map((r) => ({ ...r, lastModified: now })),
    ...services.map((s) => ({ url: `${BASE}/${s.slug.current}`, lastModified: now, priority: 0.9 })),
    ...locations.map((l) => ({ url: `${BASE}/immobilienankauf/${l.slug.current}`, lastModified: now, priority: 0.9 })),
    ...combos
      .filter((c) => c.location?.slug?.current)
      .map((c) => ({
        url: `${BASE}/${c.serviceSlug.current}/${c.location.slug.current}`,
        lastModified: now,
        priority: 0.85,
      })),
    ...refs.map((r) => ({ url: `${BASE}/referenzen/${r.slug.current}`, lastModified: now, priority: 0.6 })),
    ...guides.map((g) => ({ url: `${BASE}/ratgeber/${g.slug.current}`, lastModified: now, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug.current}`, lastModified: now, priority: 0.5 })),
  ];
}
