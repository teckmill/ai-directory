import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { supabase } from '../../utils/supabase'
import { Tool, Category } from '../../types'

type FilterState = {
  search: string
  category: string
  pricing: 'all' | 'free' | 'freemium' | 'paid'
  sortBy: 'name' | 'newest'
}

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    pricing: 'all',
    sortBy: 'newest'
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [toolsData, categoriesData] = await Promise.all([
          supabase.from('tools').select('*, categories(name)'),
          supabase.from('categories').select('*')
        ])
        
        if (toolsData.data) setTools(toolsData.data)
        if (categoriesData.data) setCategories(categoriesData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         tool.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchesCategory = !filters.category || tool.category_id === filters.category
    const matchesPricing = filters.pricing === 'all' || tool.pricing === filters.pricing

    return matchesSearch && matchesCategory && matchesPricing
  }).sort((a, b) => {
    if (filters.sortBy === 'name') {
      return a.name.localeCompare(b.name)
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  if (loading) {
    return (
      <Layout title="AI Tools - Browse All">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="AI Tools - Browse All">
      <div className="space-y-8">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-bold dark:text-white">All AI Tools</h1>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search tools..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            value={filters.pricing}
            onChange={(e) => setFilters(prev => ({ ...prev, pricing: e.target.value as FilterState['pricing'] }))}
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Pricing</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
            className="px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="text-gray-600 dark:text-gray-300">
          Found {filteredTools.length} tools
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <img
                  src={tool.logo_url}
                  alt={tool.name}
                  className="w-16 h-16 object-contain"
                />
                <span className={`px-3 py-1 rounded-full text-sm ${
                  tool.pricing === 'free' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">{tool.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{tool.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <Link
                href={`/tools/${tool.id}`}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No tools found matching your criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
} 