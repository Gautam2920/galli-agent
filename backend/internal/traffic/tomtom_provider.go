package traffic

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
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
	points []routing.RoutePoint,
) ([]CurrentTraffic, error) {

	observations := make([]CurrentTraffic, 0, len(points))

	for i, point := range points {

		fmt.Printf(
			"\nPoint %d -> Lat: %.6f Lon: %.6f\n",
			i+1,
			point.Latitude,
			point.Longitude,
		)

		url := fmt.Sprintf(
			"%s/traffic/services/4/flowSegmentData/absolute/10/json?point=%f,%f&unit=KMPH&openLr=false&key=%s",
			p.baseURL,
			point.Latitude,
			point.Longitude,
			p.apiKey,
		)

		fmt.Println("URL:", url)

		req, err := http.NewRequestWithContext(
			ctx,
			http.MethodGet,
			url,
			nil,
		)

		if err != nil {
			fmt.Println("Create request failed:", err)
			continue
		}

		resp, err := p.client.Do(req)

		if err != nil {
			fmt.Println("HTTP request failed:", err)
			continue
		}

		if resp.StatusCode != http.StatusOK {

			body, _ := io.ReadAll(resp.Body)

			fmt.Println("Status:", resp.Status)
			fmt.Println("Body:")
			fmt.Println(string(body))

			resp.Body.Close()
			continue
		}

		var response tomTomFlowSegmentResponse

		err = json.NewDecoder(resp.Body).Decode(&response)
		resp.Body.Close()

		if err != nil {
			fmt.Println("Decode failed:", err)
			continue
		}

		fmt.Println("Request succeeded.")

		data := response.FlowSegmentData

		delay := data.CurrentTravelTime - data.FreeFlowTravelTime

		if delay < 0 {
			delay = 0
		}

		observations = append(observations, CurrentTraffic{
			CurrentSpeedKmph:  data.CurrentSpeed,
			FreeFlowSpeedKmph: data.FreeFlowSpeed,
			DelaySeconds:      delay,
			RoadClosed:        data.RoadClosure,
		})
	}

	fmt.Printf("\nSuccessful observations: %d\n", len(observations))

	if len(observations) == 0 {
		return nil, fmt.Errorf("unable to retrieve traffic data for any sampled route point")
	}

	return observations, nil
}
