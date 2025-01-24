import React from 'react'
import { Tool } from '../types'

type ToolComparisonProps = {
  tools: Tool[]
}

export default function ToolComparison({ tools }: ToolComparisonProps) {
  const allFeatures = Array.from(new Set(tools.flatMap(tool => tool.features))).sort()

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-4 border-b dark:border-gray-700"></th>
            {tools.map(tool => (
              <th key={tool.id} className="text-left p-4 border-b dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <img
                    src={tool.logo_url}
                    alt={tool.name}
                    className="w-8 h-8 object-contain rounded"
                  />
                  <span>{tool.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Basic Info */}
          <tr>
            <td className="p-4 border-b dark:border-gray-700 font-medium">Pricing</td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4 border-b dark:border-gray-700">
                <div className="space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    tool.pricing === 'free' ? 'bg-green-100 text-green-800' :
                    tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                  </span>
                  {tool.pricing_details && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {tool.pricing_details}
                    </p>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* Integration Links */}
          <tr>
            <td className="p-4 border-b dark:border-gray-700 font-medium">Integrations</td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4 border-b dark:border-gray-700">
                <div className="space-y-2">
                  {tool.github_url && (
                    <a
                      href={tool.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700 block"
                    >
                      GitHub
                    </a>
                  )}
                  {tool.documentation_url && (
                    <a
                      href={tool.documentation_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 hover:text-primary-700 block"
                    >
                      API Docs
                    </a>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* Demo Links */}
          <tr>
            <td className="p-4 border-b dark:border-gray-700 font-medium">Demo</td>
            {tools.map(tool => (
              <td key={tool.id} className="p-4 border-b dark:border-gray-700">
                {tool.demo_url ? (
                  <a
                    href={tool.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    Try Demo
                  </a>
                ) : (
                  <span className="text-xs text-gray-400">Not available</span>
                )}
              </td>
            ))}
          </tr>

          {/* Features Matrix */}
          <tr>
            <td colSpan={tools.length + 1} className="p-4 border-b dark:border-gray-700 font-medium bg-gray-50 dark:bg-dark-300">
              Features
            </td>
          </tr>
          {allFeatures.map(feature => (
            <tr key={feature}>
              <td className="p-4 border-b dark:border-gray-700">{feature}</td>
              {tools.map(tool => (
                <td key={tool.id} className="p-4 border-b dark:border-gray-700">
                  {tool.features.includes(feature) ? (
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 