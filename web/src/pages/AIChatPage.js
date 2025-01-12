import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AIChatPage.css';
import logo from '../images/logo.png';

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Call scrollToBottom whenever a new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Delay the rendering of the chatbox
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChatBoxVisible(true);
    }, 500); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', content: userInput, id: Date.now() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput('');

    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        content: `Great question! Based on your wardrobe, I recommend pairing that with a navy blazer.`,
        id: Date.now(),
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
        <img src={logo} alt="Logo" className="logo" />
        <h1>AI Stylist Chat</h1>
        <button className="wardrobe-button" onClick={() => navigate('/wardrobe')}>
          Wardrobe
        </button>
      </div>
      {isChatBoxVisible && (
        <div className="chat-box animate"> {/* Added animate class */}
          <div className="messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.role} enter`} // Added the "enter" class for animation
              >
                {msg.content}
              </div>
            ))}
            {/* Reference to ensure scrolling to the last message */}
            <div ref={messagesEndRef} />
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
      )}
    </div>
  );
};

export default AIChatPage;
