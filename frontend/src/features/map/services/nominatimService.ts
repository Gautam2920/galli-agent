import type { Location } from "@/features/dispatch";

const BASE_URL = "https://nominatim.openstreetmap.org";
const cache = new Map<string, unknown>();

interface NominatimSearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface NominatimReverseResult {
  display_name: string;
  lat: string;
  lon: string;
}

const toLocation = (
  result: NominatimSearchResult | NominatimReverseResult
): Location => ({
  address: result.display_name,
  latitude: Number(result.lat),
  longitude: Number(result.lon),
});

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  if (cache.has(url)) {
    return cache.get(url) as T;
  }

  const response = await fetch(url, {
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 429) {
    throw new Error("Nominatim rate limit exceeded.");
  }

  if (!response.ok) {
    throw new Error("Failed to fetch location data.");
  }

  const data = (await response.json()) as T;

  cache.set(url, data);

  return data;
}

export async function searchLocations(
  query: string,
  signal?: AbortSignal
): Promise<Location[]> {
  const trimmed = query.trim();

  if (trimmed.length < 3) {
    return [];
  }

  const url =
    `${BASE_URL}/search?` +
    new URLSearchParams({
      q: trimmed,
      format: "jsonv2",
      limit: "5",
      addressdetails: "0",
    });

  const results = await request<NominatimSearchResult[]>(url, signal);

  return results.map(toLocation);
}

export async function reverseGeocode(
  latitude: number,
  longitude: number,
  signal?: AbortSignal
): Promise<Location | null> {
  const url =
    `${BASE_URL}/reverse?` +
    new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      format: "jsonv2",
    });

  try {
    const result = await request<NominatimReverseResult>(url, signal);
    return toLocation(result);
  } catch {
    return null;
  }
}

export const nominatimService = {
  searchLocations,
  reverseGeocode,
};