package framework

import "fmt"

func (w *Workflow) Plan() (*ExecutionPlan, error) {

	inDegree := make(map[string]int)
	dependents := make(map[string][]string)

	for name := range w.nodes {
		inDegree[name] = 0
	}

	for name, node := range w.nodes {

		for _, dependency := range node.Dependencies {

			inDegree[name]++

			dependents[dependency] = append(
				dependents[dependency],
				name,
			)
		}
	}

	queue := make([]string, 0)

	for _, name := range w.registrationOrder {

		if inDegree[name] == 0 {
			queue = append(queue, name)
		}
	}

	plan := &ExecutionPlan{
		Agents: make([]Agent, 0, len(w.nodes)),
	}

	visited := 0

	for len(queue) > 0 {

		current := queue[0]
		queue = queue[1:]

		plan.Agents = append(
			plan.Agents,
			w.nodes[current].Agent,
		)

		visited++

		for _, dependent := range dependents[current] {

			inDegree[dependent]--

			if inDegree[dependent] == 0 {
				queue = append(
					queue,
					dependent,
				)
			}
		}
	}

	if visited != len(w.nodes) {

		return nil, fmt.Errorf(
			"workflow planning failed: cyclic dependency detected",
		)
	}

	return plan, nil
}
