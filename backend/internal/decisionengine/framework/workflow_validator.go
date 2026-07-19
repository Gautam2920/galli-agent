package framework

import "fmt"

func (w *Workflow) Validate() error {
	for _, node := range w.nodes {
		for _, dependency := range node.Dependencies {
			if _, exists := w.nodes[dependency]; !exists {
				return fmt.Errorf(
					"workflow validation failed: %q depends on unknown agent %q",
					node.Agent.Name(),
					dependency,
				)
			}
		}
	}
	return nil
}
