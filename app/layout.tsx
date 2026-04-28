import type { Metadata } from "next";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: {
    default: "GKN Immobiliengruppe — Immobilienankauf Ruhrgebiet",
    template: "%s | GKN Immobiliengruppe",
  },
  description:
    "Immobilienankauf auf die schnelle, transparente und feine Art. Mehrfamilienhäuser, Gewerbeimmobilien, Portfolios und Grundstücke im Ruhrgebiet bis 30 Mio. €.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gkn-immobilien.de",
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="antialiased">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
