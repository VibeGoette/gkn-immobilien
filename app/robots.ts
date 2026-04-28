import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://gkn-immobilien.de";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
