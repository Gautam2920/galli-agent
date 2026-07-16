package models

type DeliveryIntelligenceReport struct {
	RouteSummary    string
	RiskSummary     string
	PartnerSummary  string
	OverallDecision string
	ConfidenceScore int
	Reason          string
}
