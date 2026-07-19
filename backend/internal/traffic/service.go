package traffic

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
)

type Service struct {
	provider Provider
}

func NewService(provider Provider) *Service {
	return &Service{
		provider: provider,
	}
}

func (s *Service) GetCurrentTraffic(
	ctx context.Context,
	points []routing.RoutePoint,
) ([]CurrentTraffic, error) {

	return s.provider.GetCurrentTraffic(
		ctx,
		points,
	)
}
