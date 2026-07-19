import { useCallback } from "react";
import type { Map as LeafletMap } from "leaflet";
import { useDispatchStore } from "@/features/dispatch";
import { useReverseGeocoding } from "./useReverseGeocoding";

export function useMapController() {
  const {
    pickup,
    delivery,
    activeMarker,
    setPickup,
    setDelivery,
  } = useDispatchStore();

  const { reverseGeocode, loading, error } =
    useReverseGeocoding();

  const handleMapClick = useCallback(
    async (latitude: number, longitude: number) => {
      const location = await reverseGeocode(
        latitude,
        longitude
      );

      if (!location) {
        return;
      }

      if (activeMarker === "pickup") {
        setPickup(location);
      } else {
        setDelivery(location);
      }
    },
    [
      activeMarker,
      reverseGeocode,
      setPickup,
      setDelivery,
    ]
  );

  const handleMarkerDrag = useCallback(
    async (type: "pickup" | "delivery", latitude: number, longitude: number) => {
      const location = await reverseGeocode(latitude, longitude);
      if (!location) return;
      if (type === "pickup") {
        setPickup(location);
      } else {
        setDelivery(location);
      }
    },
    [reverseGeocode, setPickup, setDelivery]
  );

  const focusLocation = useCallback(
    (
      map: LeafletMap,
      latitude: number,
      longitude: number,
      zoom = 15
    ) => {
      map.flyTo([latitude, longitude], zoom, {
        duration: 0.5,
      });
    },
    []
  );

  return {
    pickup,
    delivery,
    activeMarker,
    loading,
    error,
    handleMapClick,
    handleMarkerDrag,
    focusLocation,
  };
}