package risk

import (
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
)

type Tool struct{}

func NewTool() *Tool {
	return &Tool{}
}

func (t *Tool) Analyse(
	route models.RouteAnalysis,
) models.RiskAnalysis {

	risk := models.RiskAnalysis{}

	distance := route.Route.Summary.DistanceKilometers

	switch {
	case distance < 3:
		risk.Level = "Low"
		risk.Score = 95
		risk.Reason = "Short delivery distance with minimal operational risk."

	case distance < 8:
		risk.Level = "Medium"
		risk.Score = 82
		risk.Reason = "Moderate delivery distance requiring standard monitoring."

	default:
		risk.Level = "High"
		risk.Score = 68
		risk.Reason = "Long delivery distance increases operational uncertainty."
	}

	return risk
}
