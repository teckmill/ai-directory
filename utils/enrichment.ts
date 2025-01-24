import { Tool } from '../types'
import { supabase } from './supabase'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const TWITTER_TOKEN = process.env.TWITTER_TOKEN
const PH_TOKEN = process.env.PRODUCT_HUNT_TOKEN

async function fetchGitHubData(toolName: string) {
  const response = await fetch(`https://api.github.com/search/repositories?q=${toolName}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` }
  })
  const data = await response.json()
  return data.items?.[0]
}

async function fetchTwitterData(toolName: string) {
  const response = await fetch(`https://api.twitter.com/2/users/by/username/${toolName}`, {
    headers: { Authorization: `Bearer ${TWITTER_TOKEN}` }
  })
  const data = await response.json()
  return data.data
}

async function fetchProductHuntData(toolName: string) {
  const response = await fetch(`https://api.producthunt.com/v2/api/graphql`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          posts(search: "${toolName}") {
            edges {
              node {
                name
                url
                launchedAt
              }
            }
          }
        }
      `
    })
  })
  const data = await response.json()
  return data.data?.posts?.edges?.[0]?.node
}

async function findDocsUrl(websiteUrl: string) {
  try {
    const response = await fetch(websiteUrl)
    const html = await response.text()
    // Look for common documentation links
    const docsRegex = /(docs|documentation|api-reference|developers)/i
    const matches = html.match(new RegExp(`${websiteUrl}[^"']*${docsRegex.source}[^"']*`, 'i'))
    return matches?.[0]
  } catch {
    return null
  }
}

async function scrapePricingDetails(websiteUrl: string) {
  try {
    const response = await fetch(websiteUrl)
    const html = await response.text()
    // Look for pricing section, using a more compatible regex
    const pricingRegex = /<div[^>]*pricing[^>]*>[^]*?<\/div>/i
    const matches = html.match(pricingRegex)
    if (matches) {
      // Clean up HTML and extract text
      return matches[0].replace(/<[^>]*>/g, ' ').trim()
    }
    return null
  } catch {
    return null
  }
}

export async function enrichToolData(tool: Tool) {
  try {
    const [githubData, twitterData, productHuntData] = await Promise.all([
      fetchGitHubData(tool.name),
      fetchTwitterData(tool.name),
      fetchProductHuntData(tool.name)
    ])

    const updates = {
      github_url: githubData?.html_url,
      twitter_handle: twitterData?.username,
      documentation_url: await findDocsUrl(tool.website_url),
      launch_date: productHuntData?.launchedAt,
      pricing_details: await scrapePricingDetails(tool.website_url)
    }

    await supabase
      .from('tools')
      .update(updates)
      .eq('id', tool.id)

    return updates
  } catch (error) {
    console.error('Error enriching tool data:', error)
    return null
  }
} 