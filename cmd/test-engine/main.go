package main

import (
	"fmt"

	"github.com/Gautam2920/galli-agent/backend/config"
	"github.com/Gautam2920/galli-agent/backend/internal/app"
	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
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

	ctx := &framework.AgentContext{
		Delivery: deliveryRequest,
	}

	err := application.DecisionEngine.Run(ctx)

	if err != nil {
		panic(err)
	}

	report := ctx.DecisionEngineState.DeliveryIntelligenceReport

	fmt.Println()
	fmt.Println("GALLI AGENT DECISION ENGINE")
	fmt.Println()

	fmt.Println("Route")
	fmt.Println(report.RouteSummary)
	fmt.Println()

	fmt.Println("Risk")
	fmt.Println(report.RiskSummary)
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
