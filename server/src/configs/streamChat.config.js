import { StreamChat } from "stream-chat"

const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET

const serverClient = StreamChat.getInstance(api_key, api_secret)

export { serverClient }
