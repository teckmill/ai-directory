import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Category, Tool } from '../types'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, toolsData] = await Promise.all([
          supabase.from('categories').select('*').order('name'),
          supabase
            .from('tools')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(12)
        ])

        if (categoriesData.data) setCategories(categoriesData.data)
        if (toolsData.data) {
          const shuffled = [...toolsData.data].sort(() => 0.5 - Math.random())
          setFeaturedTools(shuffled.slice(0, 12))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500/10 via-transparent to-primary-500/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="animate-fade-in text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 text-transparent bg-clip-text mb-6">
              Discover AI Tools That Matter
            </h1>
            <p className="animate-fade-in-delay-1 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our curated collection of AI tools to enhance your workflow and boost productivity
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="animate-fade-in-delay-2 max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  className="w-full px-6 py-4 bg-white dark:bg-dark-200 rounded-xl shadow-lg focus:ring-2 focus:ring-primary-500 transition-shadow text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Tools
              </Link>
              <Link
                href="/submit"
                className="px-8 py-3 bg-white dark:bg-dark-200 text-primary-600 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors shadow-lg hover:shadow-xl"
              >
                Submit a Tool
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">{featuredTools.length}</div>
              <div className="text-gray-600 dark:text-gray-400">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">{categories.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group p-6 bg-white dark:bg-dark-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Tools Section */}
      <div className="bg-gray-50 dark:bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white dark:bg-dark-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={tool.logo_url}
                      alt={tool.name}
                      className="w-12 h-12 object-contain rounded-lg bg-gray-50 dark:bg-dark-300"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        tool.pricing === 'free' ? 'bg-green-100 text-green-800' :
                        tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  <Link
                    href={`/tools/${tool.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
} 