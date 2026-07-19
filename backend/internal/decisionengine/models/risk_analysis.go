package models

type RiskAnalysis struct {
	Level           string
	RiskScore       int
	ConfidenceScore int
	Reason          string
}
