package summary

import (
	"fmt"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	summarytool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/summary"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type SummaryAgent struct {
	tool *summarytool.Tool
}

func NewSummaryAgent(tool *summarytool.Tool) *SummaryAgent {
	return &SummaryAgent{
		tool: tool,
	}
}

func (a *SummaryAgent) Name() string {
	return "Summary Agent"
}

func (a *SummaryAgent) Execute(
	ctx *framework.AgentContext,
) (*framework.AgentResult, error) {

	logger.Log(logger.Summary, "Generating delivery intelligence report")

	report := a.tool.Generate(
		ctx.DecisionEngineState,
	)

	ctx.DecisionEngineState.DeliveryIntelligenceReport = report

	logger.Log(
		logger.Summary,
		"Decision: "+report.OverallDecision,
	)

	logger.Log(
		logger.Summary,
		fmt.Sprintf(
			"Confidence: %d%%",
			report.ConfidenceScore,
		),
	)

	logger.Log(
		logger.Summary,
		"Reason: "+report.Reason,
	)

	logger.Log(
		logger.Summary,
		"Delivery intelligence report generated",
	)

	return &framework.AgentResult{
		Success: true,
		Message: "Delivery intelligence report generated successfully.",
	}, nil
}
