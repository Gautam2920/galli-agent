package risk

import (
	"fmt"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	risktool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/risk"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type RiskAgent struct {
	tool *risktool.Tool
}

func NewRiskAgent(tool *risktool.Tool) *RiskAgent {
	return &RiskAgent{
		tool: tool,
	}
}

func (a *RiskAgent) Name() string {
	return "Risk Agent"
}

func (a *RiskAgent) Execute(
	ctx *framework.AgentContext,
) (*framework.AgentResult, error) {

	logger.Log(logger.Risk, "Starting risk analysis")

	analysis := a.tool.Analyse(
		ctx.DecisionEngineState.RouteAnalysis,
		ctx.DecisionEngineState.WeatherAnalysis,
		ctx.DecisionEngineState.TrafficAnalysis,
	)

	ctx.DecisionEngineState.RiskAnalysis = analysis

	logger.Log(
		logger.Risk,
		"Risk Level: "+analysis.Level,
	)

	logger.Log(
		logger.Risk,
		fmt.Sprintf(
			"Risk Score: %d/100",
			analysis.RiskScore,
		),
	)

	logger.Log(
		logger.Risk,
		fmt.Sprintf(
			"Confidence: %d%%",
			analysis.ConfidenceScore,
		),
	)

	logger.Log(
		logger.Risk,
		"Reason: "+analysis.Reason,
	)

	logger.Log(
		logger.Risk,
		"Risk analysis completed",
	)

	return &framework.AgentResult{
		Success: true,
		Message: "Risk analysis completed successfully.",
	}, nil
}
