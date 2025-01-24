import React from 'react'
import Layout from '../../components/Layout'

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy - AI Tools Directory">
      <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6">
          <section>
            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Account information when you sign up</li>
              <li>Usage data and preferences</li>
              <li>Information about the tools you review</li>
            </ul>
          </section>
          
          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Send you updates and communications</li>
              <li>Protect against misuse</li>
            </ul>
          </section>

          <section>
            <h2>Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information.</p>
          </section>
        </div>
      </div>
    </Layout>
  )
} 