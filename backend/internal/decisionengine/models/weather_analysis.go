package models

import "github.com/Gautam2920/galli-agent/backend/internal/weather"

type WeatherAnalysis struct {
	Weather         weather.CurrentWeather
	RiskScore       int
	ConfidenceScore int
	Reason          string
}
