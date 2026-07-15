package framework

import (
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/delivery"
)

type AgentContext struct {
	Delivery            delivery.Delivery
	DecisionEngineState models.DecisionEngineState
}
