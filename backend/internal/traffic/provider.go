package traffic

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
)

type Provider interface {
	GetCurrentTraffic(
		ctx context.Context,
		points []routing.RoutePoint,
	) ([]CurrentTraffic, error)
}
