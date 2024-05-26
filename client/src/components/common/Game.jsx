import React, { useState } from "react"
import Board from "./Board"

const Game = ({ channel }) => {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2,
  )

  const [result, setResult] = useState({ winner: "none", state: "none" })
  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2)
  })

  if (!playersJoined) {
    return <h1>En attente de votre adversaire...</h1>
  }

  return (
    <div>
      <Board result={result} setResult={setResult} />
    </div>
  )
}

export default Game
