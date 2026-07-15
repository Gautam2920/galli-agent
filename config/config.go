package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	OpenRouteServiceAPIKey  string
	OpenRouteServiceBaseURL string
}

func Load() *Config {

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found. Using system environment variables.")
	}

	cfg := &Config{
		OpenRouteServiceAPIKey:  os.Getenv("ORS_API_KEY"),
		OpenRouteServiceBaseURL: os.Getenv("ORS_BASE_URL"),
	}

	if cfg.OpenRouteServiceBaseURL == "" {
		cfg.OpenRouteServiceBaseURL = "https://api.openrouteservice.org"
	}

	if cfg.OpenRouteServiceAPIKey == "" {
		log.Fatal("ORS_API_KEY is not set")
	}

	return cfg
}
