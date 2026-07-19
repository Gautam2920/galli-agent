import { useFormContext } from 'react-hook-form';

export function PackageSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="packageType"
          className="text-[9px] font-bold uppercase tracking-wider text-text-secondary"
        >
          Package Type
        </label>
        <select
          id="packageType"
          {...register('packageType')}
          className={`w-full h-11 px-4 rounded-xl border bg-bg-base/70 text-xs focus:outline-none focus:ring-2 focus:ring-accent-indigo/15 transition-all duration-200 ${
            errors.packageType
              ? 'border-accent-rose focus:border-accent-rose'
              : 'border-border-subtle focus:border-accent-indigo'
          }`}
        >
          <option value="">Select type</option>
          <option value="document">Document</option>
          <option value="parcel">Parcel</option>
          <option value="food">Food</option>
          <option value="medicine">Medicine</option>
          <option value="grocery">Grocery</option>
          <option value="electronics">Electronics</option>
          <option value="heavy_freight">Heavy Freight</option>
          <option value="other">Other</option>
        </select>
        {errors.packageType && (
          <span className="text-[10px] font-bold text-accent-rose mt-0.5">
            {errors.packageType.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="packageWeight"
          className="text-[9px] font-bold uppercase tracking-wider text-text-secondary"
        >
          Weight (kg)
        </label>
        <input
          id="packageWeight"
          type="number"
          step="any"
          placeholder="0.0"
          {...register('packageWeight', { valueAsNumber: true })}
          className={`w-full h-11 px-4 rounded-xl border bg-bg-base/70 text-xs focus:outline-none focus:ring-2 focus:ring-accent-indigo/15 transition-all duration-200 shadow-[inset_0_2px_4px_rgba(36,32,56,0.02)] ${
            errors.packageWeight
              ? 'border-accent-rose focus:border-accent-rose'
              : 'border-border-subtle focus:border-accent-indigo'
          }`}
        />
        {errors.packageWeight && (
          <span className="text-[10px] font-bold text-accent-rose mt-0.5">
            {errors.packageWeight.message as string}
          </span>
        )}
      </div>
    </div>
  );
}
export default PackageSection;
