import { notFound } from "next/navigation";
import { sanityFetch, sanityFetchList } from "@/sanity/lib/live";

const QUERY = `*[_type == "servicePage" && slug.current == $slug][0]{
  _id, title, serviceType, hero, sections, seo,
  "relatedLocations": relatedLocations[]->{ _id, _type, slug, city, title }
}`;

export async function generateStaticParams(): Promise<{ serviceSlug: string }[]> {
  const items = await sanityFetchList<{ serviceSlug: string }>({
    query: `*[_type == "servicePage" && defined(slug.current)]{ "serviceSlug": slug.current }`,
  });
  return items;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const { data } = await sanityFetch<{
    title: string;
    serviceType: string;
    hero?: { headline?: string };
  }>({ query: QUERY, params: { slug: serviceSlug } });
  if (!data) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-light">{data.hero?.headline ?? data.title}</h1>
      <p className="mt-4 text-neutral-400">
        Service-Typ: {data.serviceType} · Slug: /{serviceSlug}/
      </p>
    </article>
  );
}
