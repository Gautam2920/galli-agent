package models

type DeliveryIntelligenceReport struct {
	Distance        float64
	RiskLevel       string
	ConfidenceScore int
	Recommendation  string
	Reason          string
}
