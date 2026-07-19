package summary

import (
	"fmt"
	"strings"
)

func Format(summary OperationalSummary) string {
	var builder strings.Builder

	fmt.Fprintf(&builder, "Decision: %s\n", summary.Decision)
	fmt.Fprintf(&builder, "Confidence: %d%%\n\n", summary.Confidence)

	if summary.OverallAssessment != "" {
		fmt.Fprintf(&builder, "Overall Assessment:\n%s\n\n", summary.OverallAssessment)
	}

	if summary.RouteSummary != "" {
		fmt.Fprintf(&builder, "Route:\n%s\n\n", summary.RouteSummary)
	}

	if summary.WeatherSummary != "" {
		fmt.Fprintf(&builder, "Weather:\n%s\n\n", summary.WeatherSummary)
	}

	if summary.TrafficSummary != "" {
		fmt.Fprintf(&builder, "Traffic:\n%s\n\n", summary.TrafficSummary)
	}

	if summary.RiskSummary != "" {
		fmt.Fprintf(&builder, "Risk:\n%s\n\n", summary.RiskSummary)
	}

	if summary.PartnerSummary != "" {
		fmt.Fprintf(&builder, "Partner:\n%s\n\n", summary.PartnerSummary)
	}

	if len(summary.Highlights) > 0 {
		builder.WriteString("Highlights:\n")

		for _, highlight := range summary.Highlights {
			fmt.Fprintf(&builder, "- %s\n", highlight)
		}
	}

	return builder.String()
}
