import { useFormContext } from 'react-hook-form';

export function DeliverySection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="vehicleType"
            className="text-[9px] font-bold uppercase tracking-wider text-text-secondary"
          >
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            {...register('vehicleType')}
            className={`w-full h-11 px-4 rounded-xl border bg-bg-base/70 text-xs focus:outline-none focus:ring-2 focus:ring-accent-indigo/15 transition-all duration-200 ${
              errors.vehicleType
                ? 'border-accent-rose focus:border-accent-rose'
                : 'border-border-subtle focus:border-accent-indigo'
            }`}
          >
            <option value="">Select vehicle</option>
            <option value="bicycle">Bicycle</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="electric_van">Electric Van</option>
            <option value="cargo_van">Cargo Van</option>
            <option value="box_truck">Box Truck</option>
            <option value="refrigerated_truck">Refrigerated Truck</option>
          </select>
          {errors.vehicleType && (
            <span className="text-[10px] font-bold text-accent-rose mt-0.5">
              {errors.vehicleType.message as string}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="priority"
            className="text-[9px] font-bold uppercase tracking-wider text-text-secondary"
          >
            Priority
          </label>
          <select
            id="priority"
            {...register('priority')}
            className={`w-full h-11 px-4 rounded-xl border bg-bg-base/70 text-xs focus:outline-none focus:ring-2 focus:ring-accent-indigo/15 transition-all duration-200 ${
              errors.priority
                ? 'border-accent-rose focus:border-accent-rose'
                : 'border-border-subtle focus:border-accent-indigo'
            }`}
          >
            <option value="">Select priority</option>
            <option value="standard">Standard</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>
          {errors.priority && (
            <span className="text-[10px] font-bold text-accent-rose mt-0.5">
              {errors.priority.message as string}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="deliveryDeadline"
          className="text-[9px] font-bold uppercase tracking-wider text-text-secondary"
        >
          Delivery Deadline
        </label>
        <input
          id="deliveryDeadline"
          type="datetime-local"
          {...register('deliveryDeadline')}
          className={`w-full h-11 px-4 rounded-xl border bg-bg-base/70 text-xs focus:outline-none focus:ring-2 focus:ring-accent-indigo/15 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(36,32,56,0.02)] ${
            errors.deliveryDeadline
              ? 'border-accent-rose focus:border-accent-rose'
              : 'border-border-subtle focus:border-accent-indigo'
          }`}
        />
        {errors.deliveryDeadline && (
          <span className="text-[10px] font-bold text-accent-rose mt-0.5">
            {errors.deliveryDeadline.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="notes"
          className="text-[9px] font-bold uppercase tracking-wider text-text-secondary"
        >
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          placeholder="Additional dispatch notes..."
          rows={3}
          {...register('notes')}
          className={`w-full p-4 rounded-xl border bg-bg-base/70 text-xs focus:outline-none focus:ring-2 focus:ring-accent-indigo/15 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(36,32,56,0.02)] resize-none ${
            errors.notes
              ? 'border-accent-rose focus:border-accent-rose'
              : 'border-border-subtle focus:border-accent-indigo'
          }`}
        />
        {errors.notes && (
          <span className="text-[10px] font-bold text-accent-rose mt-0.5">
            {errors.notes.message as string}
          </span>
        )}
      </div>
    </div>
  );
}
export default DeliverySection;
