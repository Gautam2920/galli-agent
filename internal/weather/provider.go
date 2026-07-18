package weather

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type Provider interface {
	GetCurrentWeather(
		ctx context.Context,
		location location.Location,
	) (CurrentWeather, error)
}
