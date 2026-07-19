import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { useDispatchStore } from "@/features/dispatch";
import { LocationSearch } from "../../map/components/LocationSearch";
import type { Location } from "@/features/dispatch";

export function LocationSection() {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const {
    pickup,
    delivery,
    setPickup,
    setDelivery,
    setActiveMarker,
    clearPickup,
    clearDelivery,
  } = useDispatchStore();

  useEffect(() => {
    setValue("pickupLocation", pickup?.address || "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [pickup?.address, setValue]);

  useEffect(() => {
    setValue("deliveryLocation", delivery?.address || "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [delivery?.address, setValue]);

  const handlePickupSelect = (location: Location) => {
    setPickup(location);
  };

  const handleDeliverySelect = (location: Location) => {
    setDelivery(location);
  };

  const handlePickupChange = (val: string) => {
    setValue("pickupLocation", val, {
      shouldDirty: true,
      shouldValidate: true,
    });
    if (!val) {
      clearPickup();
    }
  };

  const handleDeliveryChange = (val: string) => {
    setValue("deliveryLocation", val, {
      shouldDirty: true,
      shouldValidate: true,
    });
    if (!val) {
      clearDelivery();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Pickup Address
        </label>

        <LocationSearch
          value={pickup?.address || ""}
          placeholder="Enter pickup location"
          onSelect={handlePickupSelect}
          onFocus={() => setActiveMarker("pickup")}
          onChange={handlePickupChange}
        />

        {errors.pickupLocation && (
          <p className="mt-1 text-sm text-destructive">
            {String(errors.pickupLocation.message)}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Destination Address
        </label>

        <LocationSearch
          value={delivery?.address || ""}
          placeholder="Enter destination"
          onSelect={handleDeliverySelect}
          onFocus={() => setActiveMarker("delivery")}
          onChange={handleDeliveryChange}
        />

        {errors.deliveryLocation && (
          <p className="mt-1 text-sm text-destructive">
            {String(errors.deliveryLocation.message)}
          </p>
        )}
      </div>
    </div>
  );
}

export default LocationSection;