import { askAI } from "./askAI"

const yahooFinance = require("yahoo-finance2").default

export async function analyzeStock(message: string): Promise<string> {

  const parts = message.trim().split(/\s+/)
  let symbol = parts[1]

  if (!symbol) {
    symbol = "BBCA"
  }

  try {
    const res = await fetch(
      "https://www.idx.co.id/primary/TradingSummary/GetStockSummary"
    )

    const data = await res.json() as { data: Array<{ StockCode: string; LastPrice: number; OpenPrice: number; High: number; Low: number; ChangePercent: number }> }

    const stock = data.data.find(
      (s: any) => s.StockCode === symbol.toUpperCase()
    )

    if (!stock) {
      return `Stock ${symbol} not found`
    }

    const price = stock.LastPrice
    const open = stock.OpenPrice
    const high = stock.High
    const low = stock.Low
    const change = stock.ChangePercent
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
    return `Stock ${symbol} not found \n\nError: ${error}`
  }
}
