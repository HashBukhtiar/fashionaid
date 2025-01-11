import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/LoginPage.css';
import logo from '../images/logo.png';

function LoginPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/chat');
  };

  return (
    <div className="LoginPage">
      <header className="LoginPage-header">
        <button className="LoginPage-backButton" onClick={handleBackClick}>
          <FaArrowLeft />
        </button>
        <img src={logo} className="LoginPage-logo" alt="logo" />
        <h1>Login</h1>
        <input type="text" className="LoginPage-input" placeholder="Username" />
        <input type="password" className="LoginPage-input" placeholder="Password" />
        <button className="LoginPage-button" onClick={handleLoginClick}>Submit</button>
      </header>
    </div>
  );
}

export default LoginPage;
