import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Профессиональный электромонтаж в Москве</h1>
          <p className="hero-subtitle">Качественно, быстро, с гарантией. Более 10 лет опыта работы</p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn btn-primary">Получить консультацию</a>
            <a href="#calculator" className="btn btn-secondary">Рассчитать стоимость</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
