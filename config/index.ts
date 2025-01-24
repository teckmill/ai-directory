export type Config = {
  baseUrl: string
  apiUrl: string
  supabase: {
    url: string
    anonKey: string
    serviceRole: string | undefined
  }
  seo: {
    title: string
    description: string
    ogImage: string
    twitterHandle: string
  }
  features: {
    darkMode: boolean
    authentication: boolean
    apiAccess: boolean
  }
}

const config: Config = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  seo: {
    title: 'AI Tools Directory',
    description: 'Discover and explore AI tools and services',
    ogImage: '/og-image.png',
    twitterHandle: '@aitools'
  },
  features: {
    darkMode: true,
    authentication: true,
    apiAccess: true
  }
}

export default config 