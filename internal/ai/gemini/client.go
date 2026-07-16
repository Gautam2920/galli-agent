package gemini

import (
	"context"
	"strings"

	"google.golang.org/genai"
)

type Client struct {
	client *genai.Client
	model  string
}

func NewClient(
	apiKey string,
	model string,
) (*Client, error) {

	client, err := genai.NewClient(
		context.Background(),
		&genai.ClientConfig{
			APIKey:  apiKey,
			Backend: genai.BackendGeminiAPI,
		},
	)

	if err != nil {
		return nil, err
	}

	return &Client{
		client: client,
		model:  model,
	}, nil
}

func (c *Client) GenerateText(
	ctx context.Context,
	prompt string,
) (string, error) {

	response, err := c.client.Models.GenerateContent(
		ctx,
		c.model,
		genai.Text(prompt),
		nil,
	)

	if err != nil {
		return "", err
	}

	return strings.TrimSpace(response.Text()), nil
}
