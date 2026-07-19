import { useEffect, useRef, useState } from "react";

import { nominatimService } from "../services/nominatimService";
import type { Location } from "@/features/dispatch";

const DEBOUNCE_DELAY = 300;

export function useAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);
  const ignoreNextSearchRef = useRef(false);

  useEffect(() => {
    if (ignoreNextSearchRef.current) {
      ignoreNextSearchRef.current = false;
      return;
    }

    const trimmed = query.trim();

    if (trimmed.length < 3) {
      controllerRef.current?.abort();
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const timeout = setTimeout(async () => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const locations = await nominatimService.searchLocations(
          trimmed,
          controller.signal
        );

        setResults(locations);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError("Unable to fetch locations.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeout);
  }, [query]);

  const selectLocation = (address: string) => {
    ignoreNextSearchRef.current = true;
    setQuery(address);
    setResults([]);
  };

  const clear = () => {
    controllerRef.current?.abort();
    setQuery("");
    setResults([]);
    setLoading(false);
    setError(null);
  };

  return {
    query,
    setQuery,
    results,
    setResults,
    selectLocation,
    loading,
    error,
    clear,
  };
}