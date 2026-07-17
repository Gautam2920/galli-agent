package fulfillment

import "github.com/Gautam2920/galli-agent/backend/internal/location"

type Store struct {
	ID             string
	Name           string
	Address        string
	Location       location.Location
	InventoryScore float64
	Rating         float64
	Active         bool
}
