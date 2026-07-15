package main

import (
	"context"
	"fmt"
	"log"

	"github.com/Gautam2920/galli-agent/backend/config"
	"github.com/Gautam2920/galli-agent/backend/internal/location"
	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
)

func main() {

	cfg := config.Load()

	provider := routing.NewOpenRouteServiceProvider(
		cfg.OpenRouteServiceAPIKey,
		cfg.OpenRouteServiceBaseURL,
	)

	routingService := routing.NewService(provider)

	pickup := location.Location{
		Address:   "Gautam",
		Latitude:  25.318875,
		Longitude: 83.022237,
	}

	destination := location.Location{
		Address:   "Puskin",
		Latitude:  25.315721,
		Longitude: 82.959012,
	}

	route, err := routingService.CalculateRoute(
		context.Background(),
		pickup,
		destination,
	)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("ROUTE ANALYSIS: ")
	fmt.Printf("From: %s\n", pickup.Address)
	fmt.Printf("To: %s\n", destination.Address)
	fmt.Printf("Distance: %.2f km\n", route.Summary.DistanceKilometers)
	fmt.Printf("ETA: %d minutes\n", route.Summary.EstimatedMinutes)
}
