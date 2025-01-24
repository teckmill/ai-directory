import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { supabase } from '../../utils/supabase'
import { Tool } from '../../types'
import Link from 'next/link'

type ToolWithDetails = Tool & {
  category: { 
    name: string 
  }
  reviews: {
    rating: number
    comment: string
    user: { email: string }
    created_at: string
  }[]
}

export default function ToolDetail() {
  const router = useRouter()
  const { id } = router.query
  const [tool, setTool] = useState<ToolWithDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTool() {
      if (!id) return
      
      try {
        console.log('Fetching tool with ID:', id)
        
        const { data, error } = await supabase
          .from('tools')
          .select(`
            *,
            category:category_id (
              name
            )
          `)
          .eq('id', id)
          .single()

        console.log('Tool data:', data)
        if (error) throw error
        if (data) setTool(data)
      } catch (error) {
        console.error('Error fetching tool:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTool()
  }, [id])

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      </Layout>
    )
  }

  if (!tool) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tool Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The tool you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            ← Back to Home
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${tool.name} - AI Tools Directory`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-dark-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <img
                  src={tool.logo_url}
                  alt={tool.name}
                  className="w-20 h-20 object-contain rounded-xl bg-gray-50 dark:bg-dark-300"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tool.name}
                  </h1>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      tool.pricing === 'free' ? 'bg-green-100 text-green-800' :
                      tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {tool.category?.name}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                Visit Website
              </a>
            </div>

            <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">
              {tool.description}
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Features
                </h2>
                <ul className="space-y-2">
                  {tool.features?.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Additional Information
                </h2>
                <dl className="space-y-4">
                  {tool.pricing_details && (
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">Pricing Details</dt>
                      <dd className="text-gray-900 dark:text-white">{tool.pricing_details}</dd>
                    </div>
                  )}
                  {tool.demo_url && (
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">Demo</dt>
                      <dd>
                        <a
                          href={tool.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          Try Demo →
                        </a>
                      </dd>
                    </div>
                  )}
                  {tool.github_url && (
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">GitHub</dt>
                      <dd>
                        <a
                          href={tool.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          View Source →
                        </a>
                      </dd>
                    </div>
                  )}
                  {tool.documentation_url && (
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">Documentation</dt>
                      <dd>
                        <a
                          href={tool.documentation_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          View Docs →
                        </a>
                      </dd>
                    </div>
                  )}
                  {tool.twitter_handle && (
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">Twitter</dt>
                      <dd>
                        <a
                          href={`https://twitter.com/${tool.twitter_handle.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {tool.twitter_handle} →
                        </a>
                      </dd>
                    </div>
                  )}
                  {tool.submitted_at && (
                    <div>
                      <dt className="text-gray-500 dark:text-gray-400">Submitted</dt>
                      <dd className="text-gray-900 dark:text-white">
                        {new Date(tool.submitted_at).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 