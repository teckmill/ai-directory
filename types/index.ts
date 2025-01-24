export interface Tool {
  id: string
  name: string
  description: string
  website_url: string
  logo_url?: string
  category_id: string
  pricing: 'free' | 'freemium' | 'paid'
  pricing_details?: string
  features?: string[]
  github_url?: string
  twitter_handle?: string
  documentation_url?: string
  demo_url?: string
  status?: 'pending' | 'approved' | 'rejected'
  submitted_at?: string
  enriched?: boolean
}

export type Category = {
  id: string
  name: string
}

export type Review = {
  id: string
  tool_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
}

export interface ToolSubmission extends Omit<Tool, 'id'> {
  id: string
  user_id: string
  created_at: string
  user?: {
    email: string
  }
} 