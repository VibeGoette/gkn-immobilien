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
    default: "Immobilienankauf im Ruhrgebiet | GKN Immobiliengruppe",
    template: "%s | GKN Immobiliengruppe",
  },
  description:
    "GKN Immobiliengruppe kauft Mehrfamilienhäuser, Gewerbeimmobilien, Grundstücke und Portfolios im Ruhrgebiet. Diskret, schnell und bankenunabhängig — mit sofortiger Anzahlung.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gkn-immobilien.de",
  ),
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
        {children}
        {isSanityConfigured && <SanityLive />}
      </body>
    </html>
  );
}
