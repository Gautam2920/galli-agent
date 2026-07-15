package framework

import (
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type Workflow struct {
	agents []Agent
}

func NewWorkflow() *Workflow {
	return &Workflow{}
}

func (w *Workflow) AddAgent(agent Agent) {
	w.agents = append(w.agents, agent)
}

func (w *Workflow) Agents() []Agent {
	return w.agents
}

func (w *Workflow) Execute(
	executor *Executor,
	ctx *AgentContext,
) error {

	logger.Log(logger.Workflow, "Starting workflow execution")

	for _, agent := range w.agents {

		logger.Log(
			logger.Workflow,
			"Executing "+agent.Name(),
		)

		_, err := executor.Execute(agent, ctx)

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

	logger.Log(logger.Workflow, "Workflow execution completed")

	return nil
}
