package traffic

type tomTomFlowSegmentResponse struct {
	FlowSegmentData tomTomFlowSegmentData `json:"flowSegmentData"`
}

type tomTomFlowSegmentData struct {
	CurrentSpeed       int     `json:"currentSpeed"`
	FreeFlowSpeed      int     `json:"freeFlowSpeed"`
	CurrentTravelTime  int     `json:"currentTravelTime"`
	FreeFlowTravelTime int     `json:"freeFlowTravelTime"`
	Confidence         float64 `json:"confidence"`
	RoadClosure        bool    `json:"roadClosure"`
}
