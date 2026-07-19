package routing

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type RoutingProvider interface {
	CalculateRoute(
		ctx context.Context,
		pickup location.Location,
		destination location.Location,
	) (Route, error)
}
