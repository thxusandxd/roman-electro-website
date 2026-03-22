import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AIAssistantPage.css';

function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'session_' + Date.now());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{
      type: 'assistant',
      text: 'Здравствуйте! Я AI-помощник компании "Роман Электромонтаж". Чем могу помочь? Вы можете спросить о наших услугах, ценах или оставить заявку.'
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post('/api/ai-assistant/chat', {
        message: userMessage,
        sessionId
      });

      setMessages(prev => [...prev, {
        type: 'assistant',
        text: response.data.data.message
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: 'Извините, произошла ошибка. Попробуйте еще раз или свяжитесь с нами по телефону.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant-page">
      <Header />
      
      <div id="page-content-wrapper">
        <section className="ai-hero">
          <div className="container">
            <h1>AI Помощник</h1>
            <p>Задайте любой вопрос о наших услугах</p>
          </div>
        </section>

        <section className="chat-section">
          <div className="container">
            <div className="chat-container">
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    <div className="message-content">{message.text}</div>
                  </div>
                ))}
                {loading && (
                  <div className="message assistant">
                    <div className="message-content typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Введите ваш вопрос..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" className="chat-send" disabled={loading || !input.trim()}>
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default AIAssistantPage;
