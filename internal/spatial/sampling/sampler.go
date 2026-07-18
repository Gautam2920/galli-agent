package sampling

import (
	"github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"
)

const DefaultSampleCount = 10

func SampleRoute(
	geometry []routing.RoutePoint,
	sampleCount int,
) []routing.RoutePoint {

	if len(geometry) == 0 {
		return nil
	}

	if len(geometry) == 1 {
		return geometry
	}

	if sampleCount <= 0 {
		sampleCount = DefaultSampleCount
	}

	if len(geometry) <= sampleCount+1 {
		return geometry
	}

	samples := make([]routing.RoutePoint, 0, sampleCount+1)

	lastIndex := len(geometry) - 1

	step := float64(lastIndex) / float64(sampleCount)

	for i := 0; i <= sampleCount; i++ {
		index := int(float64(i) * step)

		if index > lastIndex {
			index = lastIndex
		}

		samples = append(samples, geometry[index])
	}

	samples[len(samples)-1] = geometry[lastIndex]

	return samples
}
