import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Роман Электромонтаж</h3>
            <p>Профессиональные электромонтажные работы в Москве с 2014 года</p>
          </div>

          <div className="footer-section">
            <h4>Навигация</h4>
            <nav className="footer-nav">
              <Link to="/">Главная</Link>
              <a href="#services">Услуги</a>
              <a href="#pricing">Прайс</a>
              <Link to="/gallery">Наши работы</Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="footer-contacts">
              <a href="tel:+79952996091">+7 995 299 60 91</a>
              <a href="mailto:iamninobrand@yandex.ru">iamninobrand@yandex.ru</a>
              <p>Москва и Московская область</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Роман Электромонтаж. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
