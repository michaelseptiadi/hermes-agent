import { analyzeStock } from "../tools/analyzeStock"
import { getTechNews } from "../tools/getTechNews"
import { askAI } from "../tools/askAI"

export async function runAgent(message: string): Promise<string> {
  if (message.startsWith("/stock")) {
    return await analyzeStock(message)
  }

  if (message.startsWith("/news")) {
    return await getTechNews()
  }

  return await askAI(message)
}
