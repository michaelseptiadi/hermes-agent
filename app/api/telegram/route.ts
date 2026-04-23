export async function POST(req: Request) {
  const body = await req.json()

  const message = body.message?.text
  const chatId = body.message?.chat?.id

  if (!message) {
    return new Response("ok")
  }

  const reply = await askHermes(message)

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

  return new Response("ok")
}

async function askHermes(prompt: string) {
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

  const data = await res.json()

  return data.choices[0].message.content
}