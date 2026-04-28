import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";

const QUERY = `*[_type == "referencePage"] | order(order asc, acquisitionDate desc){
  _id, title, slug, address, propertyType, image,
  "stats": stats
}`;

export const metadata = {
  title: "Portfolio — Unsere Immobilien im Bestand",
  description:
    "Auswahl unserer Bestandsobjekte: Mehrfamilienhäuser, Gewerbeimmobilien und Portfolios im Ruhrgebiet.",
};

export default async function PortfolioPage() {
  const { data } = await sanityFetch({ query: QUERY });
  const refs = data ?? [];

  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-4xl font-light">Portfolio</h1>
      <p className="mt-2 text-neutral-400">{refs.length} Objekte im Bestand</p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {refs.map((r: { _id: string; slug?: { current: string }; title: string; address?: string }) => (
          <li key={r._id}>
            <Link
              href={`/referenzen/${r.slug?.current}/`}
              className="block rounded-lg border border-neutral-800 p-6 transition hover:border-neutral-500"
            >
              <h2 className="text-xl">{r.title}</h2>
              {r.address && <p className="mt-1 text-sm text-neutral-500">{r.address}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
