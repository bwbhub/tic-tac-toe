import express from "express"
import { body } from "express-validator"
import userModel from "../models/user.model.js"
import userController from "../controllers/user.controller.js"
import requestHandler from "../handlers/request.handler.js"
import tokenMiddleware from "../middlewares/token.middleware.js"

const router = express.Router()

router.post(
  "/signup",
  body("username")
    .exists()
    .withMessage("Nom d'utilisateur requis.")
    .isLength({ min: 6 })
    .withMessage("Minimum 6 caractères.")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value })
      if (user) return Promise.reject("Nom d'utilisateur déjà utilisé.")
    }),
  body("password")
    .exists()
    .withMessage("Mot de passe requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule et un caractère spécial parmi !@#$%^&*.",
    ),
  body("confirmPassword")
    .exists()
    .withMessage("Mot de passe requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule et un caractère spécial parmi !@#$%^&*.",
    )
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Mot de passe incorrect")
      return true
    }),
  requestHandler.validate,
  userController.signup,
)

router.post(
  "/signin",
  body("username")
    .exists()
    .withMessage("Nom d'utilisateur requis.")
    .isLength({ min: 6 })
    .withMessage("Minimum 6 caractères."),
  body("password")
    .exists()
    .withMessage("Mot de passe requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères."),
  requestHandler.validate,
  userController.signin,
)

router.put(
  "/update-password",
  tokenMiddleware.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("Nouveau mot de passe requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule et un caractère spécial parmi !@#$%^&*.",
    ),
  body("confirmNewPassword")
    .exists()
    .withMessage("Nouveau mot de passe requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Le mot de passe doit contenir au moins une majuscule et un caractère spécial parmi !@#$%^&*.",
    )
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Mot de passe incorrect")
      return true
    }),
  requestHandler.validate,
  userController.updatePassword,
)

router.get("/info", tokenMiddleware.auth, userController.getInfo)

export default router
