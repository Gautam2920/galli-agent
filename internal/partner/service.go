package partner

type Service struct {
	repository *Repository
}

func NewService(
	repository *Repository,
) *Service {

	return &Service{
		repository: repository,
	}
}

func (s *Service) AvailablePartners() []Partner {
	return s.repository.GetAvailablePartners()
}
