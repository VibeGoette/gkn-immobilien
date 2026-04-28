import { notFound } from "next/navigation";
import { sanityFetch, sanityFetchList } from "@/sanity/lib/live";

const QUERY = `*[_type == "guidePage" && slug.current == $slug][0]{
  _id, title, excerpt, publishedAt, image, body, faq, seo,
  "relatedTransactional": relatedTransactional[]->{ _id, _type, title, slug, serviceSlug, city }
}`;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const items = await sanityFetchList<{ slug: string }>({
    query: `*[_type == "guidePage" && defined(slug.current)]{ "slug": slug.current }`,
  });
  return items;
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch<{ title: string; excerpt?: string }>({
    query: QUERY,
    params: { slug },
  });
  if (!data) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 prose prose-invert">
      <h1>{data.title}</h1>
      {data.excerpt && <p className="lead">{data.excerpt}</p>}
    </article>
  );
}
