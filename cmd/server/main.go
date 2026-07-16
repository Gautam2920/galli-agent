package main

import (
	"log"
	"net/http"

	"github.com/Gautam2920/galli-agent/backend/config"
	"github.com/Gautam2920/galli-agent/backend/internal/api/router"
	"github.com/Gautam2920/galli-agent/backend/internal/app"
)

func main() {

	cfg := config.Load()

	application := app.New(cfg)

	log.Println("Server started on :8080")

	err := http.ListenAndServe(
		":8080",
		router.New(application),
	)

	if err != nil {
		log.Fatal(err)
	}
}
