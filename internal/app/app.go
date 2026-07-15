package app

import (
	"github.com/Gautam2920/galli-agent/backend/config"

	decisionengine "github.com/Gautam2920/galli-agent/backend/internal/decisionengine"

	riskagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/risk"
	routeagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/route"
	summaryagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/summary"

	risktool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/risk"
	routetool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/route"
	summarytool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/summary"

	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
)

type App struct {
	DecisionEngine *decisionengine.Engine
}

func New(cfg *config.Config) *App {

	provider := routing.NewOpenRouteServiceProvider(
		cfg.OpenRouteServiceAPIKey,
		cfg.OpenRouteServiceBaseURL,
	)

	routingService := routing.NewService(provider)

	routeTool := routetool.NewTool(routingService)
	riskTool := risktool.NewTool()
	summaryTool := summarytool.NewTool()

	routeAgent := routeagent.NewRouteAgent(routeTool)
	riskAgent := riskagent.NewRiskAgent(riskTool)
	summaryAgent := summaryagent.NewSummaryAgent(summaryTool)

	engine := decisionengine.New()

	engine.Register(routeAgent)
	engine.Register(riskAgent)
	engine.Register(summaryAgent)

	return &App{
		DecisionEngine: engine,
	}
}
