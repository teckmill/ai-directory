import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabase'
import { enrichToolData } from '../../utils/enrichment'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data: tools } = await supabase
      .from('tools')
      .select('*')
      .is('enriched', false)

    if (!tools?.length) {
      return res.status(200).json({ message: 'No tools to enrich' })
    }

    const enrichmentPromises = tools.map(enrichToolData)
    await Promise.all(enrichmentPromises)

    return res.status(200).json({ message: `Enriched ${tools.length} tools` })
  } catch (error) {
    console.error('Error in enrichment endpoint:', error)
    return res.status(500).json({ error: 'Failed to enrich tools' })
  }
} 