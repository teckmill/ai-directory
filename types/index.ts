export type Tool = {
  id: string
  name: string
  description: string
  logo_url: string
  website_url: string
  pricing: 'free' | 'freemium' | 'paid'
  pricing_details?: string
  features?: string[]
  github_url?: string
  twitter_handle?: string
  documentation_url?: string
  demo_url?: string
  category_id?: string
  submitted_at: string
  status?: 'pending' | 'approved' | 'rejected'
}

export type ToolWithDetails = Tool & {
  category?: Category
  reviews?: Review[]
  avgRating?: number
}

export type Category = {
  id: string
  name: string
  slug: string
  description: string
  icon: string
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