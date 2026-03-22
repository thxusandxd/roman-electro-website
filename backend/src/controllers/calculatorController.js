const db = require('../config/database');
const logger = require('../utils/logger');

const pricing = {
  drilling: {
    pgp: { price: 400, unit: 'шт', name: 'ПГП, газоблок' },
    brick: { price: 550, unit: 'шт', name: 'Кирпич' },
    concrete: { price: 750, unit: 'шт', name: 'Бетон' },
    installation: { price: 400, unit: 'шт', name: 'Установка подрозетников' }
  },
  strobing: {
    pgp: { price: 250, unit: 'п.м', name: 'ПГП, газоблок' },
    brick: { price: 300, unit: 'п.м', name: 'Кирпич' },
    concrete: { price: 450, unit: 'п.м', name: 'Бетон' },
    sealing: { price: 150, unit: 'п.м', name: 'Заделка штроб' }
  },
  cable: {
    '25_no': { price: 150, unit: 'п.м', name: 'До 2.5 кв (без гофры)' },
    '25_yes': { price: 210, unit: 'п.м', name: 'До 2.5 кв (в гофре)' },
    '6_no': { price: 220, unit: 'п.м', name: 'До 6 кв (без гофры)' },
    '6_yes': { price: 300, unit: 'п.м', name: 'До 6 кв (в гофре)' }
  },
  panel_surface: {
    '12': { price: 1000, unit: 'шт', name: 'Щит накладной 12 модулей' },
    '24': { price: 1000, unit: 'шт', name: 'Щит накладной 24 модуля' },
    '36': { price: 1000, unit: 'шт', name: 'Щит накладной 36 модулей' },
    '54': { price: 1000, unit: 'шт', name: 'Щит накладной 54 модуля' }
  },
  panel_flush: {
    '12': { price: 4000, unit: 'шт', name: 'Щит встраиваемый 12 модулей' },
    '24': { price: 4000, unit: 'шт', name: 'Щит встраиваемый 24 модуля' },
    '36': { price: 4000, unit: 'шт', name: 'Щит встраиваемый 36 модулей' },
    '54': { price: 4000, unit: 'шт', name: 'Щит встраиваемый 54 модуля' }
  },
  assembly: {
    '12': { price: 5000, unit: 'шт', name: 'Сборка щита 12 модулей' },
    '24': { price: 10000, unit: 'шт', name: 'Сборка щита 24 модуля' },
    '36': { price: 15000, unit: 'шт', name: 'Сборка щита 36 модулей' },
    '54': { price: 20000, unit: 'шт', name: 'Сборка щита 54 модуля' }
  },
  additional: {
    bra: { price: 2000, unit: 'шт', name: 'Вывод под бра' },
    floor: { price: 1000, unit: 'шт', name: 'Выводы под теплый пол' }
  }
};

const save = async (req, res) => {
  try {
    const { items, email } = req.body;

    const totalPrice = items.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);

    const result = await db.query(
      `INSERT INTO calculator_history (items, total_price, customer_email) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [JSON.stringify(items), totalPrice, email || null]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    logger.error('Failed to save calculator data:', err);
    res.status(500).json({
      error: { message: 'Не удалось сохранить расчет' }
    });
  }
};

const getPricing = async (req, res) => {
  res.json({
    success: true,
    data: pricing
  });
};

module.exports = {
  save,
  getPricing
};
