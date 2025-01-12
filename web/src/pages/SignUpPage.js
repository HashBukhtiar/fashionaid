import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/SignUpPage.css';
import logo from '../images/logo.png';

function SignUpPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSignUpClick = () => {
    navigate('/chat');
  };

  return (
    <div className="SignUpPage">
      <header className="SignUpPage-header">
        <button className="SignUpPage-backButton" onClick={handleBackClick}>
          <FaArrowLeft />
        </button>
        <img src={logo} className="SignUpPage-logo" alt="logo" />
        <h1>Sign Up</h1>
        <input type="text" className="SignUpPage-input" placeholder="Username" />
        <input type="email" className="SignUpPage-input" placeholder="Email" />
        <input type="password" className="SignUpPage-input" placeholder="Password" />
        <input type="password" className="SignUpPage-input" placeholder="Re-enter Password" />
        <button className="SignUpPage-button" onClick={handleSignUpClick} style={{ animationDelay: '0.8s', opacity: 0 }}>Submit</button>
      </header>
    </div>
  );
}

export default SignUpPage;
