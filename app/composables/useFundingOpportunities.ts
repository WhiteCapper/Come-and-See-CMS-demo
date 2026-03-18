import type {
  FundingOpportunity,
  FundingOpportunityResponse,
  FundingOpportunitySingle
} from '~/types/funding-opportunity'

export const useFundingOpportunities = () => {
  const strapiUrl = useRuntimeConfig().public.strapi.url || 'http://localhost:1337'

  const getFundingOpportunities = async (): Promise<FundingOpportunity[]> => {
    try {
      const { data } = await $fetch<FundingOpportunityResponse>(
        `${strapiUrl}/api/funding-opportunities`,
        {
          query: {
            populate: ['relatedStories', 'proposalAssets']
          }
        }
      )
      return data
    } catch (error) {
      console.error('Error fetching funding opportunities:', error)
      return []
    }
  }

  const getFundingOpportunityById = async (
    id: number | string
  ): Promise<FundingOpportunity | null> => {
    try {
      const { data } = await $fetch<FundingOpportunitySingle>(
        `${strapiUrl}/api/funding-opportunities/${id}`,
        {
          query: {
            populate: ['relatedStories', 'proposalAssets']
          }
        }
      )
      return data
    } catch (error) {
      console.error(`Error fetching funding opportunity ${id}:`, error)
      return null
    }
  }

  return {
    getFundingOpportunities,
    getFundingOpportunityById
  }
}
