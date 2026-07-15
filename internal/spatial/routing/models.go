package routing

type Route struct {
	Summary RouteSummary
}

type RouteSummary struct {
	DistanceKilometers float64
	EstimatedMinutes   int
}
