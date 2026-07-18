package framework

type WorkflowNode struct {
	Agent        Agent
	Dependencies []string
}
