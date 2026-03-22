require('dotenv').config();
const db = require('./database');
const logger = require('../utils/logger');

const migrations = [
  `CREATE TABLE IF NOT EXISTS consultations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS calculator_history (
    id SERIAL PRIMARY KEY,
    items JSONB NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    customer_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE TABLE IF NOT EXISTS ai_conversations (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,

  `CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status)`,
  `CREATE INDEX IF NOT EXISTS idx_consultations_created ON consultations(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category)`,
  `CREATE INDEX IF NOT EXISTS idx_ai_session ON ai_conversations(session_id)`
];

async function runMigrations() {
  try {
    logger.info('Starting database migrations...');
    
    for (const migration of migrations) {
      await db.query(migration);
    }
    
    logger.info('Migrations completed successfully');
    process.exit(0);
  } catch (err) {
    logger.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigrations();
