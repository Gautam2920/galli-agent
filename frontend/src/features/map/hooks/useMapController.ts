import { useDispatchStore } from '../../dispatch/store/dispatchStore';
import { useReverseGeocoding } from './useReverseGeocoding';
import type { Location } from '../../dispatch/types';

export function useMapController() {
  const {
    pickupLocation,
    setPickupLocation,
    deliveryLocation,
    setDeliveryLocation,
    activeMarkerMode,
    setActiveMarkerMode
  } = useDispatchStore();

  const { resolveAddress } = useReverseGeocoding();

  const handleMapClick = async (lat: number, lng: number) => {
    const address = await resolveAddress(lat, lng);
    const newLocation: Location = { address, lat, lng };

    if (activeMarkerMode === 'pickup') {
      setPickupLocation(newLocation);
      setActiveMarkerMode('delivery');
    } else {
      setDeliveryLocation(newLocation);
      setActiveMarkerMode('pickup');
    }
  };

  const handleMarkerDrag = async (type: 'pickup' | 'delivery', lat: number, lng: number) => {
    const address = await resolveAddress(lat, lng);
    const newLocation: Location = { address, lat, lng };

    if (type === 'pickup') {
      setPickupLocation(newLocation);
    } else {
      setDeliveryLocation(newLocation);
    }
  };

  return {
    pickupLocation,
    deliveryLocation,
    activeMarkerMode,
    setActiveMarkerMode,
    handleMapClick,
    handleMarkerDrag
  };
}
