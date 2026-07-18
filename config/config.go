package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	OpenRouteServiceAPIKey  string
	OpenRouteServiceBaseURL string

	OpenWeatherAPIKey  string
	OpenWeatherBaseURL string

	GeminiAPIKey string
	GeminiModel  string
}

func Load() *Config {

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found. Using system environment variables.")
	}

	cfg := &Config{
		OpenRouteServiceAPIKey:  os.Getenv("ORS_API_KEY"),
		OpenRouteServiceBaseURL: os.Getenv("ORS_BASE_URL"),

		OpenWeatherAPIKey:  os.Getenv("OPENWEATHER_API_KEY"),
		OpenWeatherBaseURL: os.Getenv("OPENWEATHER_BASE_URL"),

		GeminiAPIKey: os.Getenv("GEMINI_API_KEY"),
		GeminiModel:  os.Getenv("GEMINI_MODEL"),
	}

	if cfg.OpenRouteServiceBaseURL == "" {
		cfg.OpenRouteServiceBaseURL = "https://api.openrouteservice.org"
	}

	if cfg.OpenWeatherBaseURL == "" {
		cfg.OpenWeatherBaseURL = "https://api.openweathermap.org"
	}

	if cfg.GeminiModel == "" {
		cfg.GeminiModel = "gemini-2.5-flash"
	}

	if cfg.OpenRouteServiceAPIKey == "" {
		log.Fatal("ORS_API_KEY is not set")
	}

	if cfg.OpenWeatherAPIKey == "" {
		log.Fatal("OPENWEATHER_API_KEY is not set")
	}

	if cfg.GeminiAPIKey == "" {
		log.Fatal("GEMINI_API_KEY is not set")
	}

	return cfg
}
