import express from "express"
import telegramRouter from "./routes/telegram"

const app = express()

app.use(express.json())

app.use("/api/telegram", telegramRouter)

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export default app
