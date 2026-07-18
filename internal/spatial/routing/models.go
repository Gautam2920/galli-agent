package routing

type Route struct {
	Summary  RouteSummary
	Geometry []RoutePoint
}

type RouteSummary struct {
	DistanceKilometers float64
	EstimatedMinutes   int
}

type RoutePoint struct {
	Latitude  float64
	Longitude float64
}
