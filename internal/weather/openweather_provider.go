package weather

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"time"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type OpenWeatherProvider struct {
	apiKey  string
	baseURL string
	client  *http.Client
}

func NewOpenWeatherProvider(
	apiKey string,
	baseURL string,
) *OpenWeatherProvider {

	return &OpenWeatherProvider{
		apiKey:  apiKey,
		baseURL: baseURL,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (p *OpenWeatherProvider) GetCurrentWeather(
	ctx context.Context,
	location location.Location,
) (CurrentWeather, error) {

	endpoint, err := url.JoinPath(
		p.baseURL,
		CurrentPath,
	)
	if err != nil {
		return CurrentWeather{}, fmt.Errorf("build weather URL: %w", err)
	}

	reqURL, err := url.Parse(endpoint)
	if err != nil {
		return CurrentWeather{}, fmt.Errorf("parse weather URL: %w", err)
	}

	query := reqURL.Query()
	query.Set(LatitudeParam, fmt.Sprintf("%f", location.Latitude))
	query.Set(LongitudeParam, fmt.Sprintf("%f", location.Longitude))
	query.Set(APIKeyParam, p.apiKey)
	query.Set(UnitsParam, UnitsMetric)

	reqURL.RawQuery = query.Encode()

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodGet,
		reqURL.String(),
		nil,
	)
	if err != nil {
		return CurrentWeather{}, fmt.Errorf("create weather request: %w", err)
	}

	resp, err := p.client.Do(req)
	if err != nil {
		return CurrentWeather{}, fmt.Errorf("execute weather request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return CurrentWeather{}, fmt.Errorf(
			"OpenWeather returned status %d",
			resp.StatusCode,
		)
	}

	var response openWeatherResponse

	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return CurrentWeather{}, fmt.Errorf(
			"decode weather response: %w",
			err,
		)
	}

	var condition Condition = ConditionUnknown

	if len(response.Weather) > 0 {

		switch response.Weather[0].Main {

		case "Clear":
			condition = ConditionClear

		case "Clouds":
			condition = ConditionClouds

		case "Rain":
			condition = ConditionRain

		case "Thunderstorm":
			condition = ConditionThunderstorm

		case "Snow":
			condition = ConditionSnow

		case "Mist", "Fog", "Haze", "Smoke":
			condition = ConditionFog

		default:
			condition = ConditionUnknown
		}
	}

	return CurrentWeather{
		Condition:                condition,
		Temperature:              response.Main.Temp,
		VisibilityMeters:         response.Visibility,
		WindSpeedMetersPerSecond: response.Wind.Speed,
		PrecipitationProbability: 0,
	}, nil
}
