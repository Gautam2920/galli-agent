package route

import "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"

type RouteAgent struct{}

func (a *RouteAgent) Name() string {
	return "Route Agent"
}

func (a *RouteAgent) Execute(ctx *framework.AgentContext) (*framework.AgentResult, error) {

	delivery := ctx.Delivery

	message := "Analysing route from " + delivery.Pickup.Address + " to " + delivery.Destination.Address

	return &framework.AgentResult{
		Success: true,
		Message: message,
	}, nil
}
