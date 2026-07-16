package dto

type AnalyseDeliveryResponse struct {
	Decision   string `json:"decision"`
	Confidence int    `json:"confidence"`
	Route      string `json:"route"`
	Risk       string `json:"risk"`
	Partner    string `json:"partner"`
	Reason     string `json:"reason"`
}
