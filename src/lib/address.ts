/**
 * Adress-Helper — Single Source of Truth.
 *
 * Audit-Lesson alte Seite: Adressen wurden inkonsistent gerendert
 * ("Südring 15 & Neustraße 15" vs. "Südring 15 & Neustraße 1",
 * "Humboldstraße" statt "Humboldtstraße").
 *
 * Lösung: Strukturierte Daten im CMS + EINE Format-Funktion fürs Rendering.
 * Niemals Adressen im Frontend manuell zusammenbauen.
 */

export type AddressPrimary = {
  street: string;
  houseNumber: string;
  zipCode: string;
  cityName: string;
};

export type AddressAdditional = {
  street: string;
  houseNumber: string;
};

export type ReferenceAddress = {
  primary: AddressPrimary;
  additional?: AddressAdditional[];
};

/**
 * Vollformat: "Südring 15, Neustraße 1, 44787 Bochum"
 */
export function formatAddressFull(addr: ReferenceAddress | null | undefined): string {
  if (!addr?.primary) return "";
  const { street, houseNumber, zipCode, cityName } = addr.primary;
  const additional = (addr.additional ?? [])
    .map((a) => `${a.street} ${a.houseNumber}`)
    .filter(Boolean);
  const streetPart = [`${street} ${houseNumber}`, ...additional].join(", ");
  return `${streetPart}, ${zipCode} ${cityName}`.trim();
}

/**
 * Kurzformat für Karten/Listen: "Südring 15, Bochum"
 */
export function formatAddressShort(addr: ReferenceAddress | null | undefined): string {
  if (!addr?.primary) return "";
  const { street, houseNumber, cityName } = addr.primary;
  return `${street} ${houseNumber}, ${cityName}`.trim();
}

/**
 * Straßennamen für Title/H1: "Südring 15 & Neustraße 1"
 */
export function formatStreetline(addr: ReferenceAddress | null | undefined): string {
  if (!addr?.primary) return "";
  const { street, houseNumber } = addr.primary;
  const additional = (addr.additional ?? [])
    .map((a) => `${a.street} ${a.houseNumber}`)
    .filter(Boolean);
  return [`${street} ${houseNumber}`, ...additional].join(" & ");
}

/**
 * Schema.org PostalAddress JSON-LD
 */
export function addressToJsonLd(addr: ReferenceAddress | null | undefined) {
  if (!addr?.primary) return null;
  const { street, houseNumber, zipCode, cityName } = addr.primary;
  return {
    "@type": "PostalAddress",
    streetAddress: `${street} ${houseNumber}`,
    postalCode: zipCode,
    addressLocality: cityName,
    addressCountry: "DE",
  };
}
