import React from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { config } from '../../../utils/config'

export default function ApiDocs() {
  return (
    <Layout title="API Documentation - AI Tools Directory">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text mb-8">
          API Documentation
        </h1>

        <div className="space-y-8">
          <section className="prose prose-lg dark:prose-invert">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Our REST API enables you to programmatically access AI tools data, reviews, and more.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Authentication</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learn how to authenticate your API requests using API keys.
              </p>
              <Link 
                href="/docs/api/authentication" 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                View Authentication Docs →
              </Link>
            </div>

            <div className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Endpoints</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Explore available API endpoints and their usage.
              </p>
              <Link 
                href="/docs/api/endpoints" 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                View Endpoints Docs →
              </Link>
            </div>
          </div>

          <section className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Start</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>To get started with our API, you'll need:</p>
              <ul>
                <li>An API key (get one from your account settings)</li>
                <li>Basic understanding of REST APIs</li>
                <li>A tool that can make HTTP requests (like curl or Postman)</li>
              </ul>

              <h3>Base URL</h3>
              <pre className="bg-gray-100 dark:bg-dark-300 p-4 rounded-lg">
                <code>{config.baseUrl}</code>
              </pre>

              <h3>Example Request</h3>
              <pre className="bg-gray-100 dark:bg-dark-300 p-4 rounded-lg overflow-x-auto">
                <code>
                  curl -X GET "{config.baseUrl}/api/tools" \{'\n'}
                  {'  '}-H "Authorization: Bearer YOUR_API_KEY"
                </code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
} 