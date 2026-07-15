package routing

type orsDirectionsRequest struct {
	Coordinates [][]float64 `json:"coordinates"`
}

type orsDirectionsResponse struct {
	Routes []orsRoute `json:"routes"`
}

type orsRoute struct {
	Summary orsSummary `json:"summary"`
}

type orsSummary struct {
	Distance float64 `json:"distance"`
	Duration float64 `json:"duration"`
}
