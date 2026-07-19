import { useCallback, useState } from "react";

import { nominatimService } from "../services/nominatimService";
import type { Location } from "@/features/dispatch";

export function useReverseGeocoding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reverseGeocode = useCallback(
    async (
      latitude: number,
      longitude: number,
      signal?: AbortSignal
    ): Promise<Location | null> => {
      setLoading(true);
      setError(null);

      try {
        return await nominatimService.reverseGeocode(
          latitude,
          longitude,
          signal
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Reverse geocoding failed.")
        );

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    reverseGeocode,
    loading,
    error,
  };
}