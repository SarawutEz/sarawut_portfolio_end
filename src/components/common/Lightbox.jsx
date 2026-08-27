import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, ChevronDown } from 'lucide-react';
import '../../styles/modal.css';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);

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

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY !== null && touchStartY !== null ? touchEndY - touchStartY : 0;
      
      // Horizontal swipe (prev/next)
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          onPrev();
        } else {
          onNext();
        }
      } 
      // Vertical swipe down (dismiss)
      else if (diffY > 60 && Math.abs(diffY) > Math.abs(diffX)) {
        onClose();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
    setTouchStartY(null);
    setTouchEndY(null);
  };

  return (
    <div className="modal-overlay lightbox-overlay" onClick={onClose} role="presentation">
      <button 
        className="modal-close-btn lightbox-close-btn" 
        onClick={onClose} 
        aria-label="ปิดรูปภาพ (Close Lightbox)" 
        type="button"
      >
        <X size={22} />
      </button>

      <div 
        className="lightbox-content" 
        onClick={(e) => e.stopPropagation()} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog" 
        aria-modal="true"
      >
        <div className="lightbox-img-wrapper">
          <button 
            className="lightbox-nav-btn lightbox-nav-prev" 
            onClick={onPrev}
            aria-label="รูปก่อนหน้า (Previous Image)"
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
            aria-label="รูปถัดไป (Next Image)"
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

          <button 
            type="button"
            className="lightbox-mobile-close-btn"
            onClick={onClose}
            aria-label="ปิด (Close)"
          >
            <ChevronDown size={16} />
            <span>แตะเพื่อปิด</span>
          </button>
        </div>
      </div>
    </div>
  );
}
