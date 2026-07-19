package mapper

import (
	"github.com/Gautam2920/galli-agent/backend/internal/api/dto"
	"github.com/Gautam2920/galli-agent/backend/internal/app"
)

func ToAnalyseDeliveryResponse(
	result app.AnalysisResult,
) dto.AnalyseDeliveryResponse {

	return dto.AnalyseDeliveryResponse{

		Decision: result.Report.OverallDecision,

		Confidence: result.Report.ConfidenceScore,

		Route: dto.RouteResponse{
			DistanceKilometers: result.State.RouteAnalysis.Route.Summary.DistanceKilometers,
			EstimatedMinutes:   result.State.RouteAnalysis.Route.Summary.EstimatedMinutes,
			Complexity:         result.State.RouteAnalysis.RouteComplexity,
			Reason:             result.State.RouteAnalysis.Reason,
		},

		Weather: dto.WeatherResponse{
			Condition:   string(result.State.WeatherAnalysis.Weather.Condition),
			Temperature: result.State.WeatherAnalysis.Weather.Temperature,
			RiskScore:   result.State.WeatherAnalysis.RiskScore,
			Reason:      result.State.WeatherAnalysis.Reason,
		},

		Traffic: dto.TrafficResponse{
			CongestionLevel: result.State.TrafficAnalysis.CongestionLevel,
			RiskScore:       result.State.TrafficAnalysis.RiskScore,
			Reason:          result.State.TrafficAnalysis.Reason,
		},

		Risk: dto.RiskResponse{
			Level:     result.State.RiskAnalysis.Level,
			RiskScore: result.State.RiskAnalysis.RiskScore,
			Reason:    result.State.RiskAnalysis.Reason,
		},

		Partner: dto.PartnerResponse{
			Name:   result.State.PartnerAnalysis.RecommendedPartner.Name,
			Rating: result.State.PartnerAnalysis.RecommendedPartner.Rating,
			Reason: result.State.PartnerAnalysis.Reason,
		},

		Reason: result.Report.Reason,

		AIExplanation: result.AIExplanation,
	}
}
