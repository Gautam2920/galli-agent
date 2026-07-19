package dto

type AnalyseDeliveryRequest struct {
	Pickup      LocationDTO `json:"pickup"`
	Destination LocationDTO `json:"destination"`
}

type LocationDTO struct {
	Address   string  `json:"address"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}
