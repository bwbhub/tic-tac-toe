import jsonwebtoken from "jsonwebtoken"
import responseHandler from "../handlers/response.handler.js"
import userModel from "../models/user.model.js"
import { serverClient } from "../configs/streamChat.config.js"

const signup = async (req, res) => {
  try {
    const { username, password } = req.body

    const checkUser = await userModel.findOne({ username })
    if (checkUser)
      return responseHandler.badrequest(res, "Nom d'utilisateur indisponible")

    const user = new userModel()

    user.username = username
    user.setPassword(password)
    user.token = serverClient.createToken(user.id)
    console.log(user)

    await user.save()
    console.log("hello")

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      },
    )

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    })
  } catch {
    responseHandler.error(res)
  }
}

const signin = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await userModel
      .findOne({ username })
      .select("username password salt id friendId")

    if (!user) return responseHandler.badrequest(res, "Utilisateur introuvable")

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Mot de passe incorrect")

    const tempToken = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      },
    )
    const token = serverClient.createToken(user.id)

    user.password = undefined
    user.salt = undefined

    responseHandler.created(res, {
      tempToken,
      token,
      ...user._doc,
      id: user.id,
    })
  } catch {
    responseHandler.error(res)
  }
}

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body
    const user = await userModel
      .findById(req.user.id)
      .select("password id salt")

    if (!user) return responseHandler.unauthorize(res)

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Mot de passe incorrect")

    user.setPassword(newPassword)

    await user.save()

    responseHandler.ok(res)
  } catch {
    responseHandler.error(res)
  }
}

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id)

    if (!user) return responseHandler.notfound(res)

    responseHandler.ok(res, user)
  } catch {
    responseHandler.error(res)
  }
}

export default {
  signup,
  signin,
  getInfo,
  updatePassword,
}
