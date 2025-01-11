import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', content: userInput };
    setMessages([...messages, newMessage]);
    setUserInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        content: `Great question! Based on your wardrobe, I recommend pairing that with a navy blazer.`
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="header">
        <h1>AI Stylist Chat</h1>
        <button className="wardrobe-button" onClick={() => navigate('/wardrobe')}>
          Wardrobe
        </button>
      </div>
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;