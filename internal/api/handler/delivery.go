package handler

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/Gautam2920/galli-agent/backend/internal/api/dto"
	"github.com/Gautam2920/galli-agent/backend/internal/app"
	"github.com/Gautam2920/galli-agent/backend/internal/delivery"
	"github.com/Gautam2920/galli-agent/backend/internal/location"
)

type DeliveryHandler struct {
	app *app.App
}

func NewDeliveryHandler(
	application *app.App,
) *DeliveryHandler {

	return &DeliveryHandler{
		app: application,
	}
}

func (h *DeliveryHandler) AnalyseDelivery(
	w http.ResponseWriter,
	r *http.Request,
) {

	var request dto.AnalyseDeliveryRequest

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {

		http.Error(
			w,
			"invalid request body",
			http.StatusBadRequest,
		)

		return
	}

	deliveryRequest := delivery.Delivery{

		Pickup: location.Location{
			Address:   request.Pickup.Address,
			Latitude:  request.Pickup.Latitude,
			Longitude: request.Pickup.Longitude,
		},

		Destination: location.Location{
			Address:   request.Destination.Address,
			Latitude:  request.Destination.Latitude,
			Longitude: request.Destination.Longitude,
		},
	}

	result, err := h.app.AnalyseDeliveryWithAI(
		context.Background(),
		deliveryRequest,
	)

	if err != nil {

		http.Error(
			w,
			err.Error(),
			http.StatusInternalServerError,
		)

		return
	}

	response := dto.AnalyseDeliveryResponse{

		Decision: result.Report.OverallDecision,

		Confidence: result.Report.ConfidenceScore,

		Route: result.Report.RouteSummary,

		Risk: result.Report.RiskSummary,

		Partner: result.Report.PartnerSummary,

		Reason: result.Report.Reason,

		AIExplanation: result.AIExplanation,
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(
			w,
			"failed to encode response",
			http.StatusInternalServerError,
		)
	}
}
