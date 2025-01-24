import React, { useEffect, useState, useCallback } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Tool, Category } from '../types'
import AdvancedSearch from '../components/AdvancedSearch'
import ToolCard from '../components/ToolCard'
import ToolComparison from '../components/ToolComparison'

type ToolWithReviews = Tool & {
  reviews: { rating: number }[]
}

type SearchParams = {
  query: string
  categories: string[]
  pricing: string[]
  features: string[]
  minRating: number
}

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<Tool[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTools, setSelectedTools] = useState<Tool[]>([])
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    categories: [],
    pricing: [],
    features: [],
    minRating: 0
  })

  const handleSearch = useCallback(async (filters: SearchParams) => {
    setLoading(true)
    try {
      let query = supabase
        .from('tools')
        .select(`
          *,
          categories(*),
          reviews(rating)
        `)
        .textSearch('name,description', filters.query)

      if (filters.categories.length > 0) {
        query = query.in('category_id', filters.categories)
      }

      if (filters.pricing.length > 0) {
        query = query.in('pricing', filters.pricing)
      }

      const { data } = await query

      if (data) {
        const toolsWithAvgRating = data.map(tool => ({
          ...tool,
          avgRating: tool.reviews.length > 0 
            ? tool.reviews.reduce((acc: number, rev: { rating: number }) => acc + rev.rating, 0) / tool.reviews.length
            : 0
        }))

        setSearchResults(toolsWithAvgRating.filter(tool => tool.avgRating >= filters.minRating))
      }
    } catch (error) {
      console.error('Error searching tools:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    handleSearch(searchParams)
  }, [searchParams, handleSearch])

  const toggleToolSelection = useCallback((tool: Tool) => {
    setSelectedTools(prev => {
      if (prev.find(t => t.id === tool.id)) {
        return prev.filter(t => t.id !== tool.id)
      }
      if (prev.length < 3) {
        return [...prev, tool]
      }
      return prev
    })
  }, [])

  return (
    <Layout title="Search AI Tools">
      <div className="space-y-8">
        <AdvancedSearch onSearch={handleSearch} />
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
          </div>
        ) : (
          <>
            {selectedTools.length > 0 && (
              <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Compare Tools</h2>
                <ToolComparison tools={selectedTools} />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(tool => (
                <div key={tool.id} className="relative">
                  <button
                    onClick={() => toggleToolSelection(tool)}
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white dark:bg-dark-300 shadow-md hover:shadow-lg transition-shadow"
                  >
                    {selectedTools.find(t => t.id === tool.id) ? (
                      <svg className="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </button>
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
} 