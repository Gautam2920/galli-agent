import { useFormContext } from 'react-hook-form';
import { presetService } from '../services/presetService';
import { dispatchStorage } from '../services/dispatchStorage';

export function PresetSelector() {
  const { reset } = useFormContext();
  const presets = presetService.getPresetsList();

  const handleApplyPreset = (name: string) => {
    const values = presetService.getPresetValues(name);
    if (values) {
      reset(values);
      dispatchStorage.saveDraft(values);
    }
  };

  const handleClearDraft = () => {
    reset({
      pickupLocation: '',
      deliveryLocation: '',
      packageType: undefined,
      packageWeight: undefined,
      vehicleType: undefined,
      priority: undefined,
      deliveryDeadline: '',
      notes: '',
    });
    dispatchStorage.clearDraft();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">
          Quick Presets
        </span>
        <button
          type="button"
          onClick={handleClearDraft}
          className="text-[9px] font-bold text-accent-rose hover:underline"
        >
          Clear Draft
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => handleApplyPreset(preset.name)}
            className="px-3 py-1.5 rounded-lg bg-bg-base border border-border-subtle text-[10px] font-bold text-text-secondary hover:border-accent-indigo hover:text-accent-indigo hover:bg-bg-surface hover:shadow-flat transition-all duration-200 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
export default PresetSelector;
