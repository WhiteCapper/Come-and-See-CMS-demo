import type { ImpactStory, ImpactStoryResponse, ImpactStorySingle } from '~/types/impact-story'

export const useImpactStories = () => {
  const strapiUrl = useRuntimeConfig().public.strapi.url || 'http://localhost:1337'

  const getImpactStories = async (): Promise<ImpactStory[]> => {
    try {
      const { data } = await $fetch<ImpactStoryResponse>(`${strapiUrl}/api/impact-stories`, {
        query: {
          populate: 'media'
        }
      })
      return data
    } catch (error) {
      console.error('Error fetching impact stories:', error)
      return []
    }
  }

  const getImpactStoryById = async (id: number | string): Promise<ImpactStory | null> => {
    try {
      const { data } = await $fetch<ImpactStorySingle>(`${strapiUrl}/api/impact-stories/${id}`, {
        query: {
          populate: 'media'
        }
      })
      return data
    } catch (error) {
      console.error(`Error fetching impact story ${id}:`, error)
      return null
    }
  }

  const createImpactStory = async (story: Partial<ImpactStory>, mediaFile?: File): Promise<ImpactStory | null> => {
    try {
      const formData = new FormData()

      // ensure tags is serializable JSON
      const tagsPayload = story.tags !== undefined ? story.tags : []

      const data: any = {
        title: story.title,
        summary: story.summary,
        fullStory: story.fullStory,
        tags: tagsPayload,
        ...(story.season?.id && { season: story.season.id })
      }

      console.debug('Posting impact story data', data)
      formData.append('data', JSON.stringify(data))

      if (mediaFile) {
        formData.append('files.media', mediaFile)
      }

      let response
      if (mediaFile) {
        response = await $fetch<ImpactStorySingle>(`${strapiUrl}/api/impact-stories`, {
          method: 'POST',
          body: formData
        })
      } else {
        // send JSON directly when no file attached
        response = await $fetch<ImpactStorySingle>(`${strapiUrl}/api/impact-stories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
        })
      }

      console.debug('Strapi creation response', response)
      return response.data
    } catch (error: any) {
      // attempt to log Strapi error details if available
      if (error?.data) {
        console.error('Strapi response error', error.data)
      }
      console.error('Error creating impact story:', error)
      return null
    }
  }

  return {
    getImpactStories,
    getImpactStoryById,
    createImpactStory
  }
}
