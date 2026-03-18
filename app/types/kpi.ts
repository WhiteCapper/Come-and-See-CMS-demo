export type SingleRelation =
  | {
      id: number
      documentId?: string
      name?: string
      title?: string
      [key: string]: any
    }
  | {
      data: {
        id: number
        attributes?: {
          name?: string
          title?: string
          [key: string]: any
        }
        name?: string
        title?: string
        [key: string]: any
      } | null
    }
  | null

export interface KPI {
  id: number
  documentId?: string
  name: string
  category?: string
  value?: number
  targetValue?: number
  period?: string
  startDate?: string
  endDate?: string
  relatedDonor?: SingleRelation
  relatedProposal?: SingleRelation
  relatedEvent?: SingleRelation
  notes?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface KPIResponse {
  data: KPI[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface KPISingle {
  data: KPI
}
