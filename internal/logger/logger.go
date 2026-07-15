package logger

import "fmt"

const (
	Engine   = "ENGINE"
	Workflow = "WORKFLOW"
	Route    = "ROUTE"
	Risk     = "RISK"
	Summary  = "SUMMARY"
)

var Enabled = true

func Log(component string, message string) {

	if !Enabled {
		return
	}

	fmt.Printf("[%s] %s\n", component, message)
}
