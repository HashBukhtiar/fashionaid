import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/LoginPage.css';
import logo from '../images/logo.png';

function LoginPage() {
  return (
    <div className="LoginPage">
      <header className="LoginPage-header">
        <button className="LoginPage-backButton">
          <FaArrowLeft />
        </button>
        <img src={logo} className="LoginPage-logo" alt="logo" />
        <h1>Login</h1>
        <input type="text" className="LoginPage-input" placeholder="Username" />
        <input type="password" className="LoginPage-input" placeholder="Password" />
        <button className="LoginPage-button">Submit</button>
      </header>
    </div>
  );
}

export default LoginPage;
