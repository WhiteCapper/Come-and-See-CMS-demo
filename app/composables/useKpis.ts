import type { KPI, KPIResponse, KPISingle } from '~/types/kpi'

export const useKpis = () => {
  const strapiUrl = useRuntimeConfig().public.strapi.url || 'http://localhost:1337'

  const getKpis = async (): Promise<KPI[]> => {
    try {
      const { data } = await $fetch<KPIResponse>(`${strapiUrl}/api/kpis`, {
        query: {
          populate: ['relatedDonor', 'relatedProposal', 'relatedEvent']
        }
      })
      return data
    } catch (error) {
      console.error('Error fetching KPIs:', error)
      return []
    }
  }

  const getKpiById = async (id: number | string): Promise<KPI | null> => {
    try {
      const { data } = await $fetch<KPISingle>(`${strapiUrl}/api/kpis/${id}`, {
        query: {
          populate: ['relatedDonor', 'relatedProposal', 'relatedEvent']
        }
      })
      return data
    } catch (error) {
      console.error(`Error fetching KPI ${id}:`, error)
      return null
    }
  }

  return {
    getKpis,
    getKpiById
  }
}
