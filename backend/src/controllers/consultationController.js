const db = require('../config/database');
const logger = require('../utils/logger');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const create = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const result = await db.query(
      `INSERT INTO consultations (name, phone, email, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, phone, email || null, message || null]
    );

    const consultation = result.rows[0];

    if (process.env.SMTP_HOST) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'noreply@romanelectro.ru',
          to: process.env.ADMIN_EMAIL,
          subject: 'Новая заявка на консультацию',
          html: `
            <h2>Новая заявка на консультацию</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
            ${message ? `<p><strong>Сообщение:</strong><br>${message}</p>` : ''}
            <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
          `
        });
      } catch (emailErr) {
        logger.error('Failed to send email notification:', emailErr);
      }
    }

    res.status(201).json({
      success: true,
      data: consultation
    });
  } catch (err) {
    logger.error('Consultation creation failed:', err);
    res.status(500).json({
      error: { message: 'Не удалось создать заявку' }
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM consultations';
    const params = [];

    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: result.rowCount
      }
    });
  } catch (err) {
    logger.error('Failed to fetch consultations:', err);
    res.status(500).json({
      error: { message: 'Не удалось получить заявки' }
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      `UPDATE consultations 
       SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: { message: 'Заявка не найдена' }
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    logger.error('Failed to update consultation status:', err);
    res.status(500).json({
      error: { message: 'Не удалось обновить статус заявки' }
    });
  }
};

module.exports = {
  create,
  getAll,
  updateStatus
};
