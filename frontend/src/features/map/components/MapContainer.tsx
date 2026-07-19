import { MapContainer as LeafletMap, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useMapController } from "../hooks/useMapController";
import { MapMarker } from "./MapMarker";

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]; // India
const DEFAULT_ZOOM = 5;

function MapEvents() {
  const { handleMapClick } = useMapController();

  useMapEvents({
    click(event) {
      handleMapClick(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

export function MapContainer() {
  const { pickup, delivery, handleMarkerDrag } = useMapController();

  return (
    <LeafletMap
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapEvents />

      {pickup && (
        <MapMarker
          location={pickup}
          type="pickup"
          onDragEnd={handleMarkerDrag}
        />
      )}

      {delivery && (
        <MapMarker
          location={delivery}
          type="delivery"
          onDragEnd={handleMarkerDrag}
        />
      )}
    </LeafletMap>
  );
}

export default MapContainer;