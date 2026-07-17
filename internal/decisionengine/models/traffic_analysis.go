package models

type TrafficAnalysis struct {
	CongestionLevel string
	DelayMinutes    int
	RiskScore       int
	ConfidenceScore int
	Reason          string
}
