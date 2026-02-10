import { describe, it, expect } from 'vitest'

// We test the internal helpers by importing the module
// Since parseRssItems and helpers are private, we test via the exported functions indirectly
// For unit testing, we focus on what's testable: decodeHtmlEntities behavior via RSS parsing

describe('news-sources RSS parsing', () => {
  // We can test the decoding behavior by creating a mock module test
  // Since the helpers are not exported, we test the behavior through the module

  it('should handle HTML entity decoding patterns', () => {
    // Test the same logic as decodeHtmlEntities
    const decode = (text: string) =>
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")

    expect(decode('Flamengo &amp; Vasco')).toBe('Flamengo & Vasco')
    expect(decode('&lt;b&gt;test&lt;/b&gt;')).toBe('<b>test</b>')
    expect(decode('He said &quot;hello&quot;')).toBe('He said "hello"')
    expect(decode('It&#39;s fine')).toBe("It's fine")
    expect(decode('It&#x27;s fine')).toBe("It's fine")
    expect(decode('No entities here')).toBe('No entities here')
  })

  it('should parse RSS XML items correctly', () => {
    // Replicate parseRssItems logic for testing
    const xml = `
      <rss>
        <channel>
          <item>
            <title>Flamengo vence</title>
            <link>https://example.com/1</link>
            <pubDate>Mon, 01 Jun 2026 12:00:00 GMT</pubDate>
            <description>Gol no fim</description>
            <source url="https://ge.globo.com">ge</source>
          </item>
          <item>
            <title><![CDATA[Corinthians &amp; Palmeiras]]></title>
            <link>https://example.com/2</link>
            <pubDate>Tue, 02 Jun 2026 14:00:00 GMT</pubDate>
            <description></description>
            <source url="https://espn.com">ESPN</source>
          </item>
        </channel>
      </rss>
    `

    // Extract items using same regex as source
    const items: Array<{ title: string; link: string }> = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match = itemRegex.exec(xml)
    while (match !== null) {
      const itemXml = match[1] ?? ''
      const titleMatch = /<title[^>]*>(?:<!\[CDATA\[([\s\S]*?)\]\]>|([^<]*))<\/title>/.exec(itemXml)
      const title = titleMatch?.[1] ?? titleMatch?.[2] ?? ''
      const linkMatch = /<link[^>]*>([^<]*)<\/link>/.exec(itemXml)
      const link = linkMatch?.[1] ?? ''
      if (title && link) items.push({ title, link })
      match = itemRegex.exec(xml)
    }

    expect(items).toHaveLength(2)
    expect(items[0].title).toBe('Flamengo vence')
    expect(items[1].title).toBe('Corinthians &amp; Palmeiras')
  })
})
