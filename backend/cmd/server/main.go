package main

import (
	"log"
	"net/http"
	"os"

	"github.com/Gautam2920/galli-agent/backend/config"
	"github.com/Gautam2920/galli-agent/backend/internal/api/router"
	"github.com/Gautam2920/galli-agent/backend/internal/app"
)

func main() {
	cfg := config.Load()

	application := app.New(cfg)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	addr := ":" + port

	log.Printf("Server started on %s", addr)

	err := http.ListenAndServe(
		addr,
		router.New(application),
	)

	if err != nil {
		log.Fatal(err)
	}
}
