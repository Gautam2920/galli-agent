import type { Location } from "./Location";

export type ActiveMarker = "pickup" | "delivery";

export interface DispatchState {
  pickup: Location | null;
  delivery: Location | null;
  activeMarker: ActiveMarker;
}