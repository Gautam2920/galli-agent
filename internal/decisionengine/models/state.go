package models

import "github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"

type DecisionEngineState struct {
	Route                      routing.Route
	FulfillmentAnalysis        FulfillmentAnalysis
	RouteAnalysis              RouteAnalysis
	WeatherAnalysis            WeatherAnalysis
	TrafficAnalysis            TrafficAnalysis
	RiskAnalysis               RiskAnalysis
	PartnerAnalysis            PartnerAnalysis
	DeliveryIntelligenceReport DeliveryIntelligenceReport
}
