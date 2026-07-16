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

	report := models.DeliveryIntelligenceReport{}

	report.RouteSummary = fmt.Sprintf(
		"%.2f km route with an estimated travel time of %d minutes.",
		state.RouteAnalysis.Route.Summary.DistanceKilometers,
		state.RouteAnalysis.Route.Summary.EstimatedMinutes,
	)

	report.RiskSummary = fmt.Sprintf(
		"%s Risk (%d/100)",
		state.RiskAnalysis.Level,
		state.RiskAnalysis.RiskScore,
	)

	report.PartnerSummary = fmt.Sprintf(
		"%s (%.1f★)",
		state.PartnerAnalysis.RecommendedPartner.Name,
		state.PartnerAnalysis.RecommendedPartner.Rating,
	)

	report.ConfidenceScore = (state.RouteAnalysis.ConfidenceScore +
		state.RiskAnalysis.ConfidenceScore +
		state.PartnerAnalysis.ConfidenceScore) / 3

	switch state.RiskAnalysis.Level {
	case "High":
		report.OverallDecision = "Proceed with Caution"
	default:
		report.OverallDecision = "Proceed"
	}

	report.Reason = fmt.Sprintf(
		"%s %s %s",
		state.RouteAnalysis.Reason,
		state.RiskAnalysis.Reason,
		state.PartnerAnalysis.Reason,
	)

	return report
}
