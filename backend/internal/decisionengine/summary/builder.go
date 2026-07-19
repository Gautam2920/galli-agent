package summary

import "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"

func Build(
	report models.DeliveryIntelligenceReport,
	route models.RouteAnalysis,
	weather models.WeatherAnalysis,
	traffic models.TrafficAnalysis,
	risk models.RiskAnalysis,
	partner models.PartnerAnalysis,
) OperationalSummary {
	return OperationalSummary{
		Decision:          report.OverallDecision,
		Confidence:        report.ConfidenceScore,
		OverallAssessment: report.Reason,

		RouteSummary:   route.Reason,
		WeatherSummary: weather.Reason,
		TrafficSummary: traffic.Reason,
		RiskSummary:    risk.Reason,
		PartnerSummary: partner.Reason,

		Highlights: buildHighlights(
			route,
			weather,
			traffic,
			risk,
			partner,
		),
	}
}

func buildHighlights(
	route models.RouteAnalysis,
	weather models.WeatherAnalysis,
	traffic models.TrafficAnalysis,
	risk models.RiskAnalysis,
	partner models.PartnerAnalysis,
) []string {
	highlights := make([]string, 0, 5)

	if route.Reason != "" {
		highlights = append(highlights, route.Reason)
	}

	if weather.Reason != "" {
		highlights = append(highlights, weather.Reason)
	}

	if traffic.Reason != "" {
		highlights = append(highlights, traffic.Reason)
	}

	if risk.Reason != "" {
		highlights = append(highlights, risk.Reason)
	}

	if partner.Reason != "" {
		highlights = append(highlights, partner.Reason)
	}

	return highlights
}
