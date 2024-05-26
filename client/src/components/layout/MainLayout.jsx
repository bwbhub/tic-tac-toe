import React from "react"
import JoinGame from "../common/JoinGame"
import { useDispatch } from "react-redux"
import { setAuthModalOpen } from "../../redux/features/authModalSlice"
import LogModal from "../common/LogModal"
import { setUser } from "../../redux/features/userSlice"
import { toast } from "react-toastify"
import { Chat } from "stream-chat-react"
import Cookies from "universal-cookie"

const MainLayout = ({ client }) => {
  const dispatch = useDispatch()
  const cookie = new Cookies()
  const user = cookie.get("user")

  const logout = () => {
    dispatch(setUser(null))
    cookie.remove("user")
    client.disconnectUser()
    toast.success("Vous vous êtes déconnecté !")
  }

  return (
    <>
      <LogModal />
      {!user && (
        <button onClick={() => dispatch(setAuthModalOpen(true))}>
          Se connecter
        </button>
      )}
      {user && (
        <Chat client={client}>
          <button onClick={logout}>Déconnexion</button>
          <JoinGame />
        </Chat>
      )}
    </>
  )
}

export default MainLayout
