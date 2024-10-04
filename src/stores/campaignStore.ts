import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Campaign {
  campaigns: any
  selectedCustomDays: boolean
}
export const useCampaignStore = defineStore('campaign', () => {
  const campaign = ref<Campaign>({
    campaigns: [],
    selectedCustomDays: false
  })

  const setCampaign = (newCampaign: Partial<Campaign>) => {
    campaign.value = { ...campaign.value, ...newCampaign }
  }
  return {
    campaign,
    setCampaign
  }
})
