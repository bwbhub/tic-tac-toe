/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import * as Yup from "yup"
import userApi from "../../api/modules/user.api.js"
import { setAuthModalOpen } from "../../redux/features/authModalSlice.js"
import { setUser } from "../../redux/features/userSlice.js"
import "../../styles/logpage.css"
import Modal from "react-modal"

const LogModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal)

  const dispatch = useDispatch()

  const [isSignUp, setIsSignUp] = useState(false) // pour le style du formulaire
  const [errorMessage, setErrorMessage] = useState("")

  const handleClose = () => dispatch(setAuthModalOpen(false))

  const signUpForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    ValidationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Le nom d'utilisateur doit faire 6 caractères minimum.")
        .required("Le nom d'utilisateur est requis"),
      password: Yup.string()
        .min(
          8,
          "Le mot de passe doit faire 8 caractères minimum, et doit contenir une majuscule et un caractère spécial.",
        )
        .required("Le mot de passe est requis"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Les mots de passes ne correspondent pas.",
        )
        .min(8, "Les mots de passes ne correspondent pas")
        .required("Le mot de passe est requis"),
    }),
    onSubmit: async (values) => {
      const { response, err } = await userApi.signup(values)

      if (response) {
        signUpForm.resetForm()
        dispatch(setUser(response))
        dispatch(setAuthModalOpen(false))
        toast.success("Vous êtes connecté !")
      }

      if (err) setErrorMessage(err.message)
    },
  })
  const signInForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    ValidationSchema: Yup.object({
      username: Yup.string()
        .min(6, "Le nom d'utilisateur doit faire 6 caractères minimum.")
        .required("Le nom d'utilisateur est requis"),
      password: Yup.string()
        .min(
          8,
          "Le mot de passe doit faire 8 caractères minimum, et doit contenir une majuscule et un caractère spécial.",
        )
        .required("Le mot de passe est requis"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined)
      const { response, err } = await userApi.signin(values)

      if (response) {
        signInForm.resetForm()
        dispatch(setUser(response))
        dispatch(setAuthModalOpen(false))
        toast.success("Vous êtes connecté !")
      }

      if (err) setErrorMessage(err.message)
    },
  })

  const handleToggle = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <Modal
      className={`container ${isSignUp ? "active" : ""}`}
      id="container"
      isOpen={authModalOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <div className={`form-container sign-up ${isSignUp ? "active" : ""}`}>
        <form onSubmit={signUpForm.handleSubmit}>
          <h1>Créer un compte</h1>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            name="username"
            value={signUpForm.values.username}
            onChange={signUpForm.handleChange}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={signUpForm.values.password}
            onChange={signUpForm.handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer mot de passe"
            value={signUpForm.values.confirmPassword}
            onChange={signUpForm.handleChange}
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <div className={`form-container sign-in ${isSignUp ? "" : "active"}`}>
        <form onSubmit={signInForm.handleSubmit}>
          <h1>Se connecter</h1>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={signInForm.values.username}
            onChange={signInForm.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={signInForm.values.password}
            onChange={signInForm.handleChange}
          />
          <a href="#">Mot de passe oublié ?</a>
          <button type="submit">Se connecter</button>
        </form>
      </div>
      {errorMessage && console.log(errorMessage)}
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${isSignUp ? "" : "hidden"}`}
          >
            <h1>Hello !</h1>
            <p>Tu as déjà un compte ? Cliques ici pour te connecter</p>
            <button
              className={`${isSignUp ? "" : "hidden"}`}
              id="login"
              onClick={handleToggle}
            >
              Se connecter
            </button>
          </div>
          <div
            className={`toggle-panel toggle-right ${isSignUp ? "hidden" : ""}`}
          >
            <h1>Hello !</h1>
            <p>Tu es nouveau ? Inscris toi pour profiter et jouer !</p>
            <button
              className={`${isSignUp ? "hidden" : ""}`}
              id="register"
              onClick={handleToggle}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default LogModal
