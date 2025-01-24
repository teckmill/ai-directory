import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { supabase } from '../../utils/supabase'
import { Tool } from '../../types'

export default function AdminTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [editing, setEditing] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTools() {
      const { data } = await supabase.from('tools').select('*')
      if (data) setTools(data)
    }
    fetchTools()
  }, [])

  const handleEdit = async (id: string, updates: Partial<Tool>) => {
    await supabase.from('tools').update(updates).eq('id', id)
    // Refresh tools list
    const { data } = await supabase.from('tools').select('*')
    if (data) setTools(data)
    setEditing(null)
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Manage Tools</h1>
        <div className="space-y-6">
          {tools.map(tool => (
            <div key={tool.id} className="bg-white dark:bg-dark-200 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{tool.name}</h2>
                <button 
                  onClick={() => setEditing(editing === tool.id ? null : tool.id)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg"
                >
                  {editing === tool.id ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              {editing === tool.id ? (
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleEdit(tool.id, {
                    pricing_details: formData.get('pricing_details') as string,
                    demo_url: formData.get('demo_url') as string,
                    github_url: formData.get('github_url') as string,
                    documentation_url: formData.get('documentation_url') as string,
                    twitter_handle: formData.get('twitter_handle') as string
                  })
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Pricing Details</label>
                      <textarea 
                        name="pricing_details"
                        defaultValue={tool.pricing_details || ''}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Demo URL</label>
                      <input 
                        type="url"
                        name="demo_url"
                        defaultValue={tool.demo_url || ''}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">GitHub URL</label>
                      <input 
                        type="url"
                        name="github_url"
                        defaultValue={tool.github_url || ''}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Documentation URL</label>
                      <input 
                        type="url"
                        name="documentation_url"
                        defaultValue={tool.documentation_url || ''}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Twitter Handle</label>
                      <input 
                        type="text"
                        name="twitter_handle"
                        defaultValue={tool.twitter_handle || ''}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2 text-sm text-gray-600">
                  {tool.pricing_details && <p><strong>Pricing:</strong> {tool.pricing_details}</p>}
                  {tool.demo_url && <p><strong>Demo:</strong> {tool.demo_url}</p>}
                  {tool.github_url && <p><strong>GitHub:</strong> {tool.github_url}</p>}
                  {tool.documentation_url && <p><strong>Docs:</strong> {tool.documentation_url}</p>}
                  {tool.twitter_handle && <p><strong>Twitter:</strong> {tool.twitter_handle}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
} 