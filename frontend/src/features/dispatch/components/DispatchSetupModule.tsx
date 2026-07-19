import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, Loader2 } from 'lucide-react';
import { dispatchSchema } from '../schemas/dispatchSchema';
import type { DispatchFormValues } from '../schemas/dispatchSchema';
import { dispatchStorage } from '../services/dispatchStorage';
import { useDispatchSubmission } from '../hooks/useDispatchSubmission';
import { useDispatchStore } from '../store/dispatchStore';
import { PresetSelector } from './PresetSelector';
import { LocationSection } from './LocationSection';
import { PackageSection } from './PackageSection';
import { DeliverySection } from './DeliverySection';
import type { DispatchRequest } from '../types';

export function DispatchSetupModule() {
  const { isAnalyzing } = useDispatchStore();
  const { submitRequest } = useDispatchSubmission();

  const savedDraft = dispatchStorage.getDraft();

  const methods = useForm<DispatchFormValues>({
    resolver: zodResolver(dispatchSchema),
    mode: 'onChange',
    defaultValues: {
      pickupLocation: savedDraft?.pickupLocation || '',
      deliveryLocation: savedDraft?.deliveryLocation || '',
      packageType: savedDraft?.packageType || undefined,
      packageWeight: savedDraft?.packageWeight || undefined,
      vehicleType: savedDraft?.vehicleType || undefined,
      priority: savedDraft?.priority || undefined,
      deliveryDeadline: savedDraft?.deliveryDeadline || '',
      notes: savedDraft?.notes || '',
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = methods.watch((value) => {
      dispatchStorage.saveDraft(value as Partial<DispatchRequest>);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const { pickup, delivery } = useDispatchStore();

  const onSubmit = async (data: DispatchFormValues) => {
    await submitRequest({
      ...data,
      pickupCoords: pickup,
      deliveryCoords: delivery
    } as DispatchRequest);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <PresetSelector />

        <div className="border-t border-border-subtle pt-5 flex flex-col gap-5">
          <LocationSection />
          <PackageSection />
          <DeliverySection />
        </div>

        <button
          type="submit"
          disabled={!isValid || isAnalyzing}
          className="mt-2 w-full h-11 rounded-xl text-xs font-semibold text-button-primary-text bg-accent-indigo hover:bg-accent-purple active:scale-98 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:active:scale-100 transition-all duration-200 shadow-card border border-accent-indigo/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing Pipeline...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Analyze Route</span>
            </>
          )}
        </button>
      </form>
    </FormProvider>
  );
}
export default DispatchSetupModule;
