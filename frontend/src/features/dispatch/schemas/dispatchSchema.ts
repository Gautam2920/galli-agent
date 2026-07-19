import { z } from 'zod';

export const dispatchSchema = z
  .object({
    pickupLocation: z
      .string()
      .min(1, 'Pickup location is required')
      .max(1000, 'Pickup location must be under 1000 characters'),
    deliveryLocation: z
      .string()
      .min(1, 'Delivery location is required')
      .max(1000, 'Delivery location must be under 1000 characters'),
    packageType: z.enum(
      [
        'document',
        'parcel',
        'food',
        'medicine',
        'grocery',
        'electronics',
        'heavy_freight',
        'other',
      ] as const,
      {
        message: 'Please select a package type',
      }
    ),
    packageWeight: z
      .number({ message: 'Weight must be a number' })
      .positive('Weight must be greater than zero')
      .max(5000, 'Weight must not exceed 5000 kg'),
    vehicleType: z.enum(
      ['bicycle', 'motorcycle', 'electric_van', 'cargo_van', 'box_truck', 'refrigerated_truck'] as const,
      {
        message: 'Please select a vehicle type',
      }
    ),
    priority: z.enum(['standard', 'high', 'urgent', 'critical'] as const, {
      message: 'Please select a priority level',
    }),
    deliveryDeadline: z
      .string()
      .min(1, 'Delivery deadline is required')
      .refine((val) => {
        const date = new Date(val);
        return date.getTime() > Date.now();
      }, 'Deadline must be in the future'),
    notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
  })
  .refine(
    (data) =>
      data.pickupLocation.trim().toLowerCase() !== data.deliveryLocation.trim().toLowerCase(),
    {
      message: 'Delivery location cannot be identical to pickup location',
      path: ['deliveryLocation'],
    }
  );

export type DispatchFormValues = z.infer<typeof dispatchSchema>;
