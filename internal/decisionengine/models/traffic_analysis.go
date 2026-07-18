package models

import traffic "github.com/Gautam2920/galli-agent/backend/internal/traffic"

type TrafficAnalysis struct {
	Traffic         traffic.CurrentTraffic
	CongestionLevel int
	RiskScore       int
	ConfidenceScore int
	Reason          string
}
