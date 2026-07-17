package fulfillment

import "github.com/Gautam2920/galli-agent/backend/internal/location"

type Repository struct {
	stores []Store
}

func NewRepository() *Repository {

	return &Repository{
		stores: []Store{
			{
				ID:      "KS001",
				Name:    "Patel Kirana Store",
				Address: "Sigra, Varanasi",
				Location: location.Location{
					Latitude:  25.3176,
					Longitude: 82.9739,
				},
				InventoryScore: 94,
				Rating:         4.8,
				Active:         true,
			},
			{
				ID:      "KS002",
				Name:    "Gupta General Store",
				Address: "Lanka, Varanasi",
				Location: location.Location{
					Latitude:  25.2677,
					Longitude: 82.9913,
				},
				InventoryScore: 91,
				Rating:         4.6,
				Active:         true,
			},
			{
				ID:      "KS003",
				Name:    "Sharma Kirana",
				Address: "Bhelupur, Varanasi",
				Location: location.Location{
					Latitude:  25.3048,
					Longitude: 82.9987,
				},
				InventoryScore: 88,
				Rating:         4.5,
				Active:         true,
			},
			{
				ID:      "KS004",
				Name:    "Annapurna Stores",
				Address: "Assi, Varanasi",
				Location: location.Location{
					Latitude:  25.2825,
					Longitude: 83.0062,
				},
				InventoryScore: 96,
				Rating:         4.9,
				Active:         true,
			},
			{
				ID:      "KS005",
				Name:    "Verma Mart",
				Address: "Manduadih, Varanasi",
				Location: location.Location{
					Latitude:  25.2897,
					Longitude: 82.9552,
				},
				InventoryScore: 86,
				Rating:         4.3,
				Active:         true,
			},
			{
				ID:      "KS006",
				Name:    "Kashi Daily Needs",
				Address: "Godowlia, Varanasi",
				Location: location.Location{
					Latitude:  25.3092,
					Longitude: 83.0107,
				},
				InventoryScore: 90,
				Rating:         4.7,
				Active:         true,
			},
			{
				ID:      "KS007",
				Name:    "Maa Annapurna Kirana",
				Address: "DLW, Varanasi",
				Location: location.Location{
					Latitude:  25.2838,
					Longitude: 82.9682,
				},
				InventoryScore: 87,
				Rating:         4.4,
				Active:         true,
			},
			{
				ID:      "KS008",
				Name:    "Raj Provision Store",
				Address: "Rathyatra, Varanasi",
				Location: location.Location{
					Latitude:  25.3070,
					Longitude: 82.9855,
				},
				InventoryScore: 92,
				Rating:         4.8,
				Active:         true,
			},
		},
	}
}

func (r *Repository) GetAvailableStores() []Store {
	return r.stores
}
