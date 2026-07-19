package framework

import (
	"fmt"

	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type Workflow struct {
	nodes map[string]*WorkflowNode

	registrationOrder []string
}

func NewWorkflow() *Workflow {
	return &Workflow{
		nodes: make(map[string]*WorkflowNode),
	}
}

func (w *Workflow) Register(
	agent Agent,
	dependencies ...Dependency,
) error {

	if _, exists := w.nodes[agent.Name()]; exists {
		return fmt.Errorf(
			"workflow agent %q already registered",
			agent.Name(),
		)
	}

	var deps []string

	if len(dependencies) > 0 {
		deps = dependencies[0].Agents
	}

	w.nodes[agent.Name()] = &WorkflowNode{
		Agent:        agent,
		Dependencies: deps,
	}

	w.registrationOrder = append(
		w.registrationOrder,
		agent.Name(),
	)

	return nil
}

func (w *Workflow) Execute(
	executor *Executor,
	ctx *AgentContext,
) error {

	if err := w.Validate(); err != nil {
		return err
	}

	plan, err := w.Plan()

	if err != nil {
		return err
	}

	logger.Log(
		logger.Workflow,
		"Starting workflow execution",
	)

	for _, agent := range plan.Agents {

		logger.Log(
			logger.Workflow,
			"Executing "+agent.Name(),
		)

		_, err := executor.Execute(
			agent,
			ctx,
		)

		if err != nil {

			logger.Log(
				logger.Workflow,
				agent.Name()+" failed",
			)

			return err
		}

		logger.Log(
			logger.Workflow,
			agent.Name()+" completed",
		)
	}

	logger.Log(
		logger.Workflow,
		"Workflow execution completed",
	)

	return nil
}
