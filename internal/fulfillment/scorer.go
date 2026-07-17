package fulfillment

type Scorer struct{}

func NewScorer() *Scorer {
	return &Scorer{}
}

func (s *Scorer) CalculateScore(
	store Store,
	distanceKm float64,
) float64 {
	score := 0.0
	score += 100 - distanceKm
	score += float64(store.InventoryScore)
	score += store.Rating * 20
	return score
}
