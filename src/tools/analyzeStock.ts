import { askAI } from "./askAI"

const yahooFinance = require("yahoo-finance2").default

export async function analyzeStock(message: string): Promise<string> {

  const symbol = message.split(" ")[1]

  if (!symbol) {
    return "Usage: /stock BBCA"
  }

  const ticker = `${symbol.toUpperCase()}.JK`

  try {

    const quote = await yahooFinance.quote(ticker)

    const price = quote.regularMarketPrice
    const open = quote.regularMarketOpen
    const high = quote.regularMarketDayHigh
    const low = quote.regularMarketDayLow
    const change = quote.regularMarketChangePercent
    const aiAnalysis = await askAI(`
        Analyze this stock for short term trading.

        Symbol: ${symbol}
        Price: ${price}
        Open: ${open}
        High: ${high}
        Low: ${low}
        Change: ${change}%
    `)

    return aiAnalysis

  } catch (error) {
    return `Stock ${symbol} not found`
  }
}
