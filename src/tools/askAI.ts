export async function askAI(prompt: string): Promise<string> {
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
          content: "You are Hermes, a helpful tech and finance assistant."
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
