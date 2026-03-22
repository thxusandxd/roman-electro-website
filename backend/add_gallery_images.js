const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

async function addImages() {
  const galleryDir = path.join(__dirname, 'uploads', 'gallery');
  const files = fs.readdirSync(galleryDir).filter(f => 
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  console.log(`Найдено ${files.length} изображений`);

  for (const file of files) {
    const imageUrl = `/uploads/gallery/${file}`;
    const title = `Проект ${files.indexOf(file) + 1}`;
    
    try {
      await pool.query(
        'INSERT INTO gallery (title, image_url, created_at) VALUES ($1, $2, NOW())',
        [title, imageUrl]
      );
      console.log(`✓ Добавлено: ${file}`);
    } catch (err) {
      console.log(`✗ Ошибка для ${file}:`, err.message);
    }
  }

  await pool.end();
  console.log('Готово!');
}

addImages();
