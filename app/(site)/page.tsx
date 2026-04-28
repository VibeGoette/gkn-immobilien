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
export const metadata = {
  title: "Immobilienankauf im Ruhrgebiet | GKN Immobiliengruppe",
  description:
    "GKN Immobiliengruppe kauft Mehrfamilienhäuser, Gewerbeimmobilien, Grundstücke und Portfolios im Ruhrgebiet. Diskret, schnell und bankenunabhängig — mit sofortiger Anzahlung.",
  alternates: { canonical: "https://gkn-immobilien.de/" },
  openGraph: {
    title: "Immobilienankauf Ruhrgebiet — GKN Immobiliengruppe",
    description:
      "Mehrfamilienhäuser, Gewerbeimmobilien und Portfolios diskret und schnell verkaufen. Direkt an GKN — ohne Makler, bankenunabhängig, mit sofortiger Anzahlung.",
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
