import "server-only";
import { client } from "./client";
import { isSanityConfigured } from "../env";

/**
 * sanityFetch: server-side data fetching wrapper.
 *
 * Defensive: bei nicht konfiguriertem Sanity (initial Build vor Marketplace-
 * Integration) wird kein Call gemacht — stattdessen { data: null }.
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
 * sanityFetchList: typed helper für Listen-Queries.
 * GARANTIERT Array zurück — auch wenn Sanity null oder undefined returned.
 *
 * Wichtig: Return-Type ist explizit Promise<T[]> annotated, sonst inferiert
 * TypeScript bei generateStaticParams() den Return als Promise<{}> wegen
 * der ?? [] Fallback-Logik (verbindet T[] | never[]).
 */
export async function sanityFetchList<T>(args: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<T[]> {
  if (!isSanityConfigured) return [];
  try {
    const data = await client.fetch<T[] | null | undefined>(
      args.query,
      args.params ?? {},
    );
    if (!Array.isArray(data)) return [];
    return data;
  } catch (err) {
    console.warn("sanityFetchList fehlgeschlagen:", err);
    return [];
  }
}

/**
 * SanityLive: Placeholder-Component für Live-Mode.
 * Wird in Etappe 2 mit echtem Live-Listener (next-sanity v11 API) ersetzt.
 */
export function SanityLive(): null {
  return null;
}
