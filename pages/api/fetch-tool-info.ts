import { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import { getCachedData, setCachedData } from '../../utils/cache'
import { rateLimit } from '../../utils/rate-limit'

// AI-specific patterns
const AI_KEYWORDS = [
  'artificial intelligence',
  'machine learning',
  'neural network',
  'deep learning',
  'NLP',
  'computer vision',
  'GPT',
  'LLM',
  'transformer'
]

function cleanText(text: string) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[\n\r\t]/g, ' ')
    .trim()
}

function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function validateTwitterHandle(handle: string): boolean {
  return /^@[a-zA-Z0-9_]{1,15}$/.test(handle)
}

async function detectAIFeatures($: cheerio.Root): Promise<string[]> {
  const features: string[] = []
  const bodyText = $('body').text().toLowerCase()

  // Look for AI capabilities
  if (bodyText.includes('text to image')) features.push('Text to Image')
  if (bodyText.includes('speech to text')) features.push('Speech to Text')
  if (bodyText.includes('text to speech')) features.push('Text to Speech')
  if (bodyText.includes('chatbot')) features.push('Chatbot')
  if (bodyText.includes('code generation')) features.push('Code Generation')
  if (bodyText.includes('translation')) features.push('Translation')
  
  return features
}

async function extractPricing($: cheerio.Root): Promise<string | null> {
  // Look for pricing in multiple locations
  const pricingSelectors = [
    'div:contains("Pricing")',
    'section:contains("Pricing")',
    '#pricing',
    '.pricing',
    'div:contains("Plans")',
    'section:contains("Plans")',
    '#plans',
    '.plans'
  ]

  // First try specific pricing sections
  for (const selector of pricingSelectors) {
    const element = $(selector).first()
    if (element.length) {
      const text = cleanText(element.text())
      if (text.length > 20) {
        return text.slice(0, 200)
      }
    }
  }

  // Fallback: Look for pricing keywords in any text
  const pricingKeywords = ['free', 'premium', 'starter', 'enterprise', '$/month', '€/month']
  const bodyText = $('body').text()
  for (const keyword of pricingKeywords) {
    const regex = new RegExp(`.{0,100}${keyword}.{0,100}`, 'i')
    const match = bodyText.match(regex)
    if (match) {
      return cleanText(match[0])
    }
  }

  // Add AI-specific pricing patterns
  const aiPricingKeywords = [
    'tokens', 'credits', 'api calls', 'requests', 
    'images/month', 'words/month', 'characters/month'
  ]
  
  for (const keyword of aiPricingKeywords) {
    const regex = new RegExp(`.{0,100}${keyword}.{0,100}`, 'i')
    const match = $('body').text().match(regex)
    if (match) {
      return cleanText(match[0])
    }
  }

  return null
}

async function findGitHubUrl($: cheerio.Root): Promise<string | null> {
  // Look for GitHub links in multiple places
  const githubSelectors = [
    'a[href*="github.com"]',
    'a[aria-label*="GitHub"]',
    'a[title*="GitHub"]',
    'a:contains("GitHub")'
  ]

  for (const selector of githubSelectors) {
    const link = $(selector).first().attr('href')
    if (link?.includes('github.com')) {
      return link.startsWith('http') ? link : `https://github.com${link}`
    }
  }

  // Fallback: Look for repository links in meta tags
  const metaRepo = $('meta[property="og:repository"]').attr('content') ||
                  $('meta[name="github:repository"]').attr('content')
  if (metaRepo) {
    return `https://github.com/${metaRepo}`
  }

  return null
}

async function findTwitterHandle($: cheerio.Root): Promise<string | null> {
  // Look for Twitter/X links in multiple places
  const twitterSelectors = [
    'a[href*="twitter.com"]',
    'a[href*="x.com"]',
    'a[aria-label*="Twitter"]',
    'a[aria-label*="X"]',
    'a:contains("Twitter")',
    'a:contains("Follow us")'
  ]

  for (const selector of twitterSelectors) {
    const link = $(selector).first().attr('href')
    if (link) {
      const match = link.match(/(?:twitter\.com|x\.com)\/([^/?]+)/)
      return match ? `@${match[1]}` : null
    }
  }

  // Fallback: Look for Twitter handle in text
  const bodyText = $('body').text()
  const twitterHandleRegex = /@([a-zA-Z0-9_]{1,15})/
  const match = bodyText.match(twitterHandleRegex)
  if (match) {
    return `@${match[1]}`
  }

  return null
}

async function findDocsUrl($: cheerio.Root, baseUrl: string): Promise<string | null> {
  // Look for documentation links in multiple places
  const docSelectors = [
    'a:contains("Docs")',
    'a:contains("Documentation")',
    'a:contains("API")',
    'a[href*="docs"]',
    'a[href*="documentation"]',
    'a[href*="api"]',
    'a[aria-label*="Documentation"]'
  ]

  for (const selector of docSelectors) {
    const link = $(selector).first().attr('href')
    if (link) {
      return link.startsWith('http') ? link : new URL(link, baseUrl).toString()
    }
  }

  // Fallback: Common documentation paths
  const commonPaths = ['/docs', '/documentation', '/api', '/developers', '/guide']
  for (const path of commonPaths) {
    try {
      const docUrl = new URL(path, baseUrl).toString()
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)
      
      const response = await fetch(docUrl, { 
        method: 'HEAD',
        signal: controller.signal
      })
      
      clearTimeout(timeout)
      if (response.ok) {
        return docUrl
      }
    } catch {
      continue
    }
  }

  return null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Rate limiting
  try {
    await rateLimit(req)
  } catch {
    return res.status(429).json({ error: 'Too many requests' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url } = req.body

  if (!validateUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL' })
  }

  // Check cache first
  const cached = await getCachedData(`tool:${url}`)
  if (cached) {
    return res.status(200).json(JSON.parse(cached))
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AIToolsDirectory/1.0;)'
      },
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Extract info from meta tags and content
    const toolInfo = {
      name: cleanText($('meta[property="og:title"]').attr('content') || $('title').text()),
      description: cleanText($('meta[property="og:description"]').attr('content') || 
                            $('meta[name="description"]').attr('content') ||
                            $('p').first().text()),
      logo_url: $('meta[property="og:image"]').attr('content') ||
               $('link[rel="icon"]').attr('href') ||
               '/default-logo.png',
      pricing_details: await extractPricing($),
      github_url: await findGitHubUrl($),
      twitter_handle: await findTwitterHandle($),
      documentation_url: await findDocsUrl($, url),
      features: await detectAIFeatures($),
      ai_keywords: AI_KEYWORDS.filter(keyword => 
        $('body').text().toLowerCase().includes(keyword)
      )
    }

    // Validate URLs and data
    if (!toolInfo.name || !toolInfo.description) {
      return res.status(400).json({ 
        error: 'Could not extract required information from website',
        partial: toolInfo
      })
    }

    if (toolInfo.github_url && !validateUrl(toolInfo.github_url)) {
      toolInfo.github_url = null
    }

    if (toolInfo.twitter_handle && !validateTwitterHandle(toolInfo.twitter_handle)) {
      toolInfo.twitter_handle = null
    }

    // Cache the result
    await setCachedData(`tool:${url}`, JSON.stringify(toolInfo))

    return res.status(200).json(toolInfo)
  } catch (error) {
    console.error('Error fetching tool info:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch tool info',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 