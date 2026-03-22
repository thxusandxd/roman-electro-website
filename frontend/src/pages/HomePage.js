import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Calculator from '../components/Calculator';
import Consultation from '../components/Consultation';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <Calculator />
      <Consultation />
      <Footer />
    </div>
  );
}

export default HomePage;
