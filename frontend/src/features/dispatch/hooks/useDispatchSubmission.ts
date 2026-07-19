import { useDispatchStore } from '../store/dispatchStore';
import type { DispatchRequest } from '../types';
import { dispatchStorage } from '../services/dispatchStorage';

export function useDispatchSubmission() {
  const { setCurrentRequest, setIsAnalyzing } = useDispatchStore();

  const submitRequest = async (values: DispatchRequest): Promise<void> => {
    setIsAnalyzing(true);
    try {
      // eslint-disable-next-line no-console
      console.log('DispatchRequest payload:', JSON.stringify(values, null, 2));
      setCurrentRequest(values);
      dispatchStorage.saveDraft(values);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    submitRequest,
  };
}
