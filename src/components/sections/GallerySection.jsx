import React, { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import Lightbox from '../common/Lightbox';
import { galleryData } from '../../data/portfolioData';
import { Image as ImageIcon, Maximize2, Tag } from 'lucide-react';
import '../../styles/gallery.css';

const categories = ["ทั้งหมด (All)", "Competitions", "Workshops", "Teamwork", "Events", "Workspace"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด (All)");
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(null);

  const filteredGallery = activeCategory === "ทั้งหมด (All)"
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory);

  const handleOpenLightbox = (index) => {
    setCurrentLightboxIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentLightboxIndex((prev) => 
      prev === 0 ? filteredGallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentLightboxIndex((prev) => 
      prev === filteredGallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <SectionTitle 
          tag="Photo Gallery"
          icon={ImageIcon}
          title={<>ภาพบรรยากาศและ <span className="gradient-text">ความทรงจำการทำงาน</span></>}
          subtitle="ประมวลภาพกิจกรรม การเข้าร่วมแข่งขัน บรรยากาศการเรียนรู้ และมุมทำงานสร้างสรรค์ผลงาน"
        />

        {/* Filter Categories */}
        <div className="gallery-filters">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredGallery.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-item-card"
              onClick={() => handleOpenLightbox(index)}
            >
              <img src={item.image} alt={item.title} className="gallery-img" loading="lazy" />
              
              <div className="gallery-zoom-icon">
                <Maximize2 size={16} />
              </div>

              <div className="gallery-overlay">
                <h4 className="gallery-item-title">{item.title}</h4>
                <div className="gallery-item-category">
                  <Tag size={13} />
                  <span>{item.category} • {item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentLightboxIndex !== null && (
        <Lightbox 
          images={filteredGallery}
          currentIndex={currentLightboxIndex}
          onClose={() => setCurrentLightboxIndex(null)}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}
    </section>
  );
}
