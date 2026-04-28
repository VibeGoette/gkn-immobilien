import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";

const QUERY = `*[_type == "referencePage" && slug.current == $slug][0]{
  _id, title, address, propertyType, image, gallery, stats, description, acquisitionDate, seo,
  "city": city->{ _id, city, slug }
}`;

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: `*[_type == "referencePage" && defined(slug.current)]{ "slug": slug.current }`,
  });
  return data ?? [];
}

export default async function ReferenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: QUERY, params: { slug } });
  if (!data) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-light">{data.title}</h1>
      {data.address && <p className="mt-2 text-neutral-400">{data.address}</p>}
    </article>
  );
}
