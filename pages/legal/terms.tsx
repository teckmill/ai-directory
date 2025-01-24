import React from 'react'
import Layout from '../../components/Layout'

export default function Terms() {
  return (
    <Layout title="Terms of Service - AI Tools Directory">
      <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6">
          <section>
            <h2>1. Terms</h2>
            <p>By accessing our website, you agree to be bound by these terms of service and comply with all applicable laws and regulations.</p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily access the materials on our website for personal, non-commercial use only.</p>
          </section>

          <section>
            <h2>3. User Content</h2>
            <p>Users may submit reviews and comments. You retain ownership of your content but grant us a license to use it on our platform.</p>
          </section>
        </div>
      </div>
    </Layout>
  )
} 