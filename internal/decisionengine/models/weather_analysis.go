package models

type WeatherAnalysis struct {
	Condition       string
	Temperature     float64
	Visibility      float64
	RiskScore       int
	ConfidenceScore int
	Reason          string
}
