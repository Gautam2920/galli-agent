package routing

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type Service struct {
	provider RoutingProvider
}

func NewService(provider RoutingProvider) *Service {
	return &Service{
		provider: provider,
	}
}

func (s *Service) CalculateRoute(
	ctx context.Context,
	pickup location.Location,
	destination location.Location,
) (Route, error) {

	return s.provider.CalculateRoute(
		ctx,
		pickup,
		destination,
	)
}
