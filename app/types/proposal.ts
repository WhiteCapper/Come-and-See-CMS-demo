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

export type ManyRelation =
  | Array<{
      id: number
      documentId?: string
      name?: string
      title?: string
      [key: string]: any
    }>
  | {
      data: Array<{
        id: number
        attributes?: {
          name?: string
          title?: string
          [key: string]: any
        }
        name?: string
        title?: string
        [key: string]: any
      }>
    }
  | null

export interface Proposal {
  id: number
  documentId?: string
  title: string
  donor?: SingleRelation
  fundingOpportunity?: SingleRelation
  askAmount?: number
  narrative?: string
  attachments?: any
  status?: string
  dateSent?: string
  followUpTasks?: ManyRelation
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface ProposalResponse {
  data: Proposal[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface ProposalSingle {
  data: Proposal
}
