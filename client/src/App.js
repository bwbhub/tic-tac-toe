import "./App.css"
import MainLayout from "./components/layout/MainLayout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { StreamChat } from "stream-chat"
import Config from "./config.json"
import { useSelector } from "react-redux"

function App() {
  const { user } = useSelector((state) => state.user)
  const client = StreamChat.getInstance(Config.API_KEY)

  if (user) {
    const token = user.token
    client
      .connectUser(
        {
          id: user._id,
          name: user.username,
        },
        token,
      )
      .then((user) => console.log(user))
  }

  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
      />
      <MainLayout />
    </div>
  )
}

export default App
