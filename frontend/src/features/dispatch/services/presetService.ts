import type { DispatchRequest } from '../types';

function getFutureISOString(minutes: number): string {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

export const PRESETS: Record<
  string,
  Omit<DispatchRequest, 'deliveryDeadline' | 'notes'> & { minutesOffset: number }
> = {
  food: {
    pickupLocation: 'Varanasi Junction Railway Station',
    deliveryLocation: 'Banaras Hindu University',
    packageType: 'food',
    packageWeight: 1.5,
    vehicleType: 'motorcycle',
    priority: 'urgent',
    minutesOffset: 45,
  },
  medicine: {
    pickupLocation: 'Apex Hospital Varanasi',
    deliveryLocation: 'Sarnath Archaeological Site',
    packageType: 'medicine',
    packageWeight: 0.8,
    vehicleType: 'electric_van',
    priority: 'critical',
    minutesOffset: 60,
  },
  grocery: {
    pickupLocation: 'IP Mall Sigra Varanasi',
    deliveryLocation: 'Kashi Vishwanath Temple',
    packageType: 'grocery',
    packageWeight: 6.5,
    vehicleType: 'motorcycle',
    priority: 'high',
    minutesOffset: 90,
  },
  electronics: {
    pickupLocation: 'Rathyatra Crossing Varanasi',
    deliveryLocation: 'Assi Ghat Varanasi',
    packageType: 'electronics',
    packageWeight: 12.0,
    vehicleType: 'electric_van',
    priority: 'standard',
    minutesOffset: 180,
  },
  heavy_freight: {
    pickupLocation: 'Ramnagar Industrial Area Varanasi',
    deliveryLocation: 'Babatpur Varanasi Airport',
    packageType: 'heavy_freight',
    packageWeight: 1500.0,
    vehicleType: 'box_truck',
    priority: 'standard',
    minutesOffset: 1440,
  },
};

export const presetService = {
  getPresetsList(): { name: string; label: string }[] {
    return [
      { name: 'food', label: 'Food Delivery' },
      { name: 'medicine', label: 'Medicine' },
      { name: 'grocery', label: 'Grocery' },
      { name: 'electronics', label: 'Electronics' },
      { name: 'heavy_freight', label: 'Heavy Freight' },
    ];
  },

  getPresetValues(name: string): DispatchRequest | null {
    const config = PRESETS[name];
    if (!config) return null;
    return {
      pickupLocation: config.pickupLocation,
      deliveryLocation: config.deliveryLocation,
      packageType: config.packageType,
      packageWeight: config.packageWeight,
      vehicleType: config.vehicleType,
      priority: config.priority,
      deliveryDeadline: getFutureISOString(config.minutesOffset),
      notes: '',
    };
  },
};
