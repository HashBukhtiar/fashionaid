import React from 'react';
import '../styles/LandingPage.css';
import logo from '../images/logo.png';

function LandingPage() {
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <img src={logo} className="LandingPage-logo" alt="logo" />
        <h1>Welcome to Looksmaxxer</h1>
        <p>Style Simplified, Just for You.</p>
        <div className="LandingPage-buttons">
          <a
            className="LandingPage-link"
            href="/login"
          >
            Log In
          </a>
          <a
            className="LandingPage-link"
            href="/signup"
          >
            Get Started
          </a>
        </div>
      </header>
    </div>
  );
}

export default LandingPage;
