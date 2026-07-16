package gemini

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
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
	report models.DeliveryIntelligenceReport,
) (string, error) {

	prompt := BuildDeliveryExplanationPrompt(report)

	return s.client.GenerateText(
		ctx,
		prompt,
	)
}
