package models

import fulfillment "github.com/Gautam2920/galli-agent/backend/internal/fulfillment"

type FulfillmentAnalysis struct {
	SelectedCandidate fulfillment.Candidate
	Candidates        []fulfillment.Candidate
	ConfidenceScore   int
	Reason            string
}
