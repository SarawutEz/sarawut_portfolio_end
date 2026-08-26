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
    document.body.classList.add('scroll-lock');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('scroll-lock');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const currentItem = images[currentIndex];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <button className="modal-close-btn" onClick={onClose} aria-label="Close Lightbox" type="button">
        <X size={22} />
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="lightbox-img-wrapper">
          <button 
            className="lightbox-nav-btn lightbox-nav-prev" 
            onClick={onPrev}
            aria-label="Previous Image"
            type="button"
          >
            <ChevronLeft size={26} />
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
            type="button"
          >
            <ChevronRight size={26} />
          </button>
        </div>

        <div className="lightbox-caption-box">
          <div className="lightbox-caption-title">
            {currentItem.title}
          </div>
          {currentItem.caption && (
            <div className="lightbox-caption-desc">
              {currentItem.caption}
            </div>
          )}
          <div className="lightbox-caption-meta">
            <Calendar size={13} />
            <span>{currentItem.date}</span>
            <span>•</span>
            <span>({currentIndex + 1} / {images.length})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
