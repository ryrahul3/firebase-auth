import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  OAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, addNameImage, handleProviderLogin } from "./firebase.js";

export default function Login(props) {
  const [hasAccount, setHasAccount] = useState(true);
  const [name, setName] = useState("Rahul Yadav");
  const [email, setEmail] = useState("rahul.yadav@ry.com");
  const [password, setPassword] = useState("*******");

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        addNameImage(name, "assets/man_smoke.jpg");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const determineLoading = () => {
    if (props.loading) {
      return (
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    } else {
      return "Log in";
    }
  };

  return (
    <>
      <div className="login">
        <div className="title">
          <i className="fal fa-comments"></i>
          <h1>{hasAccount ? "Log In" : "Register"}</h1>
        </div>
        <div className="spacer1"></div>
        <div className="logincontainer">
          <form onSubmit={(e) => e.preventDefault()}>
            <label style={{ display: hasAccount ? "none" : "flex" }}>
              <span>Name</span>
              <input
                type="text"
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="text"
                value={email}
                placeholder="store@mail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="errormsgLogin"></p>
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="errormsgLogin"></p>
            </label>
            {hasAccount ? (
              <div className="btnContainer">
                <button className="themeBtn" onClick={handleLogin}>
                  {determineLoading()}
                </button>
                <div className="flex" style={{ textAlign: "center" }}>
                  Forgot your password?
                  <small>
                    Don't have an account
                    <span
                      onClick={() => setHasAccount(!hasAccount)}
                      style={{ cursor: "pointer" }}
                    >
                      ? Register
                    </span>
                  </small>
                </div>
              </div>
            ) : (
              <div className="btnContainer">
                <button
                  className="themeBtn"
                  style={{ marginBottom: "10px" }}
                  onClick={handleSignup}
                >
                  Register
                </button>
                <div className="flexrow">
                  <small>
                    Already have an account
                    <span
                      onClick={() => setHasAccount(!hasAccount)}
                      style={{ cursor: "pointer" }}
                    >
                      ? Sign in
                    </span>
                  </small>
                </div>
              </div>
            )}
            <div className="flexrow">
              <button
                className="login-btn gog-btn"
                onClick={() =>
                  handleProviderLogin(new GoogleAuthProvider(), {
                    prompt: "select_account",
                  })
                }
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                className="login-btn fb-btn"
                onClick={() =>
                  handleProviderLogin(new FacebookAuthProvider(), {
                    display: "popup",
                  })
                }
              >
                <i className="fab fa-facebook"></i>
              </button>
              <button
                className="login-btn yah-btn"
                onClick={() => handleProviderLogin(new OAuthProvider('yahoo.com'))}
              >
                <i className="fab fa-yahoo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
