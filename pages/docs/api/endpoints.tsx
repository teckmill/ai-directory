import React from 'react'
import Layout from '../../../components/Layout'
import { config } from '../../../utils/config'

export default function ApiEndpoints() {
  return (
    <Layout title="API Endpoints - AI Tools Directory">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text mb-8">
          API Endpoints
        </h1>

        <div className="space-y-8">
          <section className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Tools</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400">GET /tools</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">List all AI tools</p>
                <pre className="bg-gray-100 dark:bg-dark-300 p-4 rounded-lg mt-4">
                  <code>
                    GET {config.apiUrl}/tools
                  </code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400">GET /tools/{'{id}'}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Get a specific tool by ID</p>
                <pre className="bg-gray-100 dark:bg-dark-300 p-4 rounded-lg mt-4">
                  <code>
                    GET {config.apiUrl}/tools/123
                  </code>
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400">GET /categories</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">List all categories</p>
                <pre className="bg-gray-100 dark:bg-dark-300 p-4 rounded-lg mt-4">
                  <code>
                    GET {config.apiUrl}/categories
                  </code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
} 