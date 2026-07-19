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
} from "../types";

interface DispatchContextValue {
  pickup: Location | null;
  delivery: Location | null;
  activeMarker: ActiveMarker;

  setPickup(location: Location): void;
  setDelivery(location: Location): void;
  setActiveMarker(marker: ActiveMarker): void;

  swapLocations(): void;
  clearPickup(): void;
  clearDelivery(): void;
  resetLocations(): void;
}

const initialState: DispatchState = {
  pickup: null,
  delivery: null,
  activeMarker: "pickup",
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

      setPickup,
      setDelivery,
      setActiveMarker,

      swapLocations,
      clearPickup,
      clearDelivery,
      resetLocations,
    }),
    [state, setPickup, setDelivery, setActiveMarker, swapLocations, clearPickup, clearDelivery, resetLocations]
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