import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Sparkles, ChevronDown } from 'lucide-react';
import { Github } from './BrandIcons';
import MediaCarousel from './MediaCarousel';
import '../../styles/modal.css';

export default function ProjectModal({ project, onClose }) {
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.classList.add('scroll-lock');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('scroll-lock');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const handleTouchStart = (e) => {
    // Only allow swipe to dismiss if at the top of the modal scroll
    if (contentRef.current && contentRef.current.scrollTop === 0) {
      setTouchStartY(e.targetTouches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartY !== null) {
      setTouchEndY(e.targetTouches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY !== null && touchEndY !== null) {
      const distance = touchEndY - touchStartY;
      if (distance > 70) {
        onClose();
      }
    }
    setTouchStartY(null);
    setTouchEndY(null);
  };

  // ดึง media data
  const projectImages = project.images || (project.image ? [project.image] : []);
  const projectVideos = project.videos || [];
  const hasMedia = projectImages.length > 0 || projectVideos.length > 0;
  const hasMultipleMedia = projectImages.length + projectVideos.length > 1;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div 
        ref={contentRef}
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Mobile Drag / Pull Indicator */}
        <div 
          className="modal-drag-handle-container"
          onClick={onClose}
          title="แตะหรือปัดลงเพื่อปิด"
          aria-label="แตะหรือปัดลงเพื่อปิด"
        >
          <div className="modal-drag-pill"></div>
        </div>

        {/* Top Floating Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="ปิดหน้าต่าง (Close modal)" 
          type="button"
        >
          <X size={20} />
        </button>

        {/* Media Area - Carousel or single image */}
        {hasMedia ? (
          <div className={`modal-hero-img-box ${hasMultipleMedia ? 'has-carousel' : ''}`}>
            <MediaCarousel
              images={projectImages}
              videos={projectVideos}
              image={project.image}
              className="modal-carousel"
              videosFirst={Boolean(project.platform || project.videosFirst || (project.videos && project.videos.length > 0))}
            />
          </div>
        ) : (
          <div className="modal-hero-img-box">
            <img src={project.image} alt={project.title} className="modal-hero-img" decoding="async" />
          </div>
        )}

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">{project.category}</span>
            {project.featured && <span className="badge badge-cyan"><Sparkles size={12} /> Featured</span>}
          </div>

          <h3 id="modal-project-title" className="modal-title">{project.title}</h3>
          
          <p className="modal-description">{project.fullDescription || project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <h4 className="modal-section-title">
                <CheckCircle2 size={18} color="var(--accent-yellow)" />
                <span>Key Features & Highlights</span>
              </h4>
              <ul className="modal-highlights-list">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="modal-highlight-item">
                    <span className="highlight-bullet">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <h4 className="modal-section-title">
              <Layers size={18} color="var(--accent-yellow)" />
              <span>Tech Stack & Libraries</span>
            </h4>
            <div className="modal-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="badge badge-cyan">{tag}</span>
              ))}
            </div>
          </div>

          <div className="modal-footer-actions">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary modal-action-btn"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary modal-action-btn"
              >
                <Github size={16} />
                <span>View Source Code</span>
              </a>
            )}
            <button 
              type="button" 
              className="btn btn-close-modal modal-action-btn"
              onClick={onClose}
              aria-label="ปิดหน้าต่างรายละเอียด"
            >
              <ChevronDown size={18} className="modal-close-down-icon" />
              <span>ปิดหน้าต่าง</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
