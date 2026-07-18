package main

import (
	"fmt"

	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
	"github.com/Gautam2920/galli-agent/backend/internal/spatial/sampling"
)

func main() {
	geometry := make([]routing.RoutePoint, 100)

	for i := range geometry {
		geometry[i] = routing.RoutePoint{
			Latitude:  float64(i),
			Longitude: float64(i),
		}
	}

	samples := sampling.SampleRoute(geometry, 10)

	fmt.Printf("Original Points: %d\n", len(geometry))
	fmt.Printf("Sampled Points: %d\n\n", len(samples))

	for i, point := range samples {
		fmt.Printf("%2d -> Latitude: %.0f\n", i, point.Latitude)
	}
}
