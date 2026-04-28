import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://gkn-immobilien.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, locations, combos, refs, guides, posts] = await Promise.all([
    client.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "servicePage" && defined(slug.current)]{ slug }`,
    ),
    client.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "locationPage" && defined(slug.current)]{ slug }`,
    ),
    client.fetch<Array<{ serviceSlug: { current: string }; location: { slug: { current: string } } }>>(
      `*[_type == "serviceLocationPage" && defined(serviceSlug.current)]{ serviceSlug, "location": location->{ slug } }`,
    ),
    client.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "referencePage" && defined(slug.current)]{ slug }`,
    ),
    client.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "guidePage" && defined(slug.current)]{ slug }`,
    ),
    client.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "blogPost" && defined(slug.current)]{ slug }`,
    ),
  ]);

  const now = new Date();

  return [
    { url: `${BASE}/`, lastModified: now, priority: 1 },
    { url: `${BASE}/portfolio/`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/kontakt/`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/blog/`, lastModified: now, priority: 0.6 },
    ...services.map((s) => ({ url: `${BASE}/${s.slug.current}/`, lastModified: now, priority: 0.9 })),
    ...locations.map((l) => ({ url: `${BASE}/immobilienankauf/${l.slug.current}/`, lastModified: now, priority: 0.9 })),
    ...combos
      .filter((c) => c.location?.slug?.current)
      .map((c) => ({
        url: `${BASE}/${c.serviceSlug.current}/${c.location.slug.current}/`,
        lastModified: now,
        priority: 0.85,
      })),
    ...refs.map((r) => ({ url: `${BASE}/referenzen/${r.slug.current}/`, lastModified: now, priority: 0.6 })),
    ...guides.map((g) => ({ url: `${BASE}/ratgeber/${g.slug.current}/`, lastModified: now, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug.current}/`, lastModified: now, priority: 0.5 })),
  ];
}
