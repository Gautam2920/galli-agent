package models

type CrowdAnalysis struct {
	Density                 string
	OperationalDelayMinutes int
	RiskScore               int
	ConfidenceScore         int
	Reason                  string
}
