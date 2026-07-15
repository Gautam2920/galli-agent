package models

type DeliveryIntelligenceReport struct {
	RouteSummary    string
	RiskSummary     string
	OverallDecision string
	ConfidenceScore int
	Reason          string
}
