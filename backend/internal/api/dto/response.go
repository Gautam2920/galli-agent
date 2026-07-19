package dto

type RouteResponse struct {
	DistanceKilometers float64 `json:"distanceKilometers"`
	EstimatedMinutes   int     `json:"estimatedMinutes"`
	Complexity         string  `json:"complexity"`
	Reason             string  `json:"reason"`
}

type WeatherResponse struct {
	Condition   string  `json:"condition"`
	Temperature float64 `json:"temperature"`
	RiskScore   int     `json:"riskScore"`
	Reason      string  `json:"reason"`
}

type TrafficResponse struct {
	CongestionLevel int    `json:"congestionLevel"`
	RiskScore       int    `json:"riskScore"`
	Reason          string `json:"reason"`
}

type RiskResponse struct {
	Level     string `json:"level"`
	RiskScore int    `json:"riskScore"`
	Reason    string `json:"reason"`
}

type PartnerResponse struct {
	Name   string  `json:"name"`
	Rating float64 `json:"rating"`
	Reason string  `json:"reason"`
}

type AnalyseDeliveryResponse struct {
	Decision      string          `json:"decision"`
	Confidence    int             `json:"confidence"`
	Route         RouteResponse   `json:"route"`
	Weather       WeatherResponse `json:"weather"`
	Traffic       TrafficResponse `json:"traffic"`
	Risk          RiskResponse    `json:"risk"`
	Partner       PartnerResponse `json:"partner"`
	Reason        string          `json:"reason"`
	AIExplanation string          `json:"aiExplanation,omitempty"`
}
