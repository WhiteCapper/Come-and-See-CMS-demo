import type { Event, EventResponse, EventSingle } from '~/types/event'

export const useEvents = () => {
  const strapiUrl = useRuntimeConfig().public.strapi.url || 'http://localhost:1337'

  const getEvents = async (): Promise<Event[]> => {
    try {
      const { data } = await $fetch<EventResponse>(`${strapiUrl}/api/events`, {
        query: {
          populate: ['donorsInvited', 'donorsAttended', 'assets']
        }
      })
      return data
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  const getEventById = async (id: number | string): Promise<Event | null> => {
    try {
      const { data } = await $fetch<EventSingle>(`${strapiUrl}/api/events/${id}`, {
        query: {
          populate: ['donorsInvited', 'donorsAttended', 'assets']
        }
      })
      return data
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error)
      return null
    }
  }

  return {
    getEvents,
    getEventById
  }
}
