package gemini

import (
	"context"
)

type Service struct {
	client *Client
}

func NewService(client *Client) *Service {
	return &Service{
		client: client,
	}
}

func (s *Service) GenerateDeliveryExplanation(
	ctx context.Context,
	geminiContext Context,
) (string, error) {

	prompt := BuildDeliveryExplanationPrompt(geminiContext)

	return s.client.GenerateText(
		ctx,
		prompt,
	)
}
