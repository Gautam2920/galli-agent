package framework

type Agent interface {
	Name() string
	Execute(ctx *AgentContext) (*AgentResult, error)
}
