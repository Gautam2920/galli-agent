import { lazy } from 'react';

export const LazyMap = lazy(() => import('./components/MapContainer'));
export { useMapController } from './hooks/useMapController';
export { useAutocomplete } from './hooks/useAutocomplete';
export { useReverseGeocoding } from './hooks/useReverseGeocoding';
export { nominatimService } from './services/nominatimService';
