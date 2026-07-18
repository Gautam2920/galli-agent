package weather

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type Service struct {
	provider Provider
}

func NewService(
	provider Provider,
) *Service {

	return &Service{
		provider: provider,
	}
}

func (s *Service) GetCurrentWeather(
	ctx context.Context,
	location location.Location,
) (CurrentWeather, error) {

	return s.provider.GetCurrentWeather(
		ctx,
		location,
	)
}
