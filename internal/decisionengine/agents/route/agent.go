package route

import (
	"context"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	routetool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/route"
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

func (a *RouteAgent) Execute(ctx *framework.AgentContext) (*framework.AgentResult, error) {

	analysis, err := a.tool.Analyse(
		context.Background(),
		ctx.Delivery,
	)

	if err != nil {
		return &framework.AgentResult{
			Success: false,
			Message: err.Error(),
		}, err
	}

	ctx.DecisionEngineState.RouteAnalysis = analysis

	return &framework.AgentResult{
		Success: true,
		Message: "Route analysis completed successfully.",
	}, nil
}
