package routing

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type OpenRouteServiceProvider struct {
	apiKey  string
	baseURL string
	client  *http.Client
}

func NewOpenRouteServiceProvider(
	apiKey string,
	baseURL string,
) *OpenRouteServiceProvider {

	return &OpenRouteServiceProvider{
		apiKey:  apiKey,
		baseURL: baseURL,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (p *OpenRouteServiceProvider) CalculateRoute(
	ctx context.Context,
	pickup location.Location,
	destination location.Location,
) (Route, error) {

	requestBody := orsDirectionsRequest{
		Coordinates: [][]float64{
			{
				pickup.Longitude,
				pickup.Latitude,
			},
			{
				destination.Longitude,
				destination.Latitude,
			},
		},
	}

	payload, err := json.Marshal(requestBody)
	if err != nil {
		return Route{}, fmt.Errorf("marshal ORS request: %w", err)
	}

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		p.baseURL+DirectionsPath,
		bytes.NewReader(payload),
	)
	if err != nil {
		return Route{}, fmt.Errorf("create ORS request: %w", err)
	}

	req.Header.Set(AuthorizationKey, p.apiKey)
	req.Header.Set(ContentTypeHeader, ContentTypeJSON)

	resp, err := p.client.Do(req)
	if err != nil {
		return Route{}, fmt.Errorf("execute ORS request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return Route{}, fmt.Errorf("ORS returned status %d", resp.StatusCode)
	}

	var orsResponse orsDirectionsResponse

	if err := json.NewDecoder(resp.Body).Decode(&orsResponse); err != nil {
		return Route{}, fmt.Errorf("decode ORS response: %w", err)
	}

	if len(orsResponse.Routes) == 0 {
		return Route{}, fmt.Errorf("ORS returned no routes")
	}

	summary := orsResponse.Routes[0].Summary

	return Route{
		Summary: RouteSummary{
			DistanceKilometers: summary.Distance / 1000,
			EstimatedMinutes:   int(summary.Duration / 60),
		},
	}, nil
}
