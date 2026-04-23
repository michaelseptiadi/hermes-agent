export async function analyzeStock(message: string): Promise<string> {
  const symbol = message.split(" ")[1]?.toUpperCase()

  if (!symbol) {
    return "Usage: /stock BBCA"
  }

  return `📊 *Stock Analysis: ${symbol}*

Trend: Bullish 📈
Support: 9,200
Resistance: 9,700

_(This is a demo analysis. Real data coming soon.)_`
}
