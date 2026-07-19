import axios from 'axios';
import { useDispatchStore } from '../store/dispatchStore';
import type { DispatchRequest, AnalyseDeliveryResponse } from '../types';
import { dispatchStorage } from '../services/dispatchStorage';

export function useDispatchSubmission() {
  const { setCurrentRequest, setIsAnalyzing, setAnalysisResult } = useDispatchStore();

  const submitRequest = async (values: DispatchRequest): Promise<void> => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const payload = {
        pickup: {
          address: values.pickupLocation,
          latitude: values.pickupCoords?.latitude || 0,
          longitude: values.pickupCoords?.longitude || 0,
        },
        destination: {
          address: values.deliveryLocation,
          latitude: values.deliveryCoords?.latitude || 0,
          longitude: values.deliveryCoords?.longitude || 0,
        },
      };

      const response = await axios.post<AnalyseDeliveryResponse>(
        '/api/v1/delivery/analyse',
        payload
      );

      setCurrentRequest(values);
      setAnalysisResult(response.data);
      dispatchStorage.saveDraft(values);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    submitRequest,
  };
}
