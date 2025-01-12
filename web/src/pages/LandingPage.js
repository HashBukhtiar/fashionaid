import "../styles/LandingPage.css";
import logo from "../images/logo.png";
import googleIcon from "../images/google.png"; // Ensure this file exists in the correct path
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function LandingPage() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const navigate = useNavigate();

  const handleContinueGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      if (isAuth) {
        navigate("/chat");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <img src={logo} className="LandingPage-logo" alt="logo" />
        <h1>Welcome to Looksmaxxer</h1>
        <p>Style Simplified, Just for You.</p>
        <div className="LandingPage-buttons">
          <a className="LandingPage-link" href="/login">
            Log In
          </a>
          <a className="LandingPage-link" href="/signup">
            Get Started
          </a>
        </div>
        <div className="LandingPage-buttons">
          <a className="LandingPage-link" onClick={handleContinueGoogleClick}>
            <img src={googleIcon} className="Google-icon" alt="Google icon" />
            Continue with Google
          </a>
        </div>
      </header>
    </div>
  );
}

export default LandingPage;
