import React from 'react'

export default function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-primary-200 border-t-primary-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" />
        </div>
      </div>
    </div>
  )
} 