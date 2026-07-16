package models

import "github.com/Gautam2920/galli-agent/backend/internal/partner"

type PartnerAnalysis struct {
	RecommendedPartner partner.Partner
	ConfidenceScore    int
	Reason             string
}
