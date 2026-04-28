import { UtilityBar } from "@/components/layout/UtilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout für alle Frontend-Seiten (außer /studio).
 * Header + Footer NUR hier — niemals in Page-Components rendern.
 * (Anti-Pattern-Schutz: alte Seite hatte doppelte Navigation durch Theme-Konflikt.)
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UtilityBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
