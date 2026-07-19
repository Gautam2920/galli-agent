import axios from 'axios';

interface NominatimSearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface NominatimReverseResult {
  display_name: string;
}

const searchCache = new Map<string, any[]>();
const reverseCache = new Map<string, string>();
let lastRequestTime = 0;

async function throttleRequest(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < 1000) {
    const delay = 1000 - elapsed;
    lastRequestTime = now + delay;
    await new Promise((resolve) => setTimeout(resolve, delay));
  } else {
    lastRequestTime = now;
  }
}

export const nominatimService = {
  async search(query: string): Promise<{ address: string; lat: number; lng: number }[]> {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length < 3) return [];
    
    if (searchCache.has(trimmed)) {
      return searchCache.get(trimmed) || [];
    }

    await throttleRequest();

    try {
      const response = await axios.get<NominatimSearchResult[]>(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: query,
            format: 'json',
            limit: 5,
            addressdetails: 1
          },
          headers: {
            'User-Agent': 'GalliAgentLogistics/1.0.0'
          }
        }
      );

      const results = (response.data || []).map((item) => ({
        address: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
      }));

      searchCache.set(trimmed, results);
      return results;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment.');
      }
      throw new Error('Failed to fetch location suggestions.');
    }
  },

  async reverse(lat: number, lng: number): Promise<string> {
    const cacheKey = `${lat.toFixed(5)},${lng.toFixed(5)}`;
    if (reverseCache.has(cacheKey)) {
      return reverseCache.get(cacheKey) || '';
    }

    await throttleRequest();

    try {
      const response = await axios.get<NominatimReverseResult>(
        'https://nominatim.openstreetmap.org/reverse',
        {
          params: {
            lat,
            lon: lng,
            format: 'json'
          },
          headers: {
            'User-Agent': 'GalliAgentLogistics/1.0.0'
          }
        }
      );

      const address = response.data?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      reverseCache.set(cacheKey, address);
      return address;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment.');
      }
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  }
};
