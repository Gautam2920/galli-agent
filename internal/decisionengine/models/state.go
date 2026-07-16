package models

type DecisionEngineState struct {
	RouteAnalysis              RouteAnalysis
	RiskAnalysis               RiskAnalysis
	PartnerAnalysis            PartnerAnalysis
	DeliveryIntelligenceReport DeliveryIntelligenceReport
}
