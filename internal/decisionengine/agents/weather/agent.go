package weather

import (
	"context"
	"fmt"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	weathertool "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/tools/weather"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type WeatherAgent struct {
	tool *weathertool.Tool
}

func NewWeatherAgent(
	tool *weathertool.Tool,
) *WeatherAgent {

	return &WeatherAgent{
		tool: tool,
	}
}

func (a *WeatherAgent) Name() string {
	return "Weather Agent"
}

func (a *WeatherAgent) Execute(
	ctx *framework.AgentContext,
) (*framework.AgentResult, error) {

	logger.Log(logger.Weather, "Starting weather analysis")

	location := ctx.Delivery.Destination

	analysis, err := a.tool.Analyse(
		context.Background(),
		location,
	)

	if err != nil {

		logger.Log(logger.Weather, "Weather analysis failed")

		return &framework.AgentResult{
			Success: false,
			Message: err.Error(),
		}, err
	}

	ctx.DecisionEngineState.WeatherAnalysis = analysis

	logger.Log(
		logger.Weather,
		"Condition: "+string(analysis.Weather.Condition),
	)

	logger.Log(
		logger.Weather,
		fmt.Sprintf(
			"Temperature: %.1f°C",
			analysis.Weather.Temperature,
		),
	)

	logger.Log(
		logger.Weather,
		fmt.Sprintf(
			"Risk Score: %d",
			analysis.RiskScore,
		),
	)

	logger.Log(
		logger.Weather,
		fmt.Sprintf(
			"Confidence: %d%%",
			analysis.ConfidenceScore,
		),
	)

	logger.Log(logger.Weather, "Weather analysis completed")

	return &framework.AgentResult{
		Success: true,
		Message: "Weather analysis completed successfully.",
	}, nil
}
