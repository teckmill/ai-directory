import React from 'react'
import { Tool } from '../types'

type AdminSubmissionCardProps = {
  submission: Tool & {
    user: {
      email: string
    }
  }
  onApprove: () => void
  onReject: () => void
}

export default function AdminSubmissionCard({ submission, onApprove, onReject }: AdminSubmissionCardProps) {
  return (
    <div className="bg-white dark:bg-dark-200 rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img src={submission.logo_url} alt={submission.name} className="w-12 h-12 object-contain rounded" />
          <div>
            <h3 className="text-lg font-semibold">{submission.name}</h3>
            <p className="text-sm text-gray-500">by {submission.user.email}</p>
          </div>
        </div>
        <div className="space-x-2">
          <button 
            onClick={onReject} 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
          <button 
            onClick={onApprove} 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">{submission.description}</p>
    </div>
  )
} 