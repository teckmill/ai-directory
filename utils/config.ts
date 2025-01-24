export const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
    : 'http://localhost:3000',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  seo: {
    title: 'AI Tools Directory',
    description: 'Discover and explore the latest AI tools and technologies',
    ogImage: '/og-image.jpg',
    twitterHandle: '@aitoolsdirectory'
  },
  features: {
    darkMode: true,
    authentication: true,
    apiAccess: true
  }
}

export type Config = typeof config 