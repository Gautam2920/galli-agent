package partner

import (
	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	partnertool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/partner"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type PartnerAgent struct {
	tool *partnertool.Tool
}

func NewPartnerAgent(
	tool *partnertool.Tool,
) *PartnerAgent {

	return &PartnerAgent{
		tool: tool,
	}
}

func (a *PartnerAgent) Name() string {
	return "Partner Agent"
}

func (a *PartnerAgent) Execute(
	ctx *framework.AgentContext,
) (*framework.AgentResult, error) {

	logger.Log(logger.Partner, "Starting partner analysis")

	analysis := a.tool.Analyse()

	ctx.DecisionEngineState.PartnerAnalysis = analysis

	logger.Log(
		logger.Partner,
		"Recommended Partner: "+analysis.RecommendedPartner.Name,
	)

	logger.Log(
		logger.Partner,
		"Partner analysis completed",
	)

	return &framework.AgentResult{
		Success: true,
		Message: "Partner analysis completed successfully.",
	}, nil
}
