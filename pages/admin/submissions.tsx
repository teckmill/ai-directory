import React, { useEffect, useState, useCallback } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../../utils/supabase'
import Layout from '../../components/Layout'
import AdminSubmissionCard from '../../components/AdminSubmissionCard'
import { Tool, Category } from '../../types'
import SubmissionStats from '../../components/SubmissionStats'
import SubmissionFilters from '../../components/SubmissionFilters'

type ToolSubmission = Tool & {
  user: {
    email: string
  }
}

export default function AdminSubmissionsPage() {
  const user = useUser()
  const [submissions, setSubmissions] = useState<ToolSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    pricing: '',
    sortBy: 'newest'
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [adminData, categoriesData] = await Promise.all([
          supabase
            .from('admin_users')
            .select('user_id')
            .eq('user_id', user?.id)
            .single(),
          supabase
            .from('categories')
            .select('*')
            .order('name')
        ])

        if (!adminData.data) {
          setMessage('Unauthorized access')
          return
        }

        if (categoriesData.data) {
          setCategories(categoriesData.data)
        }

        await fetchSubmissions()
      } catch (error) {
        console.error('Error fetching data:', error)
        setMessage('Error loading data')
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  const fetchSubmissions = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('tool_submissions')
        .select(`
          *,
          user:user_id (
            email
          )
        `)

      if (filters.category) {
        query = query.eq('category_id', filters.category)
      }

      if (filters.pricing) {
        query = query.eq('pricing', filters.pricing)
      }

      if (filters.status === 'recent') {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        query = query.gte('created_at', thirtyDaysAgo.toISOString())
      }

      switch (filters.sortBy) {
        case 'oldest':
          query = query.order('created_at', { ascending: true })
          break
        case 'name':
          query = query.order('name', { ascending: true })
          break
        default:
          query = query.order('created_at', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error
      if (data) setSubmissions(data as ToolSubmission[])
    } catch (error) {
      console.error('Error fetching submissions:', error)
      setMessage('Error loading submissions')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    if (user) {
      fetchSubmissions()
    }
  }, [filters, user, fetchSubmissions])

  const handleApprove = async (submission: ToolSubmission) => {
    try {
      // Insert into tools table
      const { error: insertError } = await supabase
        .from('tools')
        .insert([{
          ...submission,
          twitter_handle: submission.twitter_handle
        }])

      if (insertError) throw insertError

      // Delete from submissions
      const { error: deleteError } = await supabase
        .from('tool_submissions')
        .delete()
        .eq('id', submission.id)

      if (deleteError) throw deleteError

      setSubmissions(submissions.filter(s => s.id !== submission.id))
      setMessage(`Approved ${submission.name}`)
    } catch (error) {
      console.error('Error approving submission:', error)
      setMessage('Error approving submission')
    }
  }

  const handleReject = async (submission: ToolSubmission) => {
    try {
      const { error } = await supabase
        .from('tool_submissions')
        .delete()
        .eq('id', submission.id)

      if (error) throw error

      setSubmissions(submissions.filter(s => s.id !== submission.id))
      setMessage(`Rejected ${submission.name}`)
    } catch (error) {
      console.error('Error rejecting submission:', error)
      setMessage('Error rejecting submission')
    }
  }

  const stats = {
    totalSubmissions: submissions.length,
    pendingSubmissions: submissions.length,
    approvedSubmissions: 0,
    rejectedSubmissions: 0
  }

  if (!user) {
    return (
      <Layout title="Admin - Tool Submissions">
        <div className="text-center">Please sign in to access this page.</div>
      </Layout>
    )
  }

  return (
    <Layout title="Admin - Tool Submissions">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Tool Submissions
        </h1>

        {message && (
          <div className={`p-4 rounded-md mb-6 ${
            message.includes('Error') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            <SubmissionFilters
              categories={categories}
              filters={filters}
              onFilterChange={setFilters}
            />
            <SubmissionStats {...stats} />
            <div className="space-y-6">
              {submissions.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400">
                  No pending submissions
                </div>
              ) : (
                submissions.map(submission => (
                  <AdminSubmissionCard
                    key={submission.id}
                    submission={submission}
                    onApprove={() => handleApprove(submission)}
                    onReject={() => handleReject(submission)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
} 