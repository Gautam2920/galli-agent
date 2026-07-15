package framework

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

func (w *Workflow) Execute(executor *Executor, ctx *AgentContext) error {
	for _, agent := range w.agents {
		_, err := executor.Execute(agent, ctx)
		if err != nil {
			return err
		}
	}
	return nil
}
