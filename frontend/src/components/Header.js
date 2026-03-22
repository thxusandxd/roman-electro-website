import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {menuOpen && <div className="menu-backdrop" onClick={closeMenu}></div>}
      
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/" onClick={closeMenu}>
                <div className="logo-text">Роман Электромонтаж</div>
                <div className="logo-subtext">Roman Electro</div>
              </Link>
            </div>

            <nav className={`nav ${menuOpen ? 'active' : ''}`}>
              <Link to="/" onClick={closeMenu}>Главная</Link>
              <a href="/#services" onClick={closeMenu}>Услуги</a>
              <a href="/#pricing" onClick={closeMenu}>Прайс</a>
              <a href="/#calculator" onClick={closeMenu}>Калькулятор</a>
              <Link to="/gallery" onClick={closeMenu}>Наши работы</Link>
              <Link to="/ai-assistant" onClick={closeMenu}>AI Помощник</Link>
            </nav>

            <div className="contacts-header">
              <div className="contact-item">
                <a href="tel:+79952996091">+7 995 299 60 91</a>
              </div>
              <div className="contact-item">
                <a href="mailto:iamninobrand@yandex.ru">iamninobrand@yandex.ru</a>
              </div>
            </div>

            <button 
              className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
