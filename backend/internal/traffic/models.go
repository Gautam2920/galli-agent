package traffic

type CurrentTraffic struct {
	CurrentSpeedKmph  int
	FreeFlowSpeedKmph int
	DelaySeconds      int
	RoadClosed        bool
	TrafficConfidence int
}
