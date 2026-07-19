import { useFormContext } from 'react-hook-form';
import { LocationSearch } from '../../map/components/LocationSearch';

export function LocationSection() {
  const {
    formState: { errors }
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <LocationSearch
        type="pickup"
        label="Pickup Address"
        placeholder="Enter pickup location"
        error={errors.pickupLocation}
      />
      <LocationSearch
        type="delivery"
        label="Destination Address"
        placeholder="Enter destination"
        error={errors.deliveryLocation}
      />
    </div>
  );
}
export default LocationSection;
