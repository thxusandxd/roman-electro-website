import React from 'react';
import '../styles/Pricing.css';

function Pricing() {
  const pricingData = {
    drilling: {
      title: 'Сверление подрозетников',
      items: [
        { name: 'ПГП, газоблок', price: 400 },
        { name: 'Кирпич', price: 550 },
        { name: 'Бетон', price: 750 },
        { name: 'Установка подрозетников', price: 400 }
      ]
    },
    strobing: {
      title: 'Штробление',
      items: [
        { name: 'ПГП, газоблок', price: 250, unit: 'п.м' },
        { name: 'Кирпич', price: 300, unit: 'п.м' },
        { name: 'Бетон', price: 450, unit: 'п.м' },
        { name: 'Заделка штроб', price: 150, unit: 'п.м' }
      ]
    },
    cable: {
      title: 'Прокладка кабеля',
      items: [
        { name: 'До 2.5 кв (без гофры)', price: 150, unit: 'п.м' },
        { name: 'До 2.5 кв (в гофре)', price: 210, unit: 'п.м' },
        { name: 'До 6 кв (без гофры)', price: 220, unit: 'п.м' },
        { name: 'До 6 кв (в гофре)', price: 300, unit: 'п.м' }
      ]
    },
    panelSurface: {
      title: 'Установка щита (накладной)',
      items: [
        { name: '12 модулей', price: 1000 },
        { name: '24 модуля', price: 1000 },
        { name: '36 модулей', price: 1000 },
        { name: '54 модуля', price: 1000 }
      ]
    },
    panelFlush: {
      title: 'Установка щита (встраиваемый)',
      items: [
        { name: '12 модулей', price: 4000 },
        { name: '24 модуля', price: 4000 },
        { name: '36 модулей', price: 4000 },
        { name: '54 модуля', price: 4000 }
      ]
    },
    assembly: {
      title: 'Сборка щитов',
      items: [
        { name: '12 модулей', price: 5000 },
        { name: '24 модуля', price: 10000 },
        { name: '36 модулей', price: 15000 },
        { name: '54 модуля', price: 20000 }
      ]
    },
    additional: {
      title: 'Дополнительные услуги',
      items: [
        { name: 'Вывод под бра', price: 2000 },
        { name: 'Выводы под теплый пол', price: 1000 }
      ]
    }
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="section-title">Прайс-лист</h2>
        
        {Object.entries(pricingData).map(([key, category]) => (
          <div key={key} className="price-table">
            <h3 className="price-table-title">{category.title}</h3>
            <div className="price-items">
              {category.items.map((item, index) => (
                <div key={index} className="price-item">
                  <div className="price-name">{item.name}</div>
                  <div className="price-value">
                    {item.price.toLocaleString('ru-RU')} ₽
                    {item.unit && <span className="price-unit">/{item.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
