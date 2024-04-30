import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

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
