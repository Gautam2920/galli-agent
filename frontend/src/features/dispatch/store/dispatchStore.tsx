import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  ActiveMarker,
  DispatchState,
  Location,
  AnalyseDeliveryResponse,
  DispatchRequest,
} from "../types";

interface DispatchContextValue {
  pickup: Location | null;
  delivery: Location | null;
  activeMarker: ActiveMarker;
  analysisResult: AnalyseDeliveryResponse | null;
  isAnalyzing: boolean;
  currentRequest: DispatchRequest | null;

  setPickup(location: Location): void;
  setDelivery(location: Location): void;
  setActiveMarker(marker: ActiveMarker): void;
  setAnalysisResult(result: AnalyseDeliveryResponse | null): void;
  setIsAnalyzing(isAnalyzing: boolean): void;
  setCurrentRequest(request: DispatchRequest | null): void;

  swapLocations(): void;
  clearPickup(): void;
  clearDelivery(): void;
  resetLocations(): void;
}

const initialState: DispatchState = {
  pickup: null,
  delivery: null,
  activeMarker: "pickup",
  analysisResult: null,
  isAnalyzing: false,
  currentRequest: null,
};

const DispatchContext = createContext<DispatchContextValue | undefined>(
  undefined
);

export function DispatchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState(initialState);

  const setPickup = useCallback(
    (pickup: Location) =>
      setState((s) => ({ ...s, pickup })),
    []
  );

  const setDelivery = useCallback(
    (delivery: Location) =>
      setState((s) => ({ ...s, delivery })),
    []
  );

  const setActiveMarker = useCallback(
    (activeMarker: ActiveMarker) =>
      setState((s) => ({ ...s, activeMarker })),
    []
  );

  const swapLocations = useCallback(() => {
    setState((s) => ({
      ...s,
      pickup: s.delivery,
      delivery: s.pickup,
    }));
  }, []);

  const clearPickup = useCallback(
    () =>
      setState((s) => ({
        ...s,
        pickup: null,
      })),
    []
  );

  const clearDelivery = useCallback(
    () =>
      setState((s) => ({
        ...s,
        delivery: null,
      })),
    []
  );

  const setAnalysisResult = useCallback(
    (analysisResult: AnalyseDeliveryResponse | null) =>
      setState((s) => ({ ...s, analysisResult })),
    []
  );

  const setIsAnalyzing = useCallback(
    (isAnalyzing: boolean) =>
      setState((s) => ({ ...s, isAnalyzing })),
    []
  );

  const setCurrentRequest = useCallback(
    (currentRequest: DispatchRequest | null) =>
      setState((s) => ({ ...s, currentRequest })),
    []
  );

  const resetLocations = useCallback(() => {
    setState((s) => ({
      ...s,
      pickup: null,
      delivery: null,
    }));
  }, []);

  const value = useMemo(
    () => ({
      pickup: state.pickup,
      delivery: state.delivery,
      activeMarker: state.activeMarker,
      analysisResult: state.analysisResult,
      isAnalyzing: state.isAnalyzing,
      currentRequest: state.currentRequest,

      setPickup,
      setDelivery,
      setActiveMarker,
      setAnalysisResult,
      setIsAnalyzing,
      setCurrentRequest,

      swapLocations,
      clearPickup,
      clearDelivery,
      resetLocations,
    }),
    [
      state,
      setPickup,
      setDelivery,
      setActiveMarker,
      setAnalysisResult,
      setIsAnalyzing,
      setCurrentRequest,
      swapLocations,
      clearPickup,
      clearDelivery,
      resetLocations,
    ]
  );

  return (
    <DispatchContext.Provider value={value}>
      {children}
    </DispatchContext.Provider>
  );
}

export function useDispatchStore() {
  const context = useContext(DispatchContext);

  if (!context) {
    throw new Error(
      "useDispatchStore must be used within DispatchProvider."
    );
  }

  return context;
}