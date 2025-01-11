import React from 'react';
import '../styles/LandingPage.css';

function LandingPage() {
  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <h1>Welcome to Looksmaxxer</h1>
        <p>Your journey to looking your best starts here.</p>
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
