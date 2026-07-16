package partner

type Repository struct{}

func NewRepository() *Repository {
	return &Repository{}
}

func (r *Repository) GetAvailablePartners() []Partner {

	return []Partner{

		{
			ID:                "P001",
			Name:              "Puskin Logistics",
			Rating:            4.9,
			CurrentDeliveries: 2,
			ServiceArea:       "Varanasi",
			IsAvailable:       true,
		},

		{
			ID:                "P002",
			Name:              "QuickMove",
			Rating:            4.5,
			CurrentDeliveries: 5,
			ServiceArea:       "Varanasi",
			IsAvailable:       true,
		},

		{
			ID:                "P003",
			Name:              "SwiftDrop",
			Rating:            4.2,
			CurrentDeliveries: 7,
			ServiceArea:       "Varanasi",
			IsAvailable:       true,
		},
	}
}
