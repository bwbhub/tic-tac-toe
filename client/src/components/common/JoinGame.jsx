import React, { useState } from "react"
import { useChatContext, Channel } from "stream-chat-react"
import Game from "./Game"

const JoinGame = () => {
  const [rivaleUsername, setRivalUsername] = useState("")
  const { client } = useChatContext()
  const [channel, setChannel] = useState(null)

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivaleUsername } })

    if (response.users.length === 0) {
      alert("Utilisateur introuvable")
      return
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    })

    await newChannel.watch()

    setChannel(newChannel)
  }

  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h1>JoinGame</h1>
          <input
            placeholder="Nom d'utilisateur du rival"
            onChange={(event) => setRivalUsername(event.target.value)}
          />
          <button onClick={createChannel}>Join/Start Game</button>
        </div>
      )}
    </>
  )
}

export default JoinGame
