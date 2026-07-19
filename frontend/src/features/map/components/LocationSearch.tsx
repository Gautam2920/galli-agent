import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin, Loader2 } from 'lucide-react';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { useDispatchStore } from '../../dispatch/store/dispatchStore';

interface LocationSearchProps {
  type: 'pickup' | 'delivery';
  label: string;
  placeholder: string;
  error?: any;
}

export function LocationSearch({ type, label, placeholder, error }: LocationSearchProps) {
  const { setValue } = useFormContext();
  const {
    pickupLocation,
    deliveryLocation,
    setPickupLocation,
    setDeliveryLocation,
    setActiveMarkerMode
  } = useDispatchStore();

  const storeLocation = type === 'pickup' ? pickupLocation : deliveryLocation;

  const {
    query,
    setQuery,
    suggestions,
    isLoading,
    setSuggestions
  } = useAutocomplete(500);

  useEffect(() => {
    if (storeLocation) {
      setQuery(storeLocation.address);
      setValue(type === 'pickup' ? 'pickupLocation' : 'deliveryLocation', storeLocation.address, {
        shouldValidate: true
      });
    } else {
      setQuery('');
      setValue(type === 'pickup' ? 'pickupLocation' : 'deliveryLocation', '', {
        shouldValidate: true
      });
    }
  }, [storeLocation, setValue, type, setQuery]);

  const handleSelect = (item: { address: string; lat: number; lng: number }) => {
    const loc = { address: item.address, lat: item.lat, lng: item.lng };
    if (type === 'pickup') {
      setPickupLocation(loc);
      setActiveMarkerMode('delivery');
    } else {
      setDeliveryLocation(loc);
      setActiveMarkerMode('pickup');
    }
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setValue(type === 'pickup' ? 'pickupLocation' : 'deliveryLocation', val, {
      shouldValidate: true
    });
    if (!val) {
      if (type === 'pickup') {
        setPickupLocation(null);
      } else {
        setDeliveryLocation(null);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5 relative">
      <div className="flex items-center justify-between">
        <label
          htmlFor={`${type}-search`}
          className="text-[9px] font-bold uppercase tracking-wider text-text-secondary"
        >
          {label}
        </label>
        {isLoading && <Loader2 className="h-3 w-3 animate-spin text-accent-indigo" />}
      </div>
      
      <div className="relative">
        <input
          id={`${type}-search`}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full h-11 pl-10 pr-4 rounded-xl border bg-bg-base/70 text-xs focus:outline-none focus:ring-2 focus:ring-accent-indigo/15 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(36,32,56,0.02)] ${
            error
              ? 'border-accent-rose focus:border-accent-rose'
              : 'border-border-subtle focus:border-accent-indigo'
          }`}
        />
        <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 top-[64px] rounded-xl border border-border-subtle bg-bg-surface shadow-overlay max-h-48 overflow-y-auto p-1.5">
          {suggestions.map((item) => (
            <button
              key={`${item.lat}-${item.lng}-${item.address}`}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-[11px] text-text-primary hover:bg-bg-base hover:text-accent-indigo transition-colors duration-150 truncate cursor-pointer"
            >
              {item.address}
            </button>
          ))}
        </div>
      )}

      {error && (
        <span className="text-[10px] font-bold text-accent-rose mt-0.5">
          {error.message as string}
        </span>
      )}
    </div>
  );
}
export default LocationSearch;
