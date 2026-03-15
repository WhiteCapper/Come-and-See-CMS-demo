import type { Task, TaskResponse, TaskSingle } from '~/types/task'

export const useTasks = () => {
  const strapiUrl = useRuntimeConfig().public.strapi.url || 'http://localhost:1337'

  const getTasks = async (): Promise<Task[]> => {
    try {
      const { data } = await $fetch<TaskResponse>(`${strapiUrl}/api/tasks`, {
        query: {
          populate: 'donor'
        }
      })
      return data
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  }

  const getTaskById = async (id: number | string): Promise<Task | null> => {
    try {
      const { data } = await $fetch<TaskSingle>(`${strapiUrl}/api/tasks/${id}`, {
        query: {
          populate: 'donor'
        }
      })
      return data
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error)
      return null
    }
  }

  return {
    getTasks,
    getTaskById
  }
}
