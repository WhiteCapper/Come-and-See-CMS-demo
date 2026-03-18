export type DonorRelationMultiple =
  | {
      id: number
      documentId?: string
      name?: string
      [key: string]: any
    }
  | {
      data: Array<{
        id: number
        attributes?: {
          name?: string
          [key: string]: any
        }
        name?: string
        [key: string]: any
      }>
    }
  | null

export interface Event {
  id: number
  documentId?: string
  name: string
  type?: string
  location?: string
  date?: string
  description?: string
  donorsInvited?: DonorRelationMultiple
  donorsAttended?: DonorRelationMultiple
  assets?: any
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface EventResponse {
  data: Event[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface EventSingle {
  data: Event
}
