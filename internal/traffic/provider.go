package traffic

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type Provider interface {
	GetCurrentTraffic(
		ctx context.Context,
		pickup location.Location,
		destination location.Location,
	) (CurrentTraffic, error)
}
