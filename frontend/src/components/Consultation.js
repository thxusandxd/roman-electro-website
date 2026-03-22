import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Consultation.css';

function Consultation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('/api/consultation', formData);
      
      if (response.data.success) {
        setStatus({
          type: 'success',
          message: 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.'
        });
        setFormData({ name: '', phone: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.error?.message || 'Произошла ошибка. Попробуйте позже или позвоните нам.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="consultation" id="consultation">
      <div className="container">
        <h2 className="section-title-white">Бесплатная консультация</h2>
        <p className="consultation-subtitle">
          Получите профессиональную консультацию по вашему проекту абсолютно бесплатно!
        </p>

        <form className="consultation-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Ваше имя *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Телефон *"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email (необязательно)"
            value={formData.email}
            onChange={handleChange}
          />
          
          <textarea
            name="message"
            className="form-textarea"
            placeholder="Опишите ваш проект или задайте вопрос"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          {status.message && (
            <div className={`form-message ${status.type}`}>
              {status.message}
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Consultation;
