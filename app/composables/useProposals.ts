import type { Proposal, ProposalResponse, ProposalSingle } from '~/types/proposal'

export const useProposals = () => {
  const strapiUrl = useRuntimeConfig().public.strapi.url || 'http://localhost:1337'

  const getProposals = async (): Promise<Proposal[]> => {
    try {
      const { data } = await $fetch<ProposalResponse>(`${strapiUrl}/api/proposals`, {
        query: {
          populate: ['donor', 'fundingOpportunity', 'followUpTasks', 'attachments']
        }
      })
      return data
    } catch (error) {
      console.error('Error fetching proposals:', error)
      return []
    }
  }

  const getProposalById = async (id: number | string): Promise<Proposal | null> => {
    try {
      const { data } = await $fetch<ProposalSingle>(`${strapiUrl}/api/proposals/${id}`, {
        query: {
          populate: ['donor', 'fundingOpportunity', 'followUpTasks', 'attachments']
        }
      })
      return data
    } catch (error) {
      console.error(`Error fetching proposal ${id}:`, error)
      return null
    }
  }

  return {
    getProposals,
    getProposalById
  }
}
