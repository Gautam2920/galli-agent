import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo, useRef } from "react";
import type { Location } from "@/features/dispatch";

interface MapMarkerProps {
  location: Location;
  type: "pickup" | "delivery";
  onDragEnd?: (type: "pickup" | "delivery", lat: number, lng: number) => void;
}

const pickupIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41],
});

const deliveryIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconAnchor: [12, 41],
});

export function MapMarker({
  location,
  type,
  onDragEnd,
}: MapMarkerProps) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null && onDragEnd) {
          const latLng = marker.getLatLng();
          onDragEnd(type, latLng.lat, latLng.lng);
        }
      },
    }),
    [type, onDragEnd]
  );

  return (
    <Marker
      draggable={!!onDragEnd}
      eventHandlers={eventHandlers}
      position={[location.latitude, location.longitude]}
      icon={type === "pickup" ? pickupIcon : deliveryIcon}
      ref={markerRef}
    >
      <Popup>
        <strong>
          {type === "pickup" ? "Pickup" : "Delivery"}
        </strong>
        <br />
        {location.address}
      </Popup>
    </Marker>
  );
}