package traffic

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type TomTomProvider struct {
	apiKey  string
	baseURL string
	client  *http.Client
}

func NewTomTomProvider(
	apiKey string,
	baseURL string,
) *TomTomProvider {

	return &TomTomProvider{
		apiKey:  apiKey,
		baseURL: baseURL,
		client:  &http.Client{},
	}
}

func (p *TomTomProvider) GetCurrentTraffic(
	ctx context.Context,
	pickup location.Location,
	destination location.Location,
) (CurrentTraffic, error) {

	url := fmt.Sprintf(
		"%s/traffic/services/4/flowSegmentData/absolute/10/json?point=%f,%f&unit=KMPH&openLr=false&key=%s",
		p.baseURL,
		destination.Latitude,
		destination.Longitude,
		p.apiKey,
	)

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodGet,
		url,
		nil,
	)
	if err != nil {
		return CurrentTraffic{}, err
	}

	resp, err := p.client.Do(req)
	if err != nil {
		return CurrentTraffic{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return CurrentTraffic{}, fmt.Errorf(
			"traffic api returned status %d",
			resp.StatusCode,
		)
	}

	var response tomTomFlowSegmentResponse

	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return CurrentTraffic{}, err
	}

	data := response.FlowSegmentData

	delay := data.CurrentTravelTime - data.FreeFlowTravelTime
	if delay < 0 {
		delay = 0
	}

	return CurrentTraffic{
		CurrentSpeedKmph:  data.CurrentSpeed,
		FreeFlowSpeedKmph: data.FreeFlowSpeed,
		DelaySeconds:      delay,
		RoadClosed:        data.RoadClosure,
	}, nil
}
