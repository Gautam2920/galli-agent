package weather

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/location"
	weatherdomain "github.com/Gautam2920/galli-agent/backend/internal/weather"
)

type Tool struct {
	weatherService *weatherdomain.Service
}

func NewTool(
	weatherService *weatherdomain.Service,
) *Tool {

	return &Tool{
		weatherService: weatherService,
	}
}

func (t *Tool) Analyse(
	ctx context.Context,
	location location.Location,
) (models.WeatherAnalysis, error) {

	currentWeather, err := t.weatherService.GetCurrentWeather(
		ctx,
		location,
	)

	if err != nil {
		return models.WeatherAnalysis{}, err
	}

	analysis := models.WeatherAnalysis{
		Weather: currentWeather,
	}

	analysis.RiskScore = determineRisk(currentWeather)
	analysis.ConfidenceScore = determineConfidence(analysis.RiskScore)
	analysis.Reason = generateReason(currentWeather)

	return analysis, nil
}

func determineRisk(
	current weatherdomain.CurrentWeather,
) int {

	switch current.Condition {

	case weatherdomain.ConditionClear:
		return 10

	case weatherdomain.ConditionClouds:
		return 20

	case weatherdomain.ConditionFog:
		return 45

	case weatherdomain.ConditionRain:
		return 60

	case weatherdomain.ConditionSnow:
		return 75

	case weatherdomain.ConditionThunderstorm:
		return 90

	default:
		return 50
	}
}

func determineConfidence(
	risk int,
) int {

	switch {

	case risk <= 20:
		return 96

	case risk <= 50:
		return 90

	default:
		return 84
	}
}

func generateReason(
	current weatherdomain.CurrentWeather,
) string {

	switch current.Condition {

	case weatherdomain.ConditionClear:
		return "Clear weather with excellent delivery conditions."

	case weatherdomain.ConditionClouds:
		return "Cloudy conditions with minimal operational impact."

	case weatherdomain.ConditionFog:
		return "Reduced visibility may slow delivery operations."

	case weatherdomain.ConditionRain:
		return "Rain may increase travel time and rider caution."

	case weatherdomain.ConditionSnow:
		return "Snow creates difficult delivery conditions."

	case weatherdomain.ConditionThunderstorm:
		return "Thunderstorms present significant delivery risk."

	default:
		return "Weather conditions could not be fully assessed."
	}
}
