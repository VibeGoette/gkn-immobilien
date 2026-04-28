import { notFound } from "next/navigation";
import { sanityFetch, sanityFetchList } from "@/sanity/lib/live";

const QUERY = `*[_type == "locationPage" && slug.current == $city][0]{
  _id, city, hero, marketIntro, sections, seo, geo,
  "relatedServices": relatedServices[]->{ _id, _type, title, slug, serviceSlug }
}`;

export async function generateStaticParams(): Promise<{ city: string }[]> {
  const items = await sanityFetchList<{ city: string }>({
    query: `*[_type == "locationPage" && defined(slug.current)]{ "city": slug.current }`,
  });
  return items;
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const { data } = await sanityFetch<{
    city: string;
    hero?: { headline?: string };
  }>({ query: QUERY, params: { city } });
  if (!data) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-light">
        {data.hero?.headline ?? `Immobilienankauf ${data.city}`}
      </h1>
      <p className="mt-4 text-neutral-400">/immobilienankauf/{city}/</p>
    </article>
  );
}
