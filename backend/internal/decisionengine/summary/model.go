package summary

type OperationalSummary struct {
	Decision          string
	Confidence        int
	OverallAssessment string
	RouteSummary      string
	WeatherSummary    string
	TrafficSummary    string
	RiskSummary       string
	PartnerSummary    string
	Highlights        []string
}
