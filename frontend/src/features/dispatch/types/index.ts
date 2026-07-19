export type PackageType =
  | "document"
  | "parcel"
  | "food"
  | "medicine"
  | "grocery"
  | "electronics"
  | "heavy_freight"
  | "other";

export type VehicleType =
  | "bicycle"
  | "motorcycle"
  | "electric_van"
  | "cargo_van"
  | "box_truck"
  | "refrigerated_truck";

export type PriorityLevel =
  | "standard"
  | "high"
  | "urgent"
  | "critical";

export type ActiveMarker = "pickup" | "delivery";

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export interface RouteResponse {
  distanceKilometers: number;
  estimatedMinutes: number;
  complexity: string;
  reason: string;
}

export interface WeatherResponse {
  condition: string;
  temperature: number;
  riskScore: number;
  reason: string;
}

export interface TrafficResponse {
  congestionLevel: number;
  riskScore: number;
  reason: string;
}

export interface RiskResponse {
  level: string;
  riskScore: number;
  reason: string;
}

export interface PartnerResponse {
  name: string;
  rating: number;
  reason: string;
}

export interface OperationalSummaryResponse {
  decision: string;
  confidence: number;
  overallAssessment: string;
  routeSummary: string;
  weatherSummary: string;
  trafficSummary: string;
  riskSummary: string;
  partnerSummary: string;
}

export interface AnalyseDeliveryResponse {
  decision: string;
  confidence: number;
  operationalSummary: OperationalSummaryResponse;
  route: RouteResponse;
  weather: WeatherResponse;
  traffic: TrafficResponse;
  risk: RiskResponse;
  partner: PartnerResponse;
  reason: string;
  aiExplanation?: string;
}

export interface DispatchState {
  pickup: Location | null;
  delivery: Location | null;
  activeMarker: ActiveMarker;
  analysisResult: AnalyseDeliveryResponse | null;
  isAnalyzing: boolean;
  currentRequest: DispatchRequest | null;
}

export interface DispatchRequest {
  pickupLocation: string;
  deliveryLocation: string;

  pickupCoords?: Location | null;
  deliveryCoords?: Location | null;

  packageType: PackageType;
  packageWeight: number;
  vehicleType: VehicleType;
  priority: PriorityLevel;
  deliveryDeadline: string;
  notes?: string;
}

export interface DispatchPreset {
  name: string;
  label: string;
  values: Omit<DispatchRequest, "notes"> & {
    notes?: string;
  };
}