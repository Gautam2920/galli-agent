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
		state.RiskAnalysis.Score,
	)

	report.ConfidenceScore =
		(state.RouteAnalysis.ConfidenceScore + state.RiskAnalysis.Score) / 2

	if state.RiskAnalysis.Level == "High" {

		report.OverallDecision =
			"Proceed with Caution"

	} else {

		report.OverallDecision =
			"Proceed"

	}

	report.Reason =
		fmt.Sprintf(
			"%s %s",
			state.RouteAnalysis.Reason,
			state.RiskAnalysis.Reason,
		)

	return report
}
