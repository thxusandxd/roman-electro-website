const db = require('../config/database');
const logger = require('../utils/logger');
const fs = require('fs').promises;

const getAll = async (req, res) => {
  try {
    const { category, published = 'true' } = req.query;

    let query = 'SELECT * FROM gallery';
    const params = [];

    const conditions = [];
    if (category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }
    if (published) {
      conditions.push(`is_published = $${params.length + 1}`);
      params.push(published === 'true');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY display_order, created_at DESC';

    const result = await db.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    logger.error('Failed to fetch gallery items:', err);
    res.status(500).json({
      error: { message: 'Не удалось получить галерею' }
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query('SELECT * FROM gallery WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: { message: 'Изображение не найдено' }
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    logger.error('Failed to fetch gallery item:', err);
    res.status(500).json({
      error: { message: 'Не удалось получить изображение' }
    });
  }
};

const create = async (req, res) => {
  try {
    const { title, description, category, display_order } = req.body;
    const imageUrl = req.file ? `/uploads/gallery/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({
        error: { message: 'Изображение обязательно' }
      });
    }

    const result = await db.query(
      `INSERT INTO gallery (title, description, image_url, category, display_order) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [title, description || null, imageUrl, category || null, display_order || 0]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    logger.error('Failed to create gallery item:', err);
    res.status(500).json({
      error: { message: 'Не удалось создать запись в галерее' }
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, display_order, is_published } = req.body;

    const result = await db.query(
      `UPDATE gallery 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           category = COALESCE($3, category),
           display_order = COALESCE($4, display_order),
           is_published = COALESCE($5, is_published)
       WHERE id = $6
       RETURNING *`,
      [title, description, category, display_order, is_published, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: { message: 'Изображение не найдено' }
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    logger.error('Failed to update gallery item:', err);
    res.status(500).json({
      error: { message: 'Не удалось обновить запись в галерее' }
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query('DELETE FROM gallery WHERE id = $1 RETURNING image_url', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: { message: 'Изображение не найдено' }
      });
    }

    const imageUrl = result.rows[0].image_url;
    if (imageUrl) {
      try {
        await fs.unlink('.' + imageUrl);
      } catch (fileErr) {
        logger.error('Failed to delete image file:', fileErr);
      }
    }

    res.json({
      success: true,
      message: 'Изображение удалено'
    });
  } catch (err) {
    logger.error('Failed to delete gallery item:', err);
    res.status(500).json({
      error: { message: 'Не удалось удалить изображение' }
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem
};
