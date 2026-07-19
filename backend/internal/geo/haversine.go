package geo

import "math"

const earthRadiusKm = 6371.0

func DistanceInKilometers(
	lat1, lon1 float64,
	lat2, lon2 float64,
) float64 {

	dLat := degreesToRadians(lat2 - lat1)
	dLon := degreesToRadians(lon2 - lon1)

	lat1 = degreesToRadians(lat1)
	lat2 = degreesToRadians(lat2)

	a :=
		math.Sin(dLat/2)*math.Sin(dLat/2) +
			math.Cos(lat1)*
				math.Cos(lat2)*
				math.Sin(dLon/2)*
				math.Sin(dLon/2)

	c := 2 * math.Atan2(
		math.Sqrt(a),
		math.Sqrt(1-a),
	)

	return earthRadiusKm * c
}

func degreesToRadians(degrees float64) float64 {
	return degrees * math.Pi / 180
}
