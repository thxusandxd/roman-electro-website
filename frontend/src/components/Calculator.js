import React, { useState, useEffect } from 'react';
import '../styles/Calculator.css';

function Calculator() {
  const [items, setItems] = useState({});
  const [total, setTotal] = useState(0);

  const pricingData = {
    'Сверление подрозетников': {
      'ПГП, газоблок': 400,
      'Кирпич': 550,
      'Бетон': 750,
      'Установка подрозетников': 400
    },
    'Штробление (п.м)': {
      'ПГП, газоблок': 250,
      'Кирпич': 300,
      'Бетон': 450,
      'Заделка штроб': 150
    },
    'Прокладка кабеля (п.м)': {
      'До 2.5 кв (без гофры)': 150,
      'До 2.5 кв (в гофре)': 210,
      'До 6 кв (без гофры)': 220,
      'До 6 кв (в гофре)': 300
    },
    'Установка щита (накладной)': {
      '12 модулей': 1000,
      '24 модуля': 1000,
      '36 модулей': 1000,
      '54 модуля': 1000
    },
    'Установка щита (встраиваемый)': {
      '12 модулей': 4000,
      '24 модуля': 4000,
      '36 модулей': 4000,
      '54 модуля': 4000
    },
    'Сборка щитов': {
      '12 модулей': 5000,
      '24 модуля': 10000,
      '36 модулей': 15000,
      '54 модуля': 20000
    },
    'Дополнительные услуги': {
      'Вывод под бра': 2000,
      'Выводы под теплый пол': 1000
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [items]);

  const handleQuantityChange = (category, service, quantity) => {
    const key = `${category}-${service}`;
    const price = pricingData[category][service];
    
    setItems(prev => ({
      ...prev,
      [key]: {
        category,
        service,
        quantity: parseFloat(quantity) || 0,
        price,
        total: (parseFloat(quantity) || 0) * price
      }
    }));
  };

  const calculateTotal = () => {
    const sum = Object.values(items).reduce((acc, item) => acc + item.total, 0);
    setTotal(sum);
  };

  return (
    <section className="calculator" id="calculator">
      <div className="container">
        <h2 className="section-title">Калькулятор стоимости</h2>
        
        <div className="calc-container">
          {Object.entries(pricingData).map(([category, services]) => (
            <div key={category} className="calc-category">
              <h3 className="calc-category-title">{category}</h3>
              
              {Object.entries(services).map(([service, price]) => (
                <div key={service} className="calc-item">
                  <div className="calc-item-name">{service}</div>
                  <div className="calc-controls">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      className="calc-input"
                      onChange={(e) => handleQuantityChange(category, service, e.target.value)}
                    />
                    <div className="calc-price">
                      {(items[`${category}-${service}`]?.total || 0).toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="calc-total">
            <h3>Итоговая стоимость:</h3>
            <div className="calc-total-amount">{total.toLocaleString('ru-RU')} ₽</div>
            <p className="calc-note">*Точная стоимость определяется после осмотра объекта</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
