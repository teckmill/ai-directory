import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Layout from '../components/Layout'

export default function AuthPage() {
  const supabase = useSupabaseClient()

  return (
    <Layout title="Sign In">
      <div className="max-w-md mx-auto py-12">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['github']}
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}
        />
      </div>
    </Layout>
  )
} 