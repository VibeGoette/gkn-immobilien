import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";

const QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, excerpt, publishedAt, image, body, seo,
  "author": author->{ name, photo, role }
}`;

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`,
  });
  return data ?? [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await sanityFetch({ query: QUERY, params: { slug } });
  if (!data) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24 prose prose-invert">
      <h1>{data.title}</h1>
    </article>
  );
}
