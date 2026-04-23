export async function getTechNews(): Promise<string> {
  const res = await fetch("https://techcrunch.com/feed/")
  const xml = await res.text()

  // Parse titles from RSS XML
  const matches = [...xml.matchAll(/<item>[\s\S]*?<title><!\[CDATA\[(.*?)\]\]><\/title>/g)]
  const titles = matches.slice(0, 5).map((m, i) => `${i + 1}. ${m[1]}`)

  if (titles.length === 0) {
    return "⚠️ Could not fetch news at the moment. Try again later."
  }

  return `📰 *Latest Tech News:*\n\n${titles.join("\n")}`
}
