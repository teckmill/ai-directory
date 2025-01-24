import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { supabase } from '../../utils/supabase'
import { Tool, Category } from '../../types'

type FilterState = {
  search: string
  category: string
  pricing: 'all' | 'free' | 'freemium' | 'paid'
  sortBy: 'name' | 'newest'
}

export default function ToolsPage() {
  return (
    <Layout title="AI Tools">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">AI Tools</h1>
      </div>
    </Layout>
  )
} 