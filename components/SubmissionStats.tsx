import React from 'react'

type SubmissionStatsProps = {
  totalSubmissions: number
  pendingSubmissions: number
  approvedSubmissions: number
  rejectedSubmissions: number
}

export default function SubmissionStats({
  totalSubmissions,
  pendingSubmissions,
  approvedSubmissions,
  rejectedSubmissions
}: SubmissionStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-dark-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-500">Total</h3>
        <p className="text-2xl font-semibold">{totalSubmissions}</p>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-600 dark:text-blue-200">Pending</h3>
        <p className="text-2xl font-semibold text-blue-700 dark:text-blue-100">{pendingSubmissions}</p>
      </div>
      <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-600 dark:text-green-200">Approved</h3>
        <p className="text-2xl font-semibold text-green-700 dark:text-green-100">{approvedSubmissions}</p>
      </div>
      <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
        <h3 className="text-sm font-medium text-red-600 dark:text-red-200">Rejected</h3>
        <p className="text-2xl font-semibold text-red-700 dark:text-red-100">{rejectedSubmissions}</p>
      </div>
    </div>
  )
} 