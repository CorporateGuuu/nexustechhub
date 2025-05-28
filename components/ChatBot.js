import React, { useState, useEffect, useRef } from 'react';
import { analytics } from './Analytics';
import { logger } from '../utils/monitoring';
import styles from './ChatBot.module.css';

// Nexus TechHub Knowledge Base
const knowledgeBase = {
  // Business Information
  business: {
    name: "Nexus TechHub",
    phone: "+971 58 553 1029",
    whatsapp: "https://wa.me/971585531029",
    email: "info@nexustechhub.ae",
    address: "FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates",
    hours: "Monday-Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 3:00 PM, Sunday: Closed",
    services: ["iPhone repair parts", "Samsung repair parts", "iPad repair parts", "Repair tools", "LCD buyback"]
  },

  // Product Categories
  categories: {
    "iphone parts": {
      description: "Professional iPhone replacement parts including screens, batteries, cameras, speakers, and more",
      popular: ["iPhone 14 screen", "iPhone 13 battery", "iPhone 12 camera", "iPhone 11 speaker"],
      warranty: "6 months warranty on all iPhone parts"
    },
    "samsung parts": {
      description: "High-quality Samsung replacement parts for all popular models",
      popular: ["Samsung Galaxy S23 screen", "Samsung A54 battery", "Samsung Note 20 camera"],
      warranty: "6 months warranty on all Samsung parts"
    },
    "ipad parts": {
      description: "iPad replacement parts including screens, batteries, and charging ports",
      popular: ["iPad Pro screen", "iPad Air battery", "iPad charging port"],
      warranty: "6 months warranty on all iPad parts"
    },
    "repair tools": {
      description: "Professional repair tools for mobile device technicians",
      types: ["Basic tool kits", "Advanced precision tools", "Specialized equipment"],
      warranty: "1 year warranty on professional tools"
    }
  },

  // Common Questions & Answers
  faq: {
    "shipping": "We offer fast delivery across UAE. Same-day delivery available in Ras Al Khaimah, 1-2 days for other emirates.",
    "warranty": "All parts come with 6-month warranty. Professional tools have 1-year warranty. Warranty covers manufacturing defects.",
    "payment": "We accept cash, credit cards, and bank transfers. Payment on delivery available for UAE customers.",
    "installation": "We provide installation guides with all parts. Professional installation service available in Ras Al Khaimah.",
    "bulk orders": "Special pricing available for bulk orders. Contact us for wholesale rates and technician discounts.",
    "compatibility": "All parts are tested for compatibility. We guarantee perfect fit for specified models.",
    "return policy": "30-day return policy for unused parts in original packaging. Defective parts replaced immediately.",
    "technical support": "Free technical support included. Our technicians can help with installation questions."
  },

  // Pricing Information
  pricing: {
    "iphone screens": "AED 150 - AED 800 depending on model",
    "samsung screens": "AED 120 - AED 600 depending on model",
    "batteries": "AED 80 - AED 200 depending on model",
    "cameras": "AED 100 - AED 400 depending on model",
    "repair tools": "AED 50 - AED 500 depending on tool type"
  }
};

// Intent Recognition Patterns
const intentPatterns = {
  greeting: /^(hi|hello|hey|good morning|good afternoon|good evening|salaam|marhaba)/i,
  pricing: /(price|cost|how much|pricing|rate|fee|charge)/i,
  availability: /(available|in stock|do you have|stock)/i,
  shipping: /(delivery|shipping|ship|deliver|send)/i,
  warranty: /(warranty|guarantee|cover|protection)/i,
  contact: /(contact|phone|call|whatsapp|email|address|location)/i,
  hours: /(hours|time|open|close|when)/i,
  help: /(help|support|assist|problem|issue)/i,
  products: /(iphone|samsung|ipad|parts|tools|screen|battery|camera)/i,
  installation: /(install|installation|how to|guide|tutorial)/i,
  bulk: /(bulk|wholesale|quantity|many|technician discount)/i,
  return: /(return|refund|exchange|replace)/i
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chatbot
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setTimeout(() => {
        addBotMessage("👋 Welcome to Nexus TechHub! I'm here to help you with mobile repair parts, pricing, and technical support. How can I assist you today?");
        setHasGreeted(true);
      }, 500);
    }
  }, [isOpen, hasGreeted]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text, options = null) => {
    const message = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text) => {
    const message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const processUserMessage = async (message) => {
    const lowerMessage = message.toLowerCase();

    // Log user interaction
    analytics.trackEngagement('chatbot_message', { message: message.substring(0, 50) });

    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response = generateResponse(lowerMessage);

    setIsTyping(false);
    addBotMessage(response.text, response.options);
  };

  const generateResponse = (message) => {
    // Check for greetings
    if (intentPatterns.greeting.test(message)) {
      return {
        text: "Hello! Welcome to Nexus TechHub. I can help you with:\n• Product information and pricing\n• Availability and shipping\n• Technical support\n• Warranty information\n\nWhat would you like to know?",
        options: ["Show iPhone Parts", "Show Samsung Parts", "Contact Information", "Shipping Info"]
      };
    }

    // Check for contact information
    if (intentPatterns.contact.test(message)) {
      return {
        text: `📞 Contact Nexus TechHub:\n\n• Phone: ${knowledgeBase.business.phone}\n• WhatsApp: Available 24/7\n• Email: ${knowledgeBase.business.email}\n• Address: ${knowledgeBase.business.address}`,
        options: ["Call Now", "WhatsApp", "Get Directions"]
      };
    }

    // Check for business hours
    if (intentPatterns.hours.test(message)) {
      return {
        text: `🕒 Business Hours:\n${knowledgeBase.business.hours}\n\nFor urgent inquiries, you can reach us on WhatsApp 24/7!`,
        options: ["WhatsApp Now", "Contact Information"]
      };
    }

    // Check for pricing inquiries
    if (intentPatterns.pricing.test(message)) {
      let priceInfo = "💰 Pricing Information:\n\n";
      Object.entries(knowledgeBase.pricing).forEach(([item, price]) => {
        priceInfo += `• ${item.charAt(0).toUpperCase() + item.slice(1)}: ${price}\n`;
      });
      priceInfo += "\n📞 Contact us for exact pricing and current offers!";

      return {
        text: priceInfo,
        options: ["Request Quote", "Contact Sales", "View Products"]
      };
    }

    // Check for product inquiries
    if (intentPatterns.products.test(message)) {
      if (message.includes('iphone')) {
        return {
          text: `📱 iPhone Parts Available:\n\n${knowledgeBase.categories["iphone parts"].description}\n\nPopular items:\n${knowledgeBase.categories["iphone parts"].popular.map(item => `• ${item}`).join('\n')}\n\n✅ ${knowledgeBase.categories["iphone parts"].warranty}`,
          options: ["iPhone Screens", "iPhone Batteries", "Request Quote", "Contact Sales"]
        };
      } else if (message.includes('samsung')) {
        return {
          text: `📱 Samsung Parts Available:\n\n${knowledgeBase.categories["samsung parts"].description}\n\nPopular items:\n${knowledgeBase.categories["samsung parts"].popular.map(item => `• ${item}`).join('\n')}\n\n✅ ${knowledgeBase.categories["samsung parts"].warranty}`,
          options: ["Samsung Screens", "Samsung Batteries", "Request Quote", "Contact Sales"]
        };
      } else if (message.includes('ipad')) {
        return {
          text: `📱 iPad Parts Available:\n\n${knowledgeBase.categories["ipad parts"].description}\n\nPopular items:\n${knowledgeBase.categories["ipad parts"].popular.map(item => `• ${item}`).join('\n')}\n\n✅ ${knowledgeBase.categories["ipad parts"].warranty}`,
          options: ["iPad Screens", "iPad Batteries", "Request Quote", "Contact Sales"]
        };
      }
    }

    // Check for shipping inquiries
    if (intentPatterns.shipping.test(message)) {
      return {
        text: `🚚 Shipping Information:\n\n${knowledgeBase.faq.shipping}\n\n📦 All orders are carefully packaged and insured.\n💳 Payment on delivery available for UAE customers.`,
        options: ["Track Order", "Shipping Rates", "Contact Support"]
      };
    }

    // Check for warranty inquiries
    if (intentPatterns.warranty.test(message)) {
      return {
        text: `🛡️ Warranty Information:\n\n${knowledgeBase.faq.warranty}\n\n✅ ${knowledgeBase.faq["technical support"]}\n\n📞 Contact us immediately if you receive a defective part.`,
        options: ["Warranty Claim", "Technical Support", "Contact Support"]
      };
    }

    // Check for installation help
    if (intentPatterns.installation.test(message)) {
      return {
        text: `🔧 Installation Support:\n\n${knowledgeBase.faq.installation}\n\n📋 Installation guides included with all parts\n👨‍🔧 Professional installation available in Ras Al Khaimah\n📞 Free technical support for installation questions`,
        options: ["Installation Guide", "Book Installation", "Technical Support"]
      };
    }

    // Check for bulk orders
    if (intentPatterns.bulk.test(message)) {
      return {
        text: `📦 Bulk Orders & Wholesale:\n\n${knowledgeBase.faq["bulk orders"]}\n\n💼 Special rates for:\n• Repair shops\n• Technicians\n• Resellers\n• Large quantity orders\n\n📞 Contact our sales team for personalized quotes!`,
        options: ["Request Wholesale Quote", "Contact Sales", "Technician Discount"]
      };
    }

    // Default response with helpful options
    return {
      text: "I'd be happy to help you with that! Here are some things I can assist you with:",
      options: [
        "Product Information",
        "Pricing & Quotes",
        "Shipping & Delivery",
        "Technical Support",
        "Contact Information",
        "Speak to Human"
      ]
    };
  };

  const handleOptionClick = (option) => {
    addUserMessage(option);

    // Handle specific option actions
    switch (option) {
      case "Call Now":
        window.open("tel:+971585531029", "_self");
        analytics.trackPhoneCall('chatbot');
        break;
      case "WhatsApp":
      case "WhatsApp Now":
        window.open("https://wa.me/971585531029", "_blank");
        analytics.trackWhatsAppClick('chatbot');
        break;
      case "Request Quote":
      case "Request Wholesale Quote":
        // Enhanced quote integration
        addBotMessage("🎯 I'll help you get a personalized quote! Here are your options:", [
          "Quick Quote (1-3 items)",
          "Bulk Order Quote (5+ items)",
          "Wholesale Pricing",
          "Custom Requirements"
        ]);
        analytics.trackConversion('quote_request_initiated', 0, { source: 'chatbot' });
        break;
      case "Quick Quote (1-3 items)":
        addBotMessage("📋 For a quick quote, please provide:\n\n1. Product name/model\n2. Quantity needed\n3. Your contact details\n\nOr visit our quote page for a detailed form.", ["Go to Quote Page", "Continue Here"]);
        break;
      case "Bulk Order Quote (5+ items)":
        addBotMessage("📦 Bulk orders get special pricing! Benefits:\n\n• 5-9 items: 10% discount\n• 10+ items: 15% discount\n• Free technical support\n• Priority processing\n\nReady to start your bulk quote?", ["Start Bulk Quote", "Learn More"]);
        break;
      case "Wholesale Pricing":
        addBotMessage("💼 Wholesale pricing available for:\n\n• Repair shops\n• Technicians\n• Resellers\n• Regular bulk buyers\n\nSpecial rates up to 25% off retail prices!", ["Apply for Wholesale", "Contact Sales Team"]);
        analytics.trackUAEMetrics('wholesale_inquiry', { source: 'chatbot' });
        break;
      case "Go to Quote Page":
        window.open("/quote", "_blank");
        analytics.trackConversion('quote_page_visit', 0, { source: 'chatbot' });
        addBotMessage("✅ Quote page opened in a new tab. I'll stay here if you need any help filling it out!");
        break;
      case "Start Bulk Quote":
      case "Apply for Wholesale":
        window.open("/quote?type=wholesale", "_blank");
        analytics.trackConversion('wholesale_quote_initiated', 0, { source: 'chatbot' });
        addBotMessage("🎯 Wholesale quote page opened! Our team will review your application and contact you within 24 hours with special pricing.");
        break;
      case "Contact Sales Team":
        addBotMessage("📞 Our sales team is ready to help:\n\n• Phone: +971 58 553 1029\n• WhatsApp: Instant response\n• Email: sales@nexustechhub.ae\n\nBest time to call: 9 AM - 6 PM UAE time", ["Call Sales", "WhatsApp Sales"]);
        break;
      case "Call Sales":
        window.open("tel:+971585531029", "_self");
        analytics.trackPhoneCall('sales_chatbot');
        break;
      case "WhatsApp Sales":
        window.open("https://wa.me/971585531029?text=Hi, I'm interested in wholesale pricing and bulk orders for mobile repair parts.", "_blank");
        analytics.trackWhatsAppClick('sales_chatbot');
        break;
      case "Speak to Human":
        addBotMessage("I'll connect you with our support team. You can reach them via:\n\n📞 Phone: +971 58 553 1029\n💬 WhatsApp: Available 24/7\n📧 Email: info@nexustechhub.ae", ["Call Now", "WhatsApp Now"]);
        break;
      default:
        processUserMessage(option);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addUserMessage(inputValue);
      processUserMessage(inputValue);
      setInputValue('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      analytics.trackEngagement('chatbot_opened');
    }
  };

  return (
    <div className={styles.chatBot}>
      {/* Chat Toggle Button */}
      <button
        className={`${styles.chatToggle} ${isOpen ? styles.open : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat support"
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && <span className={styles.badge}>AI</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Chat Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>🤖</div>
              <div>
                <h4>Nexus TechHub Support</h4>
                <span className={styles.status}>🟢 Online</span>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={toggleChat}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.sender]}`}
              >
                <div className={styles.messageContent}>
                  <div className={styles.messageText}>
                    {message.text.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < message.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  {message.options && (
                    <div className={styles.messageOptions}>
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          className={styles.optionButton}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className={styles.messageInput}
              disabled={isTyping}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <button
              className={styles.quickAction}
              onClick={() => handleOptionClick("Contact Information")}
            >
              📞 Contact
            </button>
            <button
              className={styles.quickAction}
              onClick={() => handleOptionClick("Request Quote")}
            >
              💰 Quote
            </button>
            <button
              className={styles.quickAction}
              onClick={() => handleOptionClick("WhatsApp")}
            >
              💬 WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
