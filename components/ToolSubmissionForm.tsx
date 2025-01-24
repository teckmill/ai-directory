import React, { useState } from 'react'
import { supabase } from '../utils/supabase'
import { Tool } from '../types'

export default function ToolSubmissionForm() {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [toolData, setToolData] = useState<Partial<Tool> | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First fetch tool info
      const res = await fetch('/api/fetch-tool-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      // Save to database
      const { error } = await supabase.from('tools').insert([{
        ...data,
        website_url: url,
        status: 'pending' // Admin needs to approve
      }])

      if (error) throw error

      alert('Tool submitted successfully! It will be reviewed by our team.')
      setUrl('')
      setToolData(null)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to submit tool. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-dark-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Submit an AI Tool</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tool Website URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 p-2 border rounded dark:bg-dark-300"
              placeholder="https://tool-website.com"
              required
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Tool'}
            </button>
          </div>
        </div>

        {toolData && (
          <div className="space-y-4 p-4 bg-gray-50 dark:bg-dark-300 rounded-lg">
            <h3 className="font-medium">Preview:</h3>
            <p><strong>Name:</strong> {toolData.name}</p>
            <p><strong>Description:</strong> {toolData.description}</p>
            {toolData.pricing_details && (
              <p><strong>Pricing:</strong> {toolData.pricing_details}</p>
            )}
            {toolData.features && toolData.features.length > 0 && (
              <p><strong>Features:</strong> {toolData.features.join(', ')}</p>
            )}
          </div>
        )}
      </form>
    </div>
  )
} 