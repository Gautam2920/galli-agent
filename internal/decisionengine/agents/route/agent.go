package route

import (
	"context"
	"fmt"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	routetool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/route"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type RouteAgent struct {
	tool *routetool.Tool
}

func NewRouteAgent(tool *routetool.Tool) *RouteAgent {
	return &RouteAgent{
		tool: tool,
	}
}

func (a *RouteAgent) Name() string {
	return "Route Agent"
}

func (a *RouteAgent) Execute(
	ctx *framework.AgentContext,
) (*framework.AgentResult, error) {

	logger.Log(logger.Route, "Starting route analysis")

	pickup := ctx.
		DecisionEngineState.
		FulfillmentAnalysis.
		SelectedCandidate.
		Store.
		Location

	destination := ctx.Delivery.Destination

	analysis, err := a.tool.Analyse(
		context.Background(),
		pickup,
		destination,
	)

	if err != nil {

		logger.Log(logger.Route, "Route analysis failed")

		return &framework.AgentResult{
			Success: false,
			Message: err.Error(),
		}, err
	}

	ctx.DecisionEngineState.RouteAnalysis = analysis

	logger.Log(
		logger.Route,
		fmt.Sprintf(
			"Distance: %.2f km",
			analysis.Route.Summary.DistanceKilometers,
		),
	)

	logger.Log(
		logger.Route,
		fmt.Sprintf(
			"ETA: %d minutes",
			analysis.Route.Summary.EstimatedMinutes,
		),
	)

	logger.Log(
		logger.Route,
		"Complexity: "+analysis.RouteComplexity,
	)

	logger.Log(
		logger.Route,
		fmt.Sprintf(
			"Confidence: %d%%",
			analysis.ConfidenceScore,
		),
	)

	logger.Log(logger.Route, "Route analysis completed")

	return &framework.AgentResult{
		Success: true,
		Message: "Route analysis completed successfully.",
	}, nil
}
