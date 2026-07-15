package delivery

import "github.com/Gautam2920/galli-agent/backend/internal/location"

type Delivery struct {
	ID          string
	Pickup      location.Location
	Destination location.Location
}
