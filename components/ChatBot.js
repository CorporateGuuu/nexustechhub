import React, { useState, useRef, useEffect } from 'react';

// ChatBot component
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Nexus Bot, your assistant for repair parts and tools. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const responses = {
    greeting: [
      "Hello! Welcome to Nexus Tech Hub. How can I assist you with your repair needs?",
      "Hi there! I'm here to help you find the right parts and tools for your repairs.",
      "Greetings! What repair parts or tools are you looking for today?"
    ],
    products: {
      iphone: "We carry a wide range of iPhone parts including screens, batteries, charging ports, and cameras for all models from iPhone 12 to iPhone 15 series.",
      samsung: "Our Samsung parts inventory includes screens, batteries, and charging ports for Galaxy S, Note, and A series devices.",
      ipad: "We have iPad parts for Pro, Air, and Mini models, including screens, batteries, and repair components.",
      tools: "We offer professional repair tools including tool kits, screwdrivers, heat guns, and specialized repair equipment."
    },
    shipping: [
      "We offer fast shipping with most orders delivered within 2-3 business days.",
      "Shipping costs start from AED 25 and we offer free shipping on orders over AED 500.",
      "We ship to all UAE locations and provide tracking information for all orders."
    ],
    support: [
      "Our technical support team is available 24/7 to help with any repair questions.",
      "You can reach us at +971 58 553 1029 or via WhatsApp for immediate assistance.",
      "We provide detailed repair guides and video tutorials on our blog."
    ],
    warranty: [
      "All our parts come with a 6-month warranty against manufacturing defects.",
      "Tools and equipment have a 12-month warranty.",
      "We offer a 30-day return policy for unused parts in original packaging."
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Product inquiries
    if (message.includes('iphone') || message.includes('apple')) {
      return responses.products.iphone;
    }
    if (message.includes('samsung') || message.includes('galaxy')) {
      return responses.products.samsung;
    }
    if (message.includes('ipad')) {
      return responses.products.ipad;
    }
    if (message.includes('tool') || message.includes('repair kit')) {
      return responses.products.tools;
    }

    // Shipping inquiries
    if (message.includes('ship') || message.includes('deliver')) {
      return responses.shipping[Math.floor(Math.random() * responses.shipping.length)];
    }

    // Support inquiries
    if (message.includes('help') || message.includes('support') || message.includes('contact')) {
      return responses.support[Math.floor(Math.random() * responses.support.length)];
    }

    // Warranty inquiries
    if (message.includes('warranty') || message.includes('guarantee') || message.includes('return')) {
      return responses.warranty[Math.floor(Math.random() * responses.warranty.length)];
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }

    // Price inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "Prices vary by product and quantity. Please check our product pages for current pricing, or contact us for bulk order quotes.";
    }

    // Order inquiries
    if (message.includes('order') || message.includes('buy') || message.includes('purchase')) {
      return "You can place orders directly through our website. For bulk orders or special requirements, please contact our sales team.";
    }

    // Default response
    return "I'm here to help with information about our repair parts, tools, shipping, and support. Could you please be more specific about what you're looking for?";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="chatbot-button" onClick={toggleChat}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <div className="chatbot-name">Nexus Bot</div>
                <div className="chatbot-status">Online</div>
              </div>
            </div>
            <button className="chatbot-close" onClick={toggleChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !inputValue.trim()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .chatbot-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .chatbot-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .chatbot-window {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
        }

        .chatbot-header {
          background: #10b981;
          color: white;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chatbot-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chatbot-avatar {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-name {
          font-weight: 600;
          font-size: 14px;
        }

        .chatbot-status {
          font-size: 12px;
          opacity: 0.8;
        }

        .chatbot-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .chatbot-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .chatbot-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
        }

        .message.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .message.bot {
          align-self: flex-start;
          align-items: flex-start;
        }

        .message-content {
          background: #f3f4f6;
          color: #1f2937;
          padding: 8px 12px;
          border-radius: 16px;
          margin-bottom: 4px;
          word-wrap: break-word;
        }

        .message.user .message-content {
          background: #10b981;
          color: white;
        }

        .message.typing .message-content {
          background: #f3f4f6;
          padding: 12px;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: #9ca3af;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-8px);
          }
        }

        .message-time {
          font-size: 10px;
          color: #9ca3af;
          margin: 0 4px;
        }

        .chatbot-input {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
        }

        .chatbot-input input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 20px;
          outline: none;
          font-size: 14px;
        }

        .chatbot-input input:focus {
          border-color: #10b981;
        }

        .chatbot-input button {
          width: 32px;
          height: 32px;
          background: #10b981;
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .chatbot-input button:hover:not(:disabled) {
          background: #059669;
        }

        .chatbot-input button:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 140px);
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
