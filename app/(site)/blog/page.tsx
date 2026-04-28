import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";

const QUERY = `*[_type == "blogPost"] | order(publishedAt desc){
  _id, title, slug, excerpt, publishedAt, image
}`;

export const metadata = {
  title: "News & Marktanalysen",
};

export default async function BlogIndex() {
  const { data } = await sanityFetch({ query: QUERY });
  const posts = data ?? [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-light">News</h1>
      <ul className="mt-12 space-y-8">
        {posts.map((p: { _id: string; slug?: { current: string }; title: string; excerpt?: string }) => (
          <li key={p._id}>
            <Link href={`/blog/${p.slug?.current}`}>
              <h2 className="text-2xl">{p.title}</h2>
              {p.excerpt && <p className="mt-2 text-neutral-400">{p.excerpt}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
