package decisionengine

import (
	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/framework"
	"github.com/Gautam2920/galli-agent/backend/internal/logger"
)

type Engine struct {
	workflow *framework.Workflow
	executor *framework.Executor
}

func New() *Engine {
	return &Engine{
		workflow: framework.NewWorkflow(),
		executor: framework.NewExecutor(),
	}
}

func (e *Engine) Register(agent framework.Agent) {
	e.workflow.AddAgent(agent)
}

func (e *Engine) Run(
	ctx *framework.AgentContext,
) error {

	logger.Log(logger.Engine, "Starting Decision Engine")

	err := e.workflow.Execute(
		e.executor,
		ctx,
	)

	if err != nil {
		logger.Log(logger.Engine, "Decision Engine failed")
		return err
	}

	logger.Log(logger.Engine, "Decision Engine completed successfully")

	return nil
}
