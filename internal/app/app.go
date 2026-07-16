package app

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/config"

	"github.com/Gautam2920/galli-agent/backend/internal/ai/gemini"

	decisionengine "github.com/Gautam2920/galli-agent/backend/internal/decisionengine"
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/delivery"

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
	engine        *decisionengine.Engine
	geminiService *gemini.Service
}

type AnalysisResult struct {
	Report        models.DeliveryIntelligenceReport
	AIExplanation string
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
) (models.DeliveryIntelligenceReport, error) {

	agentContext := &framework.AgentContext{
		Delivery: deliveryRequest,
	}

	err := a.engine.Run(agentContext)
	if err != nil {
		return models.DeliveryIntelligenceReport{}, err
	}

	return agentContext.DecisionEngineState.DeliveryIntelligenceReport, nil
}

func (a *App) AnalyseDeliveryWithAI(
	ctx context.Context,
	deliveryRequest delivery.Delivery,
) (AnalysisResult, error) {

	report, err := a.AnalyseDelivery(
		ctx,
		deliveryRequest,
	)

	if err != nil {
		return AnalysisResult{}, err
	}

	result := AnalysisResult{
		Report: report,
	}

	if a.geminiService != nil {

		explanation, err := a.geminiService.GenerateDeliveryExplanation(
			ctx,
			report,
		)

		if err != nil {
			println("Gemini Error:", err.Error())
		} else {
			result.AIExplanation = explanation
		}
	}

	return result, nil
}
