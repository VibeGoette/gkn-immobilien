import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/env";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mehrfamilienhaus verkaufen Bochum | Direktankauf Ruhrgebiet | GKN Immobilien",
    template: "%s | GKN Immobilien",
  },
  description:
    "GKN Immobilien kauft Mehrfamilienhäuser, Gewerbeimmobilien, Grundstücke und Portfolios im Ruhrgebiet direkt an. Bankenunabhängig, diskret, sofortige Anzahlung.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gkn-immobilien.de",
  ),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "GKN Immobiliengruppe",
  },
};

// Explizites Viewport — verhindert dass iOS Safari bei initial render
// rauszoomt wenn Content > viewport detected wird.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

// LocalBusiness + RealEstateAgent Schema für Google Knowledge Graph
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "GKN Immobilien GmbH",
  alternateName: "GKN Immobiliengruppe",
  url: "https://gkn-immobilien.de",
  logo: "https://gkn-immobilien.de/logo.svg",
  image: "https://gkn-immobilien.de/og-image.jpg",
  description:
    "Inhabergeführter Direktankäufer für Mehrfamilienhäuser, Gewerbeimmobilien, Grundstücke und Portfolios im Ruhrgebiet. Bankenunabhängig, diskret, sofortige Anzahlung.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Humboldtstraße 34",
    addressLocality: "Bochum",
    postalCode: "44787",
    addressRegion: "Nordrhein-Westfalen",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.4818,
    longitude: 7.2162,
  },
  telephone: "+4923436715062",
  email: "info@gkn-immobilien.de",
  priceRange: "ab 250.000 €",
  areaServed: [
    { "@type": "City", name: "Bochum" },
    { "@type": "City", name: "Dortmund" },
    { "@type": "City", name: "Essen" },
    { "@type": "AdministrativeArea", name: "Ruhrgebiet" },
    { "@type": "AdministrativeArea", name: "Metropolregion Ruhr" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://gkn-immobilien.vercel.app",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {children}
        {isSanityConfigured && <SanityLive />}
      </body>
    </html>
  );
}
