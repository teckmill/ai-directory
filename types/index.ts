export type Tool = {
  id: string
  name: string
  description: string
  category_id: string
  pricing: 'free' | 'freemium' | 'paid'
  features: string[]
  website_url: string
  logo_url: string
  pricing_details?: string
  demo_url?: string
  github_url?: string
  documentation_url?: string
  twitter_handle?: string
  launch_date?: string
  created_at: string
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