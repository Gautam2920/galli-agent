package app

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/config"

	"github.com/Gautam2920/galli-agent/backend/internal/ai/gemini"

	decisionengine "github.com/Gautam2920/galli-agent/backend/internal/decisionengine"
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"

	fulfillmentagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/fulfillment"
	partneragent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/partner"
	riskagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/risk"
	routeagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/route"
	summaryagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/summary"
	trafficagent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/traffic"
	weatheragent "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/agents/weather"

	fulfillmenttool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/fulfillment"
	partnertool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/partner"
	risktool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/risk"
	routetool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/route"
	summarytool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/summary"
	traffictool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/traffic"
	weathertool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/weather"

	"github.com/Gautam2920/galli-agent/backend/internal/delivery"
	fulfillmentdomain "github.com/Gautam2920/galli-agent/backend/internal/fulfillment"
	"github.com/Gautam2920/galli-agent/backend/internal/partner"
	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
	"github.com/Gautam2920/galli-agent/backend/internal/traffic"
	"github.com/Gautam2920/galli-agent/backend/internal/weather"
)

type App struct {
	engine        *decisionengine.Engine
	geminiService *gemini.Service
}

type AnalysisResult struct {
	State         models.DecisionEngineState
	Report        models.DeliveryIntelligenceReport
	AIExplanation string
}

func New(cfg *config.Config) *App {

	provider := routing.NewOpenRouteServiceProvider(
		cfg.OpenRouteServiceAPIKey,
		cfg.OpenRouteServiceBaseURL,
	)

	routingService := routing.NewService(provider)

	weatherProvider := weather.NewOpenWeatherProvider(
		cfg.OpenWeatherAPIKey,
		cfg.OpenWeatherBaseURL,
	)

	weatherService := weather.NewService(
		weatherProvider,
	)

	trafficProvider := traffic.NewTomTomProvider(
		cfg.TomTomAPIKey,
		cfg.TomTomBaseURL,
	)

	trafficService := traffic.NewService(
		trafficProvider,
	)

	partnerRepository := partner.NewRepository()
	partnerService := partner.NewService(partnerRepository)

	fulfillmentRepository := fulfillmentdomain.NewRepository()
	fulfillmentService := fulfillmentdomain.NewService(fulfillmentRepository)
	fulfillmentScorer := fulfillmentdomain.NewScorer()

	routeTool := routetool.NewTool(routingService)

	weatherTool := weathertool.NewTool(
		weatherService,
	)

	trafficTool := traffictool.NewTool(
		trafficService,
	)

	riskTool := risktool.NewTool()

	partnerTool := partnertool.NewTool(
		partnerService,
	)

	summaryTool := summarytool.NewTool()

	fulfillmentTool := fulfillmenttool.NewTool(
		fulfillmentService,
		fulfillmentScorer,
	)

	fulfillmentAgent := fulfillmentagent.NewFulfillmentAgent(
		fulfillmentTool,
	)

	routeAgent := routeagent.NewRouteAgent(
		routeTool,
	)

	weatherAgent := weatheragent.NewWeatherAgent(
		weatherTool,
	)

	trafficAgent := trafficagent.NewTrafficAgent(
		trafficTool,
	)

	riskAgent := riskagent.NewRiskAgent(
		riskTool,
	)

	partnerAgent := partneragent.NewPartnerAgent(
		partnerTool,
	)

	summaryAgent := summaryagent.NewSummaryAgent(
		summaryTool,
	)

	engine := decisionengine.New()

	if err := engine.Register(
		fulfillmentAgent,
	); err != nil {
		panic(err)
	}

	if err := engine.Register(
		routeAgent,
		framework.DependsOn(fulfillmentAgent.Name()),
	); err != nil {
		panic(err)
	}

	if err := engine.Register(
		weatherAgent,
	); err != nil {
		panic(err)
	}

	if err := engine.Register(
		trafficAgent,
		framework.DependsOn(routeAgent.Name()),
	); err != nil {
		panic(err)
	}

	if err := engine.Register(
		riskAgent,
		framework.DependsOn(
			routeAgent.Name(),
			weatherAgent.Name(),
			trafficAgent.Name(),
		),
	); err != nil {
		panic(err)
	}

	if err := engine.Register(
		partnerAgent,
		framework.DependsOn(riskAgent.Name()),
	); err != nil {
		panic(err)
	}

	if err := engine.Register(
		summaryAgent,
		framework.DependsOn(
			fulfillmentAgent.Name(),
			routeAgent.Name(),
			weatherAgent.Name(),
			trafficAgent.Name(),
			riskAgent.Name(),
			partnerAgent.Name(),
		),
	); err != nil {
		panic(err)
	}

	geminiClient, err := gemini.NewClient(
		cfg.GeminiAPIKey,
		cfg.GeminiModel,
	)
	if err != nil {
		panic(err)
	}

	geminiService := gemini.NewService(
		geminiClient,
	)

	return &App{
		engine:        engine,
		geminiService: geminiService,
	}
}

func (a *App) AnalyseDelivery(
	ctx context.Context,
	deliveryRequest delivery.Delivery,
) (models.DecisionEngineState, error) {

	agentContext := &framework.AgentContext{
		Context:  ctx,
		Delivery: deliveryRequest,
	}

	err := a.engine.Run(agentContext)
	if err != nil {
		return models.DecisionEngineState{}, err
	}

	return agentContext.DecisionEngineState, nil
}

func (a *App) AnalyseDeliveryWithAI(
	ctx context.Context,
	deliveryRequest delivery.Delivery,
) (AnalysisResult, error) {

	state, err := a.AnalyseDelivery(
		ctx,
		deliveryRequest,
	)

	if err != nil {
		return AnalysisResult{}, err
	}

	result := AnalysisResult{
		State:  state,
		Report: state.DeliveryIntelligenceReport,
	}

	if a.geminiService != nil {

		explanation, err := a.geminiService.GenerateDeliveryExplanation(
			ctx,
			result.Report,
		)

		if err != nil {
			println("Gemini Error:", err.Error())
		} else {
			result.AIExplanation = explanation
		}
	}

	return result, nil
}
