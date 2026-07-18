package traffic

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/location"
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
	ctx context.Context,
	pickup location.Location,
	destination location.Location,
) (models.TrafficAnalysis, error) {

	currentTraffic, err := t.trafficService.GetCurrentTraffic(
		ctx,
		pickup,
		destination,
	)

	if err != nil {
		return models.TrafficAnalysis{}, err
	}

	analysis := models.TrafficAnalysis{
		Traffic: currentTraffic,
	}

	analysis.CongestionLevel = determineCongestion(currentTraffic)
	analysis.RiskScore = determineRisk(analysis.CongestionLevel, currentTraffic)
	analysis.ConfidenceScore = determineConfidence(analysis.RiskScore)
	analysis.Reason = generateReason(currentTraffic, analysis.CongestionLevel)

	return analysis, nil
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

func determineConfidence(
	risk int,
) int {

	switch {

	case risk <= 20:
		return 96

	case risk <= 50:
		return 90

	default:
		return 84
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
