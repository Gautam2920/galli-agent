export type PackageType =
  | 'document'
  | 'parcel'
  | 'food'
  | 'medicine'
  | 'grocery'
  | 'electronics'
  | 'heavy_freight'
  | 'other';

export type VehicleType =
  | 'bicycle'
  | 'motorcycle'
  | 'electric_van'
  | 'cargo_van'
  | 'box_truck'
  | 'refrigerated_truck';

export type PriorityLevel = 'standard' | 'high' | 'urgent' | 'critical';

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface DispatchRequest {
  pickupLocation: string;
  deliveryLocation: string;
  pickupCoords?: Location | null;
  deliveryCoords?: Location | null;
  packageType: PackageType;
  packageWeight: number;
  vehicleType: VehicleType;
  priority: PriorityLevel;
  deliveryDeadline: string;
  notes?: string;
}

export interface DispatchPreset {
  name: string;
  label: string;
  values: Omit<DispatchRequest, 'notes'> & { notes?: string };
}
