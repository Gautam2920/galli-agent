import { useEffect } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapController } from '../hooks/useMapController';
import { MapMarker } from './MapMarker';
import type { Location } from '../../dispatch/types';

const VARANASI_CENTER: [number, number] = [25.3176, 82.9739];
const DEFAULT_ZOOM = 13;

function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

function MapViewportController({
  pickup,
  delivery
}: {
  pickup: Location | null;
  delivery: Location | null;
}) {
  const map = useMapEvents({});

  useEffect(() => {
    if (pickup && delivery) {
      const bounds = L.latLngBounds([
        [pickup.lat, pickup.lng],
        [delivery.lat, delivery.lng]
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup) {
      map.setView([pickup.lat, pickup.lng], map.getZoom());
    } else if (delivery) {
      map.setView([delivery.lat, delivery.lng], map.getZoom());
    }
  }, [pickup, delivery, map]);

  useEffect(() => {
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [map]);

  return null;
}

export function MapContainer() {
  const {
    pickupLocation,
    deliveryLocation,
    handleMapClick,
    handleMarkerDrag
  } = useMapController();

  return (
    <div className="w-full h-full relative">
      <LeafletMapContainer
        center={VARANASI_CENTER}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onMapClick={handleMapClick} />
        <MapViewportController pickup={pickupLocation} delivery={deliveryLocation} />
        {pickupLocation && (
          <MapMarker
            type="pickup"
            location={pickupLocation}
            onDragEnd={handleMarkerDrag}
          />
        )}
        {deliveryLocation && (
          <MapMarker
            type="delivery"
            location={deliveryLocation}
            onDragEnd={handleMarkerDrag}
          />
        )}
      </LeafletMapContainer>
    </div>
  );
}
export default MapContainer;
