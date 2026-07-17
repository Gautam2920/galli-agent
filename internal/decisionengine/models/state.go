package models

type DecisionEngineState struct {
	FulfillmentAnalysis        FulfillmentAnalysis
	RouteAnalysis              RouteAnalysis
	WeatherAnalysis            WeatherAnalysis
	TrafficAnalysis            TrafficAnalysis
	CrowdAnalysis              CrowdAnalysis
	RiskAnalysis               RiskAnalysis
	PartnerAnalysis            PartnerAnalysis
	DeliveryIntelligenceReport DeliveryIntelligenceReport
}
