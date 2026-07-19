package fulfillment

import (
	"errors"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/delivery"
	fulfillmentdomain "github.com/Gautam2920/galli-agent/backend/internal/fulfillment"
	"github.com/Gautam2920/galli-agent/backend/internal/geo"
)

type Tool struct {
	service *fulfillmentdomain.Service
	scorer  *fulfillmentdomain.Scorer
}

func NewTool(
	service *fulfillmentdomain.Service,
	scorer *fulfillmentdomain.Scorer,
) *Tool {
	return &Tool{
		service: service,
		scorer:  scorer,
	}
}

func (t *Tool) Analyse(
	delivery delivery.Delivery,
) (models.FulfillmentAnalysis, error) {

	stores := t.service.GetStores()

	candidates := make([]fulfillmentdomain.Candidate, 0)

	for _, store := range stores {

		if !store.Active {
			continue
		}

		distance := geo.DistanceInKilometers(
			store.Location.Latitude,
			store.Location.Longitude,
			delivery.Destination.Latitude,
			delivery.Destination.Longitude,
		)

		score := t.scorer.CalculateScore(
			store,
			distance,
		)

		candidates = append(
			candidates,
			fulfillmentdomain.Candidate{
				Store:              store,
				DistanceKilometers: distance,
				OperationalScore:   score,
			},
		)
	}

	if len(candidates) == 0 {
		return models.FulfillmentAnalysis{}, errors.New("no active fulfillment stores available")
	}

	best := candidates[0]

	for _, candidate := range candidates {
		if candidate.OperationalScore > best.OperationalScore {
			best = candidate
		}
	}

	return models.FulfillmentAnalysis{
		SelectedCandidate: best,
		Candidates:        candidates,
		ConfidenceScore:   calculateConfidence(best),
		Reason:            "Highest operational score among active stores.",
	}, nil
}

func calculateConfidence(
	candidate fulfillmentdomain.Candidate,
) int {

	switch {
	case candidate.OperationalScore >= 250:
		return 95

	case candidate.OperationalScore >= 220:
		return 90

	case candidate.OperationalScore >= 180:
		return 85

	default:
		return 75
	}
}
