package app

import (
	"github.com/Gautam2920/galli-agent/backend/config"

	decisionengine "github.com/Gautam2920/galli-agent/backend/internal/decisionengine"

	partneragent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/partner"
	riskagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/risk"
	routeagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/route"
	summaryagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/summary"

	partnertool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/partner"
	risktool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/risk"
	routetool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/route"
	summarytool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/summary"

	"github.com/Gautam2920/galli-agent/backend/internal/partner"
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

	partnerRepository := partner.NewRepository()
	partnerService := partner.NewService(partnerRepository)

	routeTool := routetool.NewTool(routingService)
	riskTool := risktool.NewTool()
	partnerTool := partnertool.NewTool(partnerService)
	summaryTool := summarytool.NewTool()

	routeAgent := routeagent.NewRouteAgent(routeTool)
	riskAgent := riskagent.NewRiskAgent(riskTool)
	partnerAgent := partneragent.NewPartnerAgent(partnerTool)
	summaryAgent := summaryagent.NewSummaryAgent(summaryTool)

	engine := decisionengine.New()

	engine.Register(routeAgent)
	engine.Register(riskAgent)
	engine.Register(partnerAgent)
	engine.Register(summaryAgent)

	return &App{
		DecisionEngine: engine,
	}
}
