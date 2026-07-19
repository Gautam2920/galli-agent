import { useState } from 'react';
import { nominatimService } from '../services/nominatimService';

export function useReverseGeocoding() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveAddress = async (lat: number, lng: number): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      const address = await nominatimService.reverse(lat, lng);
      return address;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reverse geocode');
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resolveAddress,
    isLoading,
    error
  };
}
