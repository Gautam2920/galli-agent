package models

import "github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"

type RouteAnalysis struct {
	Route           routing.Route
	RouteComplexity string
	ConfidenceScore int
	Reason          string
}
