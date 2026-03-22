const db = require('../config/database');
const logger = require('../utils/logger');

const chat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        error: { message: 'Сообщение и ID сессии обязательны' }
      });
    }

    const response = await generateAIResponse(message);

    await db.query(
      `INSERT INTO ai_conversations (session_id, message, response) 
       VALUES ($1, $2, $3)`,
      [sessionId, message, response]
    );

    res.json({
      success: true,
      data: {
        message: response,
        sessionId: sessionId
      }
    });
  } catch (err) {
    logger.error('AI chat failed:', err);
    res.status(500).json({
      error: { message: 'Не удалось обработать сообщение' }
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const result = await db.query(
      'SELECT * FROM ai_conversations WHERE session_id = $1 ORDER BY created_at ASC',
      [sessionId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    logger.error('Failed to fetch AI conversation history:', err);
    res.status(500).json({
      error: { message: 'Не удалось получить историю' }
    });
  }
};

async function generateAIResponse(message) {
  const responses = {
    'цена': 'Наши цены зависят от объема работ. Вы можете воспользоваться калькулятором на сайте или заказать бесплатную консультацию.',
    'контакт': 'Вы можете связаться с нами по телефону +7 (999) 999-99-99 или оставить заявку на сайте.',
    'услуги': 'Мы предоставляем полный спектр электромонтажных работ: черновой и чистовой монтаж, сборку щитов, штробление и многое другое.',
    'щит': 'Мы производим сборку и установку электрощитов от 12 до 54 модулей. Стоимость сборки от 5000₽ до 20000₽ в зависимости от размера.',
    'срок': 'Сроки выполнения работ зависят от объема. Обычно небольшие объекты делаем за 3-7 дней. Точные сроки озвучим после осмотра.',
    'гарантия': 'Мы предоставляем гарантию на все выполненные работы сроком 1 год.',
    'время': 'Мы работаем ежедневно с 9:00 до 21:00 без выходных.',
    'москва': 'Да, мы работаем по всей Москве и Московской области.',
    'выезд': 'Выезд мастера для осмотра и консультации бесплатный!',
    'оплата': 'Мы принимаем оплату наличными и по безналичному расчету. Возможна поэтапная оплата.'
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }

  return 'Спасибо за ваш вопрос! Наш специалист свяжется с вами в ближайшее время. Вы также можете заказать бесплатную консультацию на нашем сайте.';
}

module.exports = {
  chat,
  getHistory
};
