import React from 'react';
import '../styles/Services.css';

function Services() {
  const services = [
    {
      title: 'Черновой электромонтаж',
      description: 'Прокладка кабельных линий, установка подрозетников, штробление стен. Выполняем все работы согласно нормам и стандартам.'
    },
    {
      title: 'Чистовой электромонтаж',
      description: 'Установка розеток, выключателей, светильников. Подключение всех электроприборов и финальная сдача объекта.'
    },
    {
      title: 'Сборка и установка щитов',
      description: 'Проектирование, сборка и монтаж электрощитов любой сложности. Накладные и встраиваемые варианты от 12 до 54 модулей.'
    },
    {
      title: 'Сверление подрозетников',
      description: 'Работаем с любыми материалами: ПГП, газоблок, кирпич, бетон. Профессиональное оборудование и аккуратное выполнение.'
    },
    {
      title: 'Установка телевизоров',
      description: 'Монтаж телевизоров на стену с выводом кабелей, подключением всех необходимых устройств.'
    },
    {
      title: 'Установка полотенцесушителей',
      description: 'Монтаж электрических полотенцесушителей с подключением к электросети и проверкой работоспособности.'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Наши услуги</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
