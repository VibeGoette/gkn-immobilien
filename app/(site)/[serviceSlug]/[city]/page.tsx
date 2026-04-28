import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";

const QUERY = `*[_type == "serviceLocationPage"
  && serviceSlug.current == $serviceSlug
  && location->slug.current == $city][0]{
    _id, title, hero, sections, seo,
    "service": service->{ _id, title, slug },
    "location": location->{ _id, city, slug }
}`;

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: `*[_type == "serviceLocationPage" && defined(serviceSlug.current)]{
      "serviceSlug": serviceSlug.current,
      "city": location->slug.current
    }`,
  });
  return (data ?? []).filter((p: { city?: string }) => !!p.city);
}

export default async function ServiceLocationPage({
  params,
}: {
  params: Promise<{ serviceSlug: string; city: string }>;
}) {
  const { serviceSlug, city } = await params;
  const { data } = await sanityFetch({
    query: QUERY,
    params: { serviceSlug, city },
  });
  if (!data) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-light">{data.hero?.headline ?? data.title}</h1>
      <p className="mt-4 text-neutral-400">
        /{serviceSlug}/{city}/
      </p>
    </article>
  );
}
