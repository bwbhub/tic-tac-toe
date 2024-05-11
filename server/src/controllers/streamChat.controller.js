const createChannel = async (req, res) => {
  try {
    const streamChatToken = req.streamChatToken
    res.status(201).json({ message: "Canal de Chat créé avec succès." })
  } catch (error) {
    console.error("Erreur lors de la création du canal de chat: ", error)
    res
      .status(500)
      .json({ message: "Erreur lors de la création du canal de chat" })
  }
}

export default { createChannel }
