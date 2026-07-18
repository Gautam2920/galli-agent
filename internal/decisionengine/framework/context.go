package framework

import (
	"context"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/delivery"
)

type AgentContext struct {
	Context             context.Context
	Delivery            delivery.Delivery
	DecisionEngineState models.DecisionEngineState
}
