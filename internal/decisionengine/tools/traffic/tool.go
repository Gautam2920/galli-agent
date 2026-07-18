package traffic

import (
	"fmt"

	framework "github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/spatial/sampling"
	trafficdomain "github.com/Gautam2920/galli-agent/backend/internal/traffic"
)

type Tool struct {
	trafficService *trafficdomain.Service
}

func NewTool(
	trafficService *trafficdomain.Service,
) *Tool {

	return &Tool{
		trafficService: trafficService,
	}
}

func (t *Tool) Analyse(
	ctx *framework.AgentContext,
) (models.TrafficAnalysis, error) {

	sampledPoints := sampling.SampleRoute(
		ctx.DecisionEngineState.RouteAnalysis.Route.Geometry,
		sampling.DefaultSampleCount,
	)

	for i, point := range sampledPoints {
		fmt.Printf(
			"Sample %d -> Lat: %.6f Lon: %.6f\n",
			i+1,
			point.Latitude,
			point.Longitude,
		)
	}

	trafficObservations, err := t.trafficService.GetCurrentTraffic(
		ctx.Context,
		sampledPoints,
	)

	if err != nil {
		fmt.Println("Traffic service error:", err)
		return models.TrafficAnalysis{}, err
	}

	fmt.Printf(
		"Traffic observations returned: %d\n",
		len(trafficObservations),
	)

	if len(trafficObservations) == 0 {
		fmt.Println("No traffic observations received.")
		return models.TrafficAnalysis{}, nil
	}

	aggregatedTraffic := aggregateTraffic(
		trafficObservations,
		len(sampledPoints),
	)

	analysis := models.TrafficAnalysis{
		Traffic: trafficObservations,
	}

	analysis.CongestionLevel = determineCongestion(
		aggregatedTraffic,
	)

	analysis.RiskScore = determineRisk(
		analysis.CongestionLevel,
		aggregatedTraffic,
	)

	analysis.ConfidenceScore = aggregatedTraffic.TrafficConfidence

	analysis.Reason = generateReason(
		aggregatedTraffic,
		analysis.CongestionLevel,
	)

	return analysis, nil
}

func aggregateTraffic(
	observations []trafficdomain.CurrentTraffic,
	expectedSamples int,
) trafficdomain.CurrentTraffic {

	var totalCurrentSpeed int
	var totalFreeFlowSpeed int

	maxDelay := 0
	roadClosed := false

	for _, observation := range observations {

		totalCurrentSpeed += observation.CurrentSpeedKmph
		totalFreeFlowSpeed += observation.FreeFlowSpeedKmph

		if observation.DelaySeconds > maxDelay {
			maxDelay = observation.DelaySeconds
		}

		if observation.RoadClosed {
			roadClosed = true
		}
	}

	count := len(observations)

	confidence := 100
	if expectedSamples > 0 {
		confidence = count * 100 / expectedSamples
	}

	return trafficdomain.CurrentTraffic{
		CurrentSpeedKmph:  totalCurrentSpeed / count,
		FreeFlowSpeedKmph: totalFreeFlowSpeed / count,
		DelaySeconds:      maxDelay,
		RoadClosed:        roadClosed,
		TrafficConfidence: confidence,
	}
}

func determineCongestion(
	current trafficdomain.CurrentTraffic,
) int {

	if current.FreeFlowSpeedKmph <= 0 {
		return 0
	}

	congestion := 100 - (current.CurrentSpeedKmph * 100 / current.FreeFlowSpeedKmph)

	if congestion < 0 {
		return 0
	}

	if congestion > 100 {
		return 100
	}

	return congestion
}

func determineRisk(
	congestion int,
	current trafficdomain.CurrentTraffic,
) int {

	if current.RoadClosed {
		return 100
	}

	switch {

	case congestion <= 10:
		return 10

	case congestion <= 30:
		return 30

	case congestion <= 50:
		return 50

	case congestion <= 70:
		return 70

	default:
		return 90
	}
}

func generateReason(
	current trafficdomain.CurrentTraffic,
	congestion int,
) string {

	if current.RoadClosed {
		return "Road closure detected on the selected route."
	}

	switch {

	case congestion <= 10:
		return "Traffic is flowing close to free-flow speed."

	case congestion <= 30:
		return "Minor congestion detected with little expected impact."

	case congestion <= 50:
		return "Moderate congestion may increase delivery time."

	case congestion <= 70:
		return "Heavy congestion is likely to delay delivery."

	default:
		return "Severe congestion detected on the selected route."
	}
}
