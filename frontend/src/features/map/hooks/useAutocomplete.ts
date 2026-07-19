import { useState, useEffect, useRef } from 'react';
import { nominatimService } from '../services/nominatimService';

interface AutocompleteResult {
  address: string;
  lat: number;
  lng: number;
}

export function useAutocomplete(debounceMs = 500) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query.trim().length < 3) {
      setSuggestions([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    timerRef.current = setTimeout(async () => {
      try {
        const results = await nominatimService.search(query);
        setSuggestions(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, debounceMs]);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
    setSuggestions
  };
}
