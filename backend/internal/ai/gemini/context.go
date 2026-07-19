package gemini

import "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"

type Context struct {
	Report             models.DeliveryIntelligenceReport
	Route              models.RouteAnalysis
	Weather            models.WeatherAnalysis
	Traffic            models.TrafficAnalysis
	Risk               models.RiskAnalysis
	Partner            models.PartnerAnalysis
	OperationalSummary string
}
