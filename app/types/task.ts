export type DonorRelation =
  | {
      id: number
      documentId?: string
      name?: string
      [key: string]: any
    }
  | {
      data: {
        id: number
        attributes?: {
          name?: string
          [key: string]: any
        }
        name?: string
        [key: string]: any
      } | null
    }
  | null

export interface Task {
  id: number
  documentId?: string
  name: string
  donor?: DonorRelation
  assignedTo?: string
  status?: string
  dueDate?: string
  taskType?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface TaskResponse {
  data: Task[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface TaskSingle {
  data: Task
}
