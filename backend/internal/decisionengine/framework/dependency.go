package framework

type Dependency struct {
	Agents []string
}

func DependsOn(
	agents ...string,
) Dependency {

	return Dependency{
		Agents: agents,
	}
}
