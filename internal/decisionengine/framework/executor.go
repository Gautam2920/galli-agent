package framework

type Executor struct{}

func NewExecutor() *Executor {
	return &Executor{}
}

func (e *Executor) Execute(agent Agent, ctx *AgentContext) (*AgentResult, error) {
	return agent.Execute(ctx)
}
