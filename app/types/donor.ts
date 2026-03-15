export type EventRelation =
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

export interface Donor {
  id: number
  documentId?: string
  name: string
  events?: EventRelation
  assignedStaff?: string
  virtuousId?: string
  notes?: string
  contentPreferences?: any
  proposals?: any
  tags?: any
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface DonorResponse {
  data: Donor[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface DonorSingle {
  data: Donor
}
