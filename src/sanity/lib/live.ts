import "server-only";
import { client } from "./client";
import { isSanityConfigured } from "../env";

/**
 * sanityFetch: server-side data fetching wrapper.
 *
 * Defensive: bei nicht konfiguriertem Sanity (initial Build vor Marketplace-
 * Integration) wird kein Call gemacht — stattdessen { data: null }.
 * Das verhindert Build-Fehler und hält dynamic routes 404-fähig.
 *
 * Hinweis: defineLive aus next-sanity ist in v11 entfernt. Live-Updates für
 * Draft-Mode kommen in Etappe 2 wenn das Studio mit Inhalten gefüllt ist.
 */
export async function sanityFetch<T = unknown>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<{ data: T | null }> {
  if (!isSanityConfigured) {
    return { data: null };
  }
  try {
    const data = await client.fetch<T>(query, params);
    return { data };
  } catch (err) {
    console.warn("sanityFetch fehlgeschlagen:", err);
    return { data: null };
  }
}

/**
 * SanityLive: Placeholder-Component für Live-Mode.
 * Wird in Etappe 2 mit echtem Live-Listener (next-sanity v11 API) ersetzt.
 */
export function SanityLive(): null {
  return null;
}
