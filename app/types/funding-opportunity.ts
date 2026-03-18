export type ManyRelation =
  | Array<{
      id: number
      documentId?: string
      title?: string
      name?: string
      [key: string]: any
    }>
  | {
      data: Array<{
        id: number
        attributes?: {
          title?: string
          name?: string
          [key: string]: any
        }
        title?: string
        name?: string
        [key: string]: any
      }>
    }
  | null

export interface FundingOpportunity {
  id: number
  documentId?: string
  projectName: string
  category?: string
  fundingLevel?: number
  description?: string
  impactMetrics?: string
  relatedStories?: ManyRelation
  proposalAssets?: any
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface FundingOpportunityResponse {
  data: FundingOpportunity[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface FundingOpportunitySingle {
  data: FundingOpportunity
}
