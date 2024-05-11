import React from "react"
import JoinGame from "../common/JoinGame"
import { useDispatch, useSelector } from "react-redux"
import { setAuthModalOpen } from "../../redux/features/authModalSlice"
import LogModal from "../common/LogModal"

const MainLayout = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  return (
    <>
      <LogModal />
      {!user && (
        <button onClick={() => dispatch(setAuthModalOpen(true))}>Login</button>
      )}
      {user && <JoinGame />}
    </>
  )
}

export default MainLayout
