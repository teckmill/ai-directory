import React from 'react'
import Layout from '../../../components/Layout'

export default function ApiAuthentication() {
  return (
    <Layout title="API Authentication - AI Tools Directory">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text mb-8">
          API Authentication
        </h1>

        <div className="prose prose-lg dark:prose-invert">
          <section>
            <h2>Getting an API Key</h2>
            <p>
              To use the AI Tools Directory API, you'll need an API key. You can get one by:
            </p>
            <ol>
              <li>Signing in to your account</li>
              <li>Going to Account Settings</li>
              <li>Navigating to the API section</li>
              <li>Clicking "Generate New API Key"</li>
            </ol>
          </section>

          <section>
            <h2>Using Your API Key</h2>
            <p>
              Include your API key in the Authorization header of your requests:
            </p>
            <pre className="bg-gray-100 dark:bg-dark-300 p-4 rounded-lg">
              <code>
                Authorization: Bearer YOUR_API_KEY
              </code>
            </pre>
          </section>

          <section>
            <h2>Security Best Practices</h2>
            <ul>
              <li>Keep your API key secure and never share it</li>
              <li>Rotate your API key periodically</li>
              <li>Use environment variables to store your API key</li>
              <li>Don't expose your API key in client-side code</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  )
} 