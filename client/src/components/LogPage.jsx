/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../styles/logpage.css";

const Container = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const signUp = () => {};
  const signIn = () => {};

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      <div className={`form-container sign-up ${isSignUp ? "active" : ""}`}>
        <form action="">
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) =>
              setUser({ ...user, username: event.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) =>
              setUser({ ...user, password: event.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(event) =>
              setUser({ ...user, confirmPassword: event.target.value })
            }
          />
          <button onClick={signUp}>Sign Up</button>
        </form>
      </div>
      <div className={`form-container sign-in ${isSignUp ? "" : "active"}`}>
        <form action="">
          <h1>Sign In</h1>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <a href="#">Forgot your password ?</a>
          <button onClick={signIn}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${isSignUp ? "" : "hidden"}`}
          >
            <h1>Hello, Friend!</h1>
            <p>Already registered ? Click here to log back in</p>
            <button
              className={`${isSignUp ? "" : "hidden"}`}
              id="login"
              onClick={handleToggle}
            >
              Sign In
            </button>
          </div>
          <div
            className={`toggle-panel toggle-right ${isSignUp ? "hidden" : ""}`}
          >
            <h1>Hello, Friend!</h1>
            <p>
              You are new ? Register to fully enjoy the website features by
              clicking here
            </p>
            <button
              className={`${isSignUp ? "hidden" : ""}`}
              id="register"
              onClick={handleToggle}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
