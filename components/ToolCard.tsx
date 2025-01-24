import React from 'react'
import { Tool } from '../types'
import Link from 'next/link'

type ToolCardProps = {
  tool: Tool & { avgRating?: number }
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={tool.logo_url}
            alt={tool.name}
            className="w-12 h-12 object-contain rounded-lg bg-gray-50 dark:bg-dark-300"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {tool.name}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              tool.pricing === 'free' ? 'bg-green-100 text-green-800' :
              tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
            </span>
          </div>
        </div>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {tool.description}
        </p>

        <div className="mt-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Features</h4>
          <div className="flex flex-wrap gap-2">
            {tool.features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 text-sm rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {tool.avgRating !== undefined && (
          <div className="mt-4 flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-gray-600 dark:text-gray-400">
              {tool.avgRating.toFixed(1)}
            </span>
          </div>
        )}

        <div className="mt-4 flex space-x-4">
          <a
            href={tool.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
          >
            Visit Website
          </a>
          <Link
            href={`/tools/${tool.id}`}
            className="flex-1 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
} 