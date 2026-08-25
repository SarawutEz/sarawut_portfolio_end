import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import '../../styles/modal.css';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const currentItem = images[currentIndex];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="modal-close-btn" onClick={onClose} aria-label="Close Lightbox">
        <X size={22} />
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-img-wrapper">
          <button 
            className="lightbox-nav-btn lightbox-nav-prev" 
            onClick={onPrev}
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>

          <img 
            src={currentItem.image} 
            alt={currentItem.title} 
            className="lightbox-img" 
          />

          <button 
            className="lightbox-nav-btn lightbox-nav-next" 
            onClick={onNext}
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="lightbox-caption-box">
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
            {currentItem.title}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {currentItem.caption}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <Calendar size={12} /> {currentItem.date} • ({currentIndex + 1} / {images.length})
          </div>
        </div>
      </div>
    </div>
  );
}
