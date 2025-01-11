import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AIChatPage from './pages/AIChatPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root path to the AIChatPage */}
          <Route path="/" element={<AIChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
