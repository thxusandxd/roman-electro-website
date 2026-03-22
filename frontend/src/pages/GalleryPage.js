import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/GalleryPage.css';

function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setGallery(response.data.data);
    } catch (error) {
      console.error('Ошибка загрузки галереи:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-page">
      <Header />
      
      <div id="page-content-wrapper">
        <section className="gallery-hero">
          <div className="container">
            <h1>Наши работы</h1>
            <p>Посмотрите примеры выполненных проектов</p>
          </div>
        </section>

        <section className="gallery-content">
          <div className="container">
            {loading ? (
              <div className="loading">Загрузка...</div>
            ) : gallery.length === 0 ? (
              <div className="empty-gallery">
                <p>Галерея скоро появится. Мы работаем над наполнением!</p>
              </div>
            ) : (
              <div className="gallery-grid">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="gallery-item"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img src={item.image_url} alt={item.title} />
                    <div className="gallery-overlay">
                      <h3>{item.title}</h3>
                      {item.description && <p>{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.image_url} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              {selectedImage.description && <p>{selectedImage.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
