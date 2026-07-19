import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Loader2 } from "lucide-react";

import type { Location } from "@/features/dispatch";
import { useAutocomplete } from "../hooks/useAutocomplete";

interface LocationSearchProps {
  value?: string;
  placeholder?: string;
  onSelect(location: Location): void;
  onFocus?(): void;
  onChange?(value: string): void;
}

export function LocationSearch({
  value = "",
  placeholder = "Search location...",
  onSelect,
  onFocus,
  onChange,
}: LocationSearchProps) {
  const {
    query,
    setQuery,
    results,
    setResults,
    selectLocation,
    loading,
    error,
  } = useAutocomplete();

  useEffect(() => {
    setQuery(value);
  }, [value, setQuery]);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const updateCoords = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownCoords({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      updateCoords();
      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords, true);
      window.removeEventListener("resize", updateCoords);
    };
  }, [results]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setResults]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange?.(e.target.value);
          }}
          onFocus={onFocus}
          placeholder={placeholder}
          className="w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-sm outline-none"
        />

        {loading && (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin" />
        )}
      </div>

      {results.length > 0 &&
        dropdownCoords &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] mt-1 max-h-64 overflow-auto rounded-lg border border-border-subtle bg-bg-surface shadow-overlay"
            style={{
              top: `${dropdownCoords.top}px`,
              left: `${dropdownCoords.left}px`,
              width: `${dropdownCoords.width}px`,
            }}
          >
            {results.map((location) => (
              <button
                key={`${location.latitude}-${location.longitude}-${location.address}`}
                type="button"
                className="w-full px-4 py-3 text-left hover:bg-muted text-sm block cursor-pointer text-text-primary"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(location);
                  selectLocation(location.address);
                }}
              >
                {location.address}
              </button>
            ))}
          </div>,
          document.body
        )}

      {error && (
        <p className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}