import { Marker, Popup } from 'react-leaflet';
import { useRef, useMemo } from 'react';
import L from 'leaflet';
import type { Location } from '../../dispatch/types';

interface MapMarkerProps {
  type: 'pickup' | 'delivery';
  location: Location;
  onDragEnd: (type: 'pickup' | 'delivery', lat: number, lng: number) => void;
}

export function MapMarker({ type, location, onDragEnd }: MapMarkerProps) {
  const markerRef = useRef<any>(null);

  const icon = useMemo(() => {
    const colorClass = type === 'pickup' ? 'bg-[#725AC1]' : 'bg-[#8D86C9]';
    return L.divIcon({
      html: `<div class="flex items-center justify-center w-8 h-8 rounded-full ${colorClass} text-white shadow-overlay border border-white">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
             </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  }, [type]);

  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const latLng = marker.getLatLng();
        onDragEnd(type, latLng.lat, latLng.lng);
      }
    }
  }), [type, onDragEnd]);

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={[location.lat, location.lng]}
      icon={icon}
      ref={markerRef}
    >
      <Popup>
        <div className="text-xs font-sans p-1">
          <p className="font-bold uppercase text-[9px] text-[#CAC4CE] tracking-wider mb-1">
            {type === 'pickup' ? 'Pickup Location' : 'Delivery Destination'}
          </p>
          <p className="text-[#242038] leading-normal">{location.address}</p>
        </div>
      </Popup>
    </Marker>
  );
}
export default MapMarker;
