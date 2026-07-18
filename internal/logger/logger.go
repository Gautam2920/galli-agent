package logger

import "fmt"

const (
	Engine      = "ENGINE"
	Workflow    = "WORKFLOW"
	Fulfillment = "FULFILLMENT"
	Route       = "ROUTE"
	Weather     = "WEATHER"
	Traffic     = "TRAFFIC"
	Risk        = "RISK"
	Partner     = "PARTNER"
	Summary     = "SUMMARY"
)

var Enabled = true

func Log(component string, message string) {
	if !Enabled {
		return
	}
	fmt.Printf("[%s] %s\n", component, message)
}
