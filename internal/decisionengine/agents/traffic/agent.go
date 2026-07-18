package traffic

import (
	"context"
	"fmt"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	traffictool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/traffic"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type TrafficAgent struct {
	tool *traffictool.Tool
}

func NewTrafficAgent(
	tool *traffictool.Tool,
) *TrafficAgent {

	return &TrafficAgent{
		tool: tool,
	}
}

func (a *TrafficAgent) Name() string {
	return "Traffic Agent"
}

func (a *TrafficAgent) Execute(
	ctx *framework.AgentContext,
) (*framework.AgentResult, error) {

	logger.Log(logger.Traffic, "Starting traffic analysis")

	analysis, err := a.tool.Analyse(
		context.Background(),
		ctx.Delivery.Pickup,
		ctx.Delivery.Destination,
	)

	if err != nil {

		logger.Log(logger.Traffic, "Traffic analysis failed")

		return &framework.AgentResult{
			Success: false,
			Message: err.Error(),
		}, err
	}

	ctx.DecisionEngineState.TrafficAnalysis = analysis

	logger.Log(
		logger.Traffic,
		fmt.Sprintf(
			"Congestion: %d%%",
			analysis.CongestionLevel,
		),
	)

	logger.Log(
		logger.Traffic,
		fmt.Sprintf(
			"Risk Score: %d",
			analysis.RiskScore,
		),
	)

	logger.Log(
		logger.Traffic,
		fmt.Sprintf(
			"Confidence: %d%%",
			analysis.ConfidenceScore,
		),
	)

	logger.Log(logger.Traffic, "Traffic analysis completed")

	return &framework.AgentResult{
		Success: true,
		Message: "Traffic analysis completed successfully.",
	}, nil
}
