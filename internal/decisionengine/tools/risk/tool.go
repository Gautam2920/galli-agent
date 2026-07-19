package risk

import (
	"fmt"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
)

const (
	distanceWeight = 0.45
	weatherWeight  = 0.25
	trafficWeight  = 0.30
)

type Tool struct{}

func NewTool() *Tool {
	return &Tool{}
}

func (t *Tool) Analyse(
	route models.RouteAnalysis,
	weather models.WeatherAnalysis,
	traffic models.TrafficAnalysis,
) models.RiskAnalysis {

	distanceRisk := t.calculateDistanceRisk(route)
	weatherRisk := weather.RiskScore
	trafficRisk := traffic.RiskScore

	score := t.combineRiskScores(
		distanceRisk,
		weatherRisk,
		trafficRisk,
	)

	return models.RiskAnalysis{
		Level:           t.determineRiskLevel(score),
		RiskScore:       score,
		ConfidenceScore: t.determineConfidence(score),
		Reason: t.generateReason(
			distanceRisk,
			weatherRisk,
			trafficRisk,
		),
	}
}

func (t *Tool) calculateDistanceRisk(
	route models.RouteAnalysis,
) int {

	distance := route.Route.Summary.DistanceKilometers

	switch {

	case distance < 3:
		return 15

	case distance < 8:
		return 45

	default:
		return 80
	}
}

func (t *Tool) combineRiskScores(
	distanceRisk int,
	weatherRisk int,
	trafficRisk int,
) int {

	score :=
		float64(distanceRisk)*distanceWeight +
			float64(weatherRisk)*weatherWeight +
			float64(trafficRisk)*trafficWeight

	return int(score)
}

func (t *Tool) determineRiskLevel(
	score int,
) string {

	switch {

	case score < 30:
		return "Low"

	case score < 60:
		return "Medium"

	default:
		return "High"
	}
}

func (t *Tool) determineConfidence(
	score int,
) int {

	switch {

	case score < 30:
		return 95

	case score < 60:
		return 90

	default:
		return 85
	}
}

func (t *Tool) generateReason(
	distanceRisk int,
	weatherRisk int,
	trafficRisk int,
) string {

	return fmt.Sprintf(
		"Risk assessment based on distance (%d), weather (%d), and traffic (%d).",
		distanceRisk,
		weatherRisk,
		trafficRisk,
	)
}
