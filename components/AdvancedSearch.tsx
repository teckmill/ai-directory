import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Category } from '../types'

type SearchParams = {
  query: string
  categories: string[]
  pricing: string[]
  features: string[]
  minRating: number
}

type AdvancedSearchProps = {
  onSearch: (filters: SearchParams) => void
}

export default function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState<SearchParams>({
    query: '',
    categories: [],
    pricing: [],
    features: [],
    minRating: 0
  })

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      if (data) setCategories(data)
    }
    fetchCategories()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(filters)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search AI tools..."
          value={filters.query}
          onChange={e => setFilters({ ...filters, query: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Categories
          </label>
          <select
            multiple
            value={filters.categories}
            onChange={e => setFilters({
              ...filters,
              categories: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pricing
          </label>
          <select
            multiple
            value={filters.pricing}
            onChange={e => setFilters({
              ...filters,
              pricing: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
          >
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Rating
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={e => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filters.minRating} stars or higher
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Search
      </button>
    </form>
  )
} 