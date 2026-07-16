package main

import (
	"context"
	"fmt"

	"github.com/Gautam2920/galli-agent/backend/config"
	"github.com/Gautam2920/galli-agent/backend/internal/app"
	"github.com/Gautam2920/galli-agent/backend/internal/delivery"
	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

func main() {

	cfg := config.Load()

	application := app.New(cfg)

	deliveryRequest := delivery.Delivery{
		ID: "DEL-001",

		Pickup: location.Location{
			Address:   "Gautam",
			Latitude:  25.318875,
			Longitude: 83.022237,
		},

		Destination: location.Location{
			Address:   "Puskin",
			Latitude:  25.315721,
			Longitude: 82.959012,
		},
	}

	report, err := application.AnalyseDelivery(
		context.Background(),
		deliveryRequest,
	)

	if err != nil {
		panic(err)
	}

	fmt.Println()
	fmt.Println("GALLI AGENT DECISION ENGINE")
	fmt.Println()

	fmt.Println("Route")
	fmt.Println(report.RouteSummary)
	fmt.Println()

	fmt.Println("Risk")
	fmt.Println(report.RiskSummary)
	fmt.Println()

	fmt.Println("Partner")
	fmt.Println(report.PartnerSummary)
	fmt.Println()

	fmt.Println("Decision")
	fmt.Println(report.OverallDecision)
	fmt.Println()

	fmt.Printf("Confidence : %d%%\n", report.ConfidenceScore)

	fmt.Println()

	fmt.Println("Reason")
	fmt.Println(report.Reason)

	fmt.Println()
	fmt.Println("Execution Complete")
}
