package weather

type openWeatherResponse struct {
	Weather []openWeatherCondition `json:"weather"`
	Main    openWeatherMain        `json:"main"`
	Wind    openWeatherWind        `json:"wind"`

	Visibility int `json:"visibility"`
}

type openWeatherCondition struct {
	Main string `json:"main"`
}

type openWeatherMain struct {
	Temp float64 `json:"temp"`
}

type openWeatherWind struct {
	Speed float64 `json:"speed"`
}
