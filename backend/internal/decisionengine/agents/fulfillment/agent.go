package fulfillment

import (
	"fmt"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	fulfillmenttool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/fulfillment"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type Agent struct {
	tool *fulfillmenttool.Tool
}

func NewFulfillmentAgent(
	tool *fulfillmenttool.Tool,
) *Agent {

	return &Agent{
		tool: tool,
	}
}

func (a *Agent) Name() string {
	return "Fulfillment Agent"
}

func (a *Agent) Execute(
	ctx *framework.AgentContext,
) (*framework.AgentResult, error) {

	logger.Log(logger.Fulfillment, "Starting fulfillment analysis")

	analysis, err := a.tool.Analyse(
		ctx.Delivery,
	)

	if err != nil {

		logger.Log(
			logger.Fulfillment,
			"Fulfillment analysis failed",
		)

		return &framework.AgentResult{
			Success: false,
			Message: err.Error(),
		}, err
	}

	ctx.DecisionEngineState.FulfillmentAnalysis = analysis

	logger.Log(
		logger.Fulfillment,
		fmt.Sprintf(
			"Selected Store: %s",
			analysis.SelectedCandidate.Store.Name,
		),
	)

	logger.Log(
		logger.Fulfillment,
		fmt.Sprintf(
			"Distance: %.2f km",
			analysis.SelectedCandidate.DistanceKilometers,
		),
	)

	logger.Log(
		logger.Fulfillment,
		fmt.Sprintf(
			"Operational Score: %.2f",
			analysis.SelectedCandidate.OperationalScore,
		),
	)

	logger.Log(
		logger.Fulfillment,
		fmt.Sprintf(
			"Confidence: %d%%",
			analysis.ConfidenceScore,
		),
	)

	logger.Log(
		logger.Fulfillment,
		"Fulfillment analysis completed",
	)

	return &framework.AgentResult{
		Success: true,
		Message: "Fulfillment analysis completed successfully.",
	}, nil
}
