# Роман Электромонтаж | Roman Electro

Профессиональный сайт для компании электромонтажных услуг.

![Website](https://img.shields.io/badge/status-live-success)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## Live Demo

**https://романэлектро.рф** (https://xn--80akpcdhegkhv2k.xn--p1ai)

## Технологии

### Frontend
- **React 18** - UI framework
- **React Router** - Маршрутизация
- **Axios** - HTTP клиент
- **CSS3** - Темная тема в стиле Apple

### Backend
- **Node.js** + **Express** - REST API
- **PostgreSQL** - База данных
- **PM2** - Process manager

### DevOps
- **Nginx** - Reverse proxy + SSL
- **Let's Encrypt** - SSL сертификаты
- **Ubuntu 22.04** - Server OS

## Структура проекта
```
roman-electro/
├── frontend/          # React приложение
│   ├── src/
│   │   ├── components/  # Header, Footer, Hero, Services, etc.
│   │   ├── pages/       # HomePage, GalleryPage, AIAssistantPage
│   │   └── styles/      # CSS файлы
│   └── public/
├── backend/           # Express API
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Бизнес-логика
│   │   ├── config/      # База данных
│   │   └── middleware/  # Validation, etc.
│   └── uploads/         # Галерея работ
└── README.md
```

## Основные функции

- **Главная страница** - Hero, услуги, прайс-лист
- **Калькулятор стоимости** - Интерактивный расчет работ
- **Галерея работ** - Портфолио выполненных проектов  
- **AI Помощник** - Консультация по услугам
- **Адаптивный дизайн** - Полностью адаптирован под мобильные устройства
- **Темная тема** - Современный дизайн в стиле Apple

## Установка

### Frontend
```bash
cd frontend
npm install
npm run build
```

### Backend
```bash
cd backend
npm install

# Создайте .env файл
cp .env.example .env

# Настройте PostgreSQL
# Запустите миграции
node src/config/migrate.js

# Запуск
npm start
```

## База данных

PostgreSQL таблицы:
- `consultations` - Заявки на консультацию
- `gallery` - Галерея работ
- `calculator_history` - История расчетов
- `ai_conversations` - История чата с AI

## Безопасность

- HTTPS (SSL/TLS)
- Helmet.js для HTTP headers
- CORS protection
- Rate limiting
- Input validation
- Environment variables

## Скриншоты

![Главная страница](https://via.placeholder.com/800x400?text=Screenshot+Coming+Soon)

## Лицензия

© 2026 Роман Электромонтаж. Все права защищены.

## Автор

Разработано для компании "Роман Электромонтаж"

---

**Контакты компании:**
- Телефон: +7 995 299 60 91
- Email: iamninobrand@yandex.ru
- Сайт: https://романэлектро.рф
