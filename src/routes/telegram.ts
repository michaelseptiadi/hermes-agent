import { Router, Request, Response } from "express"
import { runAgent } from "../agent/runAgent"

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
    reply = await runAgent(message)
  } catch (err) {
    console.error("[runAgent error]", err)
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

export default router
