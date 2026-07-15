package route

import "github.com/Gautam2920/galli-agent/backend/internal/spatial/routing"

type Tool struct {
	routingService *routing.Service
}

func NewTool(routingService *routing.Service) *Tool {
	return &Tool{
		routingService: routingService,
	}
}
