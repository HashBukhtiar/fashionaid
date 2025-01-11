import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './App.css';
import AIChatPage from './pages/AIChatPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/chat" element={<AIChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
