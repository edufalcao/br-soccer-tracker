const GNEWS_BASE_URL = 'https://gnews.io/api/v4'

// --- GNews types ---

export interface GNewsArticle {
  title: string
  description: string
  content: string
  url: string
  image: string | null
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

interface GNewsResponse {
  totalArticles: number
  articles: GNewsArticle[]
}

// --- RSS types ---

export interface RssNewsItem {
  title: string
  link: string
  pubDate: string
  description: string
  sourceName: string
  sourceUrl: string
}

// --- GNews API ---

export async function fetchGNews(query: string, max: number = 10): Promise<GNewsArticle[]> {
  const apiKey = useRuntimeConfig().gnewsApiKey
  if (!apiKey) {
    throw new Error('GNews API key not configured (NUXT_GNEWS_API_KEY)')
  }

  const response = await $fetch<GNewsResponse>(`${GNEWS_BASE_URL}/search`, {
    params: {
      q: query,
      lang: 'pt',
      country: 'br',
      max,
      token: apiKey,
    },
  })

  return response.articles
}

// --- Google News RSS ---

export async function fetchGoogleNewsRss(query: string): Promise<RssNewsItem[]> {
  const encodedQuery = encodeURIComponent(query)
  const url = `https://news.google.com/rss/search?q=${encodedQuery}&hl=pt-BR&gl=BR&ceid=BR:pt-419`

  const xml = await $fetch<string>(url, { responseType: 'text' })
  return parseRssItems(xml)
}

// --- RSS parsing helpers ---

function parseRssItems(xml: string): RssNewsItem[] {
  const items: RssNewsItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match = itemRegex.exec(xml)

  while (match !== null) {
    const itemXml = match[1] ?? ''
    const title = extractTag(itemXml, 'title')
    const link = extractTag(itemXml, 'link')
    const pubDate = extractTag(itemXml, 'pubDate')
    const description = extractTag(itemXml, 'description')
    const sourceName = extractTag(itemXml, 'source')
    const sourceUrl = extractAttribute(itemXml, 'source', 'url')

    if (title && link) {
      items.push({
        title: decodeHtmlEntities(title),
        link,
        pubDate: pubDate ?? '',
        description: description ? decodeHtmlEntities(description) : '',
        sourceName: sourceName ? decodeHtmlEntities(sourceName) : '',
        sourceUrl: sourceUrl ?? link,
      })
    }

    match = itemRegex.exec(xml)
  }

  return items
}

function extractTag(xml: string, tag: string): string | null {
  // Handle CDATA: <tag><![CDATA[...]]></tag>
  const cdataRegex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  const cdataMatch = cdataRegex.exec(xml)
  if (cdataMatch?.[1]) return cdataMatch[1].trim()

  // Handle plain text: <tag>...</tag>
  const plainRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  const plainMatch = plainRegex.exec(xml)
  if (plainMatch?.[1]) return plainMatch[1].trim()

  return null
}

function extractAttribute(xml: string, tag: string, attr: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`)
  const match = regex.exec(xml)
  return match?.[1] ?? null
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}
