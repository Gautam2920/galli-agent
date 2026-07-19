package summary

import (
	"fmt"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
)

type Tool struct{}

func NewTool() *Tool {
	return &Tool{}
}

func (t *Tool) Generate(
	state models.DecisionEngineState,
) models.DeliveryIntelligenceReport {

	return models.DeliveryIntelligenceReport{
		RouteSummary: t.generateRouteSummary(
			state.RouteAnalysis,
		),

		RiskSummary: t.generateRiskSummary(
			state.RiskAnalysis,
		),

		PartnerSummary: t.generatePartnerSummary(
			state.PartnerAnalysis,
		),

		OverallDecision: t.determineOverallDecision(
			state.RiskAnalysis,
		),

		ConfidenceScore: t.determineConfidence(
			state.RiskAnalysis,
			state.PartnerAnalysis,
		),

		Reason: t.generateExecutiveSummary(
			state.RouteAnalysis,
			state.WeatherAnalysis,
			state.TrafficAnalysis,
			state.RiskAnalysis,
			state.PartnerAnalysis,
		),
	}
}

func (t *Tool) generateRouteSummary(
	route models.RouteAnalysis,
) string {

	return fmt.Sprintf(
		"%.2f km route with an estimated travel time of %d minutes.",
		route.Route.Summary.DistanceKilometers,
		route.Route.Summary.EstimatedMinutes,
	)
}

func (t *Tool) generateRiskSummary(
	risk models.RiskAnalysis,
) string {

	return fmt.Sprintf(
		"%s Risk (%d/100)",
		risk.Level,
		risk.RiskScore,
	)
}

func (t *Tool) generatePartnerSummary(
	partner models.PartnerAnalysis,
) string {

	return fmt.Sprintf(
		"%s (%.1f)",
		partner.RecommendedPartner.Name,
		partner.RecommendedPartner.Rating,
	)
}

func (t *Tool) determineOverallDecision(
	risk models.RiskAnalysis,
) string {

	switch risk.Level {

	case "High":
		return "Proceed with Caution"

	default:
		return "Proceed"
	}
}

func (t *Tool) determineConfidence(
	risk models.RiskAnalysis,
	partner models.PartnerAnalysis,
) int {
	return (risk.ConfidenceScore + partner.ConfidenceScore) / 2
}

func (t *Tool) generateExecutiveSummary(
	route models.RouteAnalysis,
	weather models.WeatherAnalysis,
	traffic models.TrafficAnalysis,
	risk models.RiskAnalysis,
	partner models.PartnerAnalysis,
) string {

	return fmt.Sprintf(
		"%s %s %s %s %s",
		route.Reason,
		weather.Reason,
		traffic.Reason,
		risk.Reason,
		partner.Reason,
	)
}
