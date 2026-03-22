require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const consultationRoutes = require('./routes/consultation');
const calculatorRoutes = require('./routes/calculator');
const galleryRoutes = require('./routes/gallery');
const aiAssistantRoutes = require('./routes/aiAssistant');
const logger = require('./utils/logger');

const app = express();
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/consultation', consultationRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/ai-assistant', aiAssistantRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({ error: { message: err.message || 'Internal Server Error' } });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info('Server running on port ' + PORT);
  logger.info('Environment: ' + process.env.NODE_ENV);
  logger.info('Frontend URL: ' + process.env.FRONTEND_URL);
});
