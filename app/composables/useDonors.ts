import type { Donor, DonorResponse, DonorSingle } from '~/types/donor'

export const useDonors = () => {
  const strapiUrl = useRuntimeConfig().public.strapi.url || 'http://localhost:1337'

  const getDonors = async (): Promise<Donor[]> => {
    try {
      const { data } = await $fetch<DonorResponse>(`${strapiUrl}/api/donors`, {
        query: {
          populate: 'events'
        }
      })
      return data
    } catch (error) {
      console.error('Error fetching donors:', error)
      return []
    }
  }

  const getDonorById = async (id: number | string): Promise<Donor | null> => {
    try {
      const { data } = await $fetch<DonorSingle>(`${strapiUrl}/api/donors/${id}`, {
        query: {
          populate: 'events'
        }
      })
      return data
    } catch (error) {
      console.error(`Error fetching donor ${id}:`, error)
      return null
    }
  }

  return {
    getDonors,
    getDonorById
  }
}
