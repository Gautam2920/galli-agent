package fulfillment

type Candidate struct {
	Store              Store
	DistanceKilometers float64
	OperationalScore   float64
}
