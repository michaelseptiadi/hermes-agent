import express from "express"
import telegramRouter from "./routes/telegram"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/api/telegram", telegramRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
