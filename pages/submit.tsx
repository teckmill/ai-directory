import React from 'react'
import Layout from '../components/Layout'
import ToolSubmissionForm from '../components/ToolSubmissionForm'

export default function SubmitPage() {
  return (
    <Layout title="Submit an AI Tool">
      <div className="py-12">
        <ToolSubmissionForm />
      </div>
    </Layout>
  )
} 