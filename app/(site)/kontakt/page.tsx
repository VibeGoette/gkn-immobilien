import { sanityFetch } from "@/sanity/lib/live";

const QUERY = `*[_type == "siteSettings"][0]{
  contact,
  "team": *[_type == "teamMember"] | order(order asc){ _id, name, role, phone, mobile, email, photo }
}`;

export const metadata = {
  title: "Kontakt — Immobilienankauf besprechen",
};

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: QUERY });

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-light">Kontakt</h1>
      <p className="mt-4 text-neutral-400">
        Wir freuen uns auf Ihr Angebot und stehen Ihnen für Rückfragen gerne zur Verfügung.
      </p>
      {data?.contact?.phone && (
        <p className="mt-8 text-xl">{data.contact.phone}</p>
      )}
    </main>
  );
}
