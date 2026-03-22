import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContactsPage.css';

function ContactsPage() {
  return (
    <div className="contacts-page">
      <header className="contacts-header-mini">
        <div className="container">
          <div className="contacts-header-content">
            <Link to="/" className="logo-link">
              <div className="logo-text">Роман Электромонтаж</div>
              <div className="logo-subtext">Roman Electro</div>
            </Link>
            <Link to="/" className="back-button">На главную</Link>
          </div>
        </div>
      </header>
      
      <div id="page-content-wrapper">
        <section className="contacts-hero">
          <div className="container">
            <h1>Контакты</h1>
            <p>Свяжитесь с нами удобным для вас способом</p>
          </div>
        </section>

        <section className="contacts-content">
          <div className="container">
            <div className="contacts-grid">
              <div className="contact-card">
                <div className="contact-label">Телефон</div>
                <a href="tel:+79952996091" className="contact-value">+7 995 299 60 91</a>
                <p className="contact-note">Ежедневно с 9:00 до 21:00</p>
              </div>

              <div className="contact-card">
                <div className="contact-label">Email</div>
                <a href="mailto:iamninobrand@yandex.ru" className="contact-value">iamninobrand@yandex.ru</a>
                <p className="contact-note">Ответим в течение часа</p>
              </div>

              <div className="contact-card">
                <div className="contact-label">Режим работы</div>
                <div className="contact-value">Пн-Вс: 9:00 - 21:00</div>
                <p className="contact-note">Без выходных</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="contacts-footer">
          <div className="container">
            <p>&copy; 2026 Роман Электромонтаж. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ContactsPage;
