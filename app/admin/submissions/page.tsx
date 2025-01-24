'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Tool } from '../../../types'

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchSubmissions() {
      const { data } = await supabase
        .from('tools')
        .select('*')
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false })
      
      if (data) setSubmissions(data)
      setLoading(false)
    }

    fetchSubmissions()
  }, [supabase])

  const handleApprove = async (id: string) => {
    await supabase
      .from('tools')
      .update({ status: 'approved' })
      .eq('id', id)
    
    setSubmissions(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Pending Submissions</h1>
      <div className="space-y-6">
        {loading ? (
          <p>Loading...</p>
        ) : submissions.length === 0 ? (
          <p>No pending submissions</p>
        ) : (
          submissions.map(tool => (
            <div key={tool.id} className="bg-white dark:bg-dark-200 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{tool.name}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{tool.description}</p>
              <button
                onClick={() => handleApprove(tool.id)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Approve
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 