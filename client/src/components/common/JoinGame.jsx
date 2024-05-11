import React, { useState } from "react"

const JoinGame = () => {
  const [rivaleUsername, setRivalUsername] = useState("")

  const createChannel = () => {}

  return (
    <div className="joingame">
      <h1>JoinGame</h1>
      <input
        placeholder="Nom d'utilisateur du rival"
        onChange={(event) => setRivalUsername(event.target.value)}
      />
      <button onClick={createChannel}>Join/Start Game</button>
    </div>
  )
}

export default JoinGame
