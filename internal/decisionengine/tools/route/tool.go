package route

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/location"
	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
)

type Tool struct {
	routingService *routing.Service
}

func NewTool(routingService *routing.Service) *Tool {
	return &Tool{
		routingService: routingService,
	}
}

func (t *Tool) Analyse(
	ctx context.Context,
	pickup location.Location,
	destination location.Location,
) (models.RouteAnalysis, error) {

	route, err := t.routingService.CalculateRoute(
		ctx,
		pickup,
		destination,
	)

	if err != nil {
		return models.RouteAnalysis{}, err
	}

	analysis := models.RouteAnalysis{
		Route: route,
	}

	analysis.RouteComplexity = determineComplexity(route)
	analysis.ConfidenceScore = determineConfidence(route, analysis.RouteComplexity)
	analysis.Reason = generateReason(route, analysis.RouteComplexity)

	return analysis, nil
}

func determineComplexity(route routing.Route) string {

	distance := route.Summary.DistanceKilometers

	switch {
	case distance < 3:
		return "Low"

	case distance < 8:
		return "Medium"

	default:
		return "High"
	}
}

func determineConfidence(
	route routing.Route,
	complexity string,
) int {

	switch complexity {
	case "Low":
		return 96

	case "Medium":
		return 90

	default:
		return 82
	}
}

func generateReason(
	route routing.Route,
	complexity string,
) string {

	switch complexity {

	case "Low":
		return "Short route with minimal expected delivery complexity."

	case "Medium":
		return "Moderate travel distance requiring standard delivery planning."

	default:
		return "Long delivery route requiring increased operational attention."

	}
}
