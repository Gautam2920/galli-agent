package weather

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type StubProvider struct{}

func NewStubProvider() *StubProvider {
	return &StubProvider{}
}

func (p *StubProvider) GetCurrentWeather(
	ctx context.Context,
	location location.Location,
) (CurrentWeather, error) {

	return CurrentWeather{
		Condition:                ConditionClear,
		Temperature:              29.0,
		VisibilityMeters:         10000,
		WindSpeedMetersPerSecond: 2.3,
		PrecipitationProbability: 0,
	}, nil
}
