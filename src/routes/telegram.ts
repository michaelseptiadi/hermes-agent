import { Router, Request, Response } from "express"

const router = Router()

router.post("/", async (req: Request, res: Response) => {
  const body = req.body

  const message = body.message?.text
  const chatId = body.message?.chat?.id

  if (!message) {
    res.send("ok")
    return
  }

  let reply: string
  try {
    reply = await askHermes(message)
  } catch (err) {
    console.error("[askHermes error]", err)
    res.send("ok")
    return
  }

  await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply
      })
    }
  )

  res.send("ok")
})

async function askHermes(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful tech news assistant."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  })

  const data = await res.json() as {
    choices?: { message: { content: string } }[]
    error?: { message: string }
  }

  if (!res.ok || data.error || !data.choices?.length) {
    const errMsg = data.error?.message ?? `HTTP ${res.status}`
    console.error("[OpenRouter error]", errMsg, JSON.stringify(data))
    throw new Error(`OpenRouter API error: ${errMsg}`)
  }

  return data.choices[0].message.content
}

export default router
