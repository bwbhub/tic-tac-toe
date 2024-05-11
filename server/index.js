import express from "express"
import http from "http"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import routes from "./src/routes/index.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/v1", routes)

const port = process.env.PORT || 4000

const server = http.createServer(app)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb connected")
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.log({ err })
    process.exit(1)
  })
