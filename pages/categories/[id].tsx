import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { supabase } from '../../utils/supabase'
import { Tool, Category } from '../../types'
import Link from 'next/link'
import LoadingState from '../../components/LoadingState'

export default function CategoryPage() {
  const router = useRouter()
  const { id } = router.query
  const [category, setCategory] = useState<Category | null>(null)
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!id) return

      try {
        const [categoryData, toolsData] = await Promise.all([
          supabase.from('categories').select('*').eq('id', id).single(),
          supabase.from('tools').select('*').eq('category_id', id)
        ])

        if (categoryData.data) setCategory(categoryData.data)
        if (toolsData.data) setTools(toolsData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <Layout><LoadingState /></Layout>

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category not found</h1>
          <Link 
            href="/"
            className="mt-4 inline-block text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            ← Back to home
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${category.name} Tools - AI Tools Directory`}>
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text">
            {category.name} Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our collection of {category.name.toLowerCase()} AI tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-white dark:bg-dark-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-dark-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={tool.logo_url}
                    alt={tool.name}
                    className="w-16 h-16 object-contain rounded-lg bg-gray-50 dark:bg-dark-300 p-2"
                  />
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    tool.pricing === 'free' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{tool.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{tool.description}</p>
                {tool.features && tool.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 text-sm rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={`/tools/${tool.id}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group-hover:translate-x-1 transition-transform"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No tools found in this category yet.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
} 