package partner

import (
	"sort"

	"github.com/Gautam2920/galli-agent/backend/internal/decisionengine/models"
	"github.com/Gautam2920/galli-agent/backend/internal/partner"
)

type Tool struct {
	partnerService *partner.Service
}

func NewTool(
	partnerService *partner.Service,
) *Tool {

	return &Tool{
		partnerService: partnerService,
	}
}

func (t *Tool) Analyse() models.PartnerAnalysis {

	partners := t.partnerService.AvailablePartners()

	sort.Slice(partners, func(i, j int) bool {

		if partners[i].CurrentDeliveries != partners[j].CurrentDeliveries {
			return partners[i].CurrentDeliveries < partners[j].CurrentDeliveries
		}

		return partners[i].Rating > partners[j].Rating
	})

	bestPartner := partners[0]

	return models.PartnerAnalysis{
		RecommendedPartner: bestPartner,
		ConfidenceScore:    95,
		Reason:             "Selected the available partner with the lowest workload and highest rating.",
	}
}
