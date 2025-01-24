import React, { useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../utils/supabase'

type ReviewFormProps = {
  toolId: string
  onSubmit: () => void
}

export default function ReviewForm({ toolId, onSubmit }: ReviewFormProps) {
  const user = useUser()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          tool_id: toolId,
          user_id: user.id,
          rating,
          comment
        })

      if (error) throw error
      
      setComment('')
      setRating(5)
      onSubmit()
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + window.location.pathname
      }
    })
  }

  if (!user) {
    return (
      <div className="bg-gray-50 dark:bg-dark-300 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please sign in to leave a review
        </p>
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Sign in with GitHub
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(value => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`text-2xl ${
                value <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Review
        </label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-dark-300 dark:text-white"
          placeholder="Share your experience with this tool..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full px-4 py-2 bg-primary-600 text-white rounded-lg transition-colors ${
          submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'
        }`}
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
} 