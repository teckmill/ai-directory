import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

export default function Documentation() {
  return (
    <Layout title="Documentation - AI Tools Directory">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text mb-8">
          Documentation
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/introduction" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link href="/docs/quickstart" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Quick Start Guide
                  </Link>
                </li>
              </ul>
            </section>

            <section className="bg-white dark:bg-dark-200 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">API Reference</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs/api/authentication" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Authentication
                  </Link>
                </li>
                <li>
                  <Link href="/docs/api/endpoints" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Endpoints
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
} 