import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { formatAddressShort, formatStreetline, type ReferenceAddress } from "@/lib/address";

const QUERY = `*[_type == "referencePage"] | order(order asc, acquisitionDate desc){
  _id, title, slug, propertyType, image,
  "primary": addressPrimary,
  "additional": addressAdditional,
  stats
}`;

export const metadata = {
  title: "Portfolio — Unsere Immobilien im Bestand",
  description:
    "Auswahl unserer Bestandsobjekte: Mehrfamilienhäuser, Gewerbeimmobilien und Portfolios im Ruhrgebiet.",
};

type RefItem = {
  _id: string;
  slug?: { current: string };
  title?: string;
  propertyType?: string;
  primary?: ReferenceAddress["primary"];
  additional?: ReferenceAddress["additional"];
  stats?: { wohneinheiten?: number; gewerbeeinheiten?: number; gesamtflaeche?: number };
};

export default async function PortfolioPage() {
  const { data } = await sanityFetch({ query: QUERY });
  const refs: RefItem[] = data ?? [];

  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-4xl font-light">Portfolio</h1>
      <p className="mt-2 text-neutral-400">{refs.length} Objekte im Bestand</p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {refs.map((r) => {
          const addr: ReferenceAddress = { primary: r.primary!, additional: r.additional };
          return (
            <li key={r._id}>
              <Link
                href={`/referenzen/${r.slug?.current}`}
                className="block rounded-lg border border-neutral-800 p-6 transition hover:border-neutral-500"
              >
                <h2 className="text-xl">{formatStreetline(addr) || r.title}</h2>
                <p className="mt-1 text-sm text-neutral-500">{formatAddressShort(addr)}</p>
                {r.stats && (
                  <p className="mt-3 text-xs text-neutral-600">
                    {[
                      r.stats.wohneinheiten && `${r.stats.wohneinheiten} WE`,
                      r.stats.gewerbeeinheiten && `${r.stats.gewerbeeinheiten} GE`,
                      r.stats.gesamtflaeche && `${r.stats.gesamtflaeche} m²`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
