import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import {
  formatAddressFull,
  formatStreetline,
  type ReferenceAddress,
} from "@/lib/address";

const QUERY = `*[_type == "referencePage" && slug.current == $slug][0]{
  _id, title, propertyType, image, gallery, stats, description, highlights, measures, acquisitionDate, seo,
  "primary": addressPrimary,
  "additional": addressAdditional,
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

  const address: ReferenceAddress = {
    primary: data.primary,
    additional: data.additional,
  };
  const headline = formatStreetline(address) || data.title;
  const fullAddress = formatAddressFull(address);

  return (
    <article className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-light">{headline}</h1>
      {fullAddress && <p className="mt-2 text-neutral-400">{fullAddress}</p>}
    </article>
  );
}
