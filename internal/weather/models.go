package weather

type Condition string

const (
	ConditionClear        Condition = "CLEAR"
	ConditionClouds       Condition = "CLOUDS"
	ConditionRain         Condition = "RAIN"
	ConditionThunderstorm Condition = "THUNDERSTORM"
	ConditionSnow         Condition = "SNOW"
	ConditionFog          Condition = "FOG"
	ConditionUnknown      Condition = "UNKNOWN"
)

type CurrentWeather struct {
	Condition                Condition
	Temperature              float64
	VisibilityMeters         int
	WindSpeedMetersPerSecond float64
	PrecipitationProbability int
}
