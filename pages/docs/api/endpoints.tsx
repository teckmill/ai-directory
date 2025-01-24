import React from 'react'
import Layout from '../../../components/Layout'
import config from '../../../config'

export default function APIEndpointsPage() {
  return (
    <Layout title="API Documentation">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">API Endpoints</h1>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">List Tools</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Get a list of all AI tools in the directory.
            </p>
            <pre className="bg-gray-100 dark:bg-dark-300 p-4 rounded-lg mt-4">
              <code>
                GET {config.baseUrl}/api/tools
              </code>
            </pre>
          </div>
          {/* Add more endpoint documentation as needed */}
        </div>
      </div>
    </Layout>
  )
} 