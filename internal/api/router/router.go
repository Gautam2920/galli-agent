package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/Gautam2920/galli-agent/backend/internal/api/handler"
	"github.com/Gautam2920/galli-agent/backend/internal/app"
)

func New(
	application *app.App,
) http.Handler {

	r := chi.NewRouter()

	deliveryHandler := handler.NewDeliveryHandler(
		application,
	)

	r.Post(
		"/api/v1/delivery/analyse",
		deliveryHandler.AnalyseDelivery,
	)

	return r
}
