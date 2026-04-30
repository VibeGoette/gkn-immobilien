import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Ankaufsprofil } from "@/components/sections/Ankaufsprofil";
import { Process } from "@/components/sections/Process";
import { Region } from "@/components/sections/Region";
import { Team } from "@/components/sections/Team";
import { Portfolio } from "@/components/sections/Portfolio";
import { Faq, CtaStrip } from "@/components/sections/Faq";

/**
 * Startseite — komponiert aus 10 Sections.
 *
 * Inhalte sind aktuell statisch (aus gkn-content-vollstaendig.md / Design-HTML).
 * Migration zu Sanity-getrieben erfolgt in Etappe 2 — dann liest die Page
 * via sanityFetch() das homePage Singleton + bezogene Documents.
 *
 * Header + Footer + UtilityBar werden vom (site)/layout.tsx bereitgestellt.
 */
export const metadata: Metadata = {
  title: "Mehrfamilienhaus verkaufen Bochum | Direktankauf Ruhrgebiet | GKN Immobilien",
  description:
    "Mehrfamilienhaus, Gewerbeimmobilie oder Grundstück im Ruhrgebiet verkaufen? ✓ Direktankauf ohne Makler ✓ Bankenunabhängig ✓ 100% diskret ✓ Sofortige Anzahlung. Jetzt Angebot einholen!",
  alternates: {
    canonical: "https://gkn-immobilien.de/",
  },
  openGraph: {
    title: "Mehrfamilienhaus verkaufen im Ruhrgebiet – GKN Direktankauf",
    description:
      "Mehrfamilienhäuser, Gewerbeimmobilien & Portfolios diskret verkaufen. Direkt an GKN – ohne Makler, kein Finanzierungsvorbehalt, sofortige Anzahlung.",
    url: "https://gkn-immobilien.de/",
    type: "website",
    locale: "de_DE",
    siteName: "GKN Immobiliengruppe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GKN Immobilien – Direktankauf Ruhrgebiet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehrfamilienhaus verkaufen Bochum | GKN Direktankauf",
    description:
      "Direktankauf ohne Makler – bankenunabhängig, 100% diskret, sofortige Anzahlung.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Advantages />
      <Ankaufsprofil />
      <Process />
      <Region />
      <Team />
      <Portfolio />
      <Faq />
      <CtaStrip />
    </>
  );
}
