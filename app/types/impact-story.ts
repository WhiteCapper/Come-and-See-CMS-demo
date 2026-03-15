// helper types for variably populated relations
export type SeasonRelation =
  | number
  | {
      id: number
      documentId?: string
      name: string
    }
  | {
      data: {
        id: number
        attributes: {
          name: string
          [key: string]: any
        }
      } | null
    }

export type MediaRelation =
  | {
      id: number
      name?: string
      url?: string
      mime?: string
      [key: string]: any
    }
  | {
      data: {
        id: number
        attributes: {
          url: string
          name?: string
          mime?: string
          [key: string]: any
        }
      } | null
    }

export interface ImpactStory {
  id: number
  documentId?: string
  title: string
  summary: string
  fullStory: string
  season?: SeasonRelation
  media?: MediaRelation
  tags?: any // JSON field for tags (could be array or object)
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface ImpactStoryResponse {
  data: ImpactStory[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ImpactStorySingle {
  data: ImpactStory
}
