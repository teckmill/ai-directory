import React from 'react'
import { Category } from '../types'

type SubmissionFiltersProps = {
  categories: Category[]
  filters: {
    status: string
    category: string
    pricing: string
    sortBy: string
  }
  onFilterChange: (filters: any) => void
}

export default function SubmissionFilters({ categories, filters, onFilterChange }: SubmissionFiltersProps) {
  return (
    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={e => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="recent">Recent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={e => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
          >
            <option value="">All Categories</option>
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
            value={filters.pricing}
            onChange={e => onFilterChange({ ...filters, pricing: e.target.value })}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
          >
            <option value="">All</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={e => onFilterChange({ ...filters, sortBy: e.target.value })}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    </div>
  )
} 